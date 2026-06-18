import React from 'react';
import { Page, PageTitle, Card, SectionTitle, Divider } from '../components/Layout';

const steps = [
  {
    num: '01',
    title: 'User Prompt',
    color: '#7c3aed',
    desc: 'User sends a plain-English string like "make me a LED circuit" to POST /generate.',
    io: null,
  },
  {
    num: '02',
    title: 'Generate Module',
    color: '#7c3aed',
    desc: 'Validates input, calls Groq (Llama 3.3) to parse the intent, falls back to rule-based logic if LLM is unavailable. Returns a circuit JSON.',
    io: {
      out: `{
  "circuit_name": "LED Circuit",
  "components": ["battery", "resistor", "led"],
  "connections": ["battery -> resistor -> led"],
  "confidence": "high",
  "source": "llm"
}`,
    },
  },
  {
    num: '03',
    title: 'Explain Module',
    color: '#0891b2',
    desc: 'Receives the circuit JSON. Looks up each component in a 30+ entry knowledge base. Builds a natural-language explanation and traces current flow through the connection graph.',
    io: {
      out: `{
  "explanation": "This circuit uses a battery (power source)...",
  "component_details": [...],
  "flow_description": "Current flows: battery → resistor → led",
  "warnings": []
}`,
    },
  },
  {
    num: '04',
    title: 'Diagnose Module',
    color: '#b45309',
    desc: '6 checks run in sequence: power source present, current limiting, empty connections, short circuit (BFS graph traversal), floating components, capacitor polarity.',
    io: {
      out: `{
  "circuit_name": "LED Circuit",
  "issues": [],
  "passed": true
}`,
    },
  },
  {
    num: '05',
    title: 'Export Module',
    color: '#065f46',
    desc: 'Maps components to SPICE symbols (V, R, D, C, S, M…) and generates a netlist with node numbering, or renders an SVG schematic via schemdraw.',
    io: {
      out: `LED Circuit
V1 1 2 9V
R2 2 3 330ohm
D3 3 4 LED
.end`,
    },
  },
];

export default function Pipeline() {
  return (
    <Page>
      <PageTitle
        tag="Architecture"
        title="The Full Pipeline"
        sub="A natural-language prompt flows through four independent Python modules, each with its own input/output contract, connected by the FastAPI server."
      />

      <div style={{ position: 'relative' }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', gap: 24, marginBottom: 8 }}>
            {/* Left: number + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: s.color + '22', border: `2px solid ${s.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.8rem',
                flexShrink: 0,
              }}>
                {s.num}
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, flex: 1, background: '#1e2d45', margin: '6px 0' }} />
              )}
            </div>

            {/* Right: content */}
            <Card style={{ flex: 1, marginBottom: i < steps.length - 1 ? 0 : 0 }}>
              <div style={{ color: s.color, fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
                {s.title}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.65 }}>{s.desc}</p>
              {s.io && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ color: '#475569', fontSize: '0.72rem', fontFamily: 'var(--mono)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                    Output
                  </div>
                  <pre style={{ margin: 0 }}>{s.io.out}</pre>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      <Divider />

      <SectionTitle>Combined Endpoint</SectionTitle>
      <Card>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 16 }}>
          <code>POST /generate-and-explain</code> runs Generate → Explain → Diagnose in a single request and returns all three results together.
        </p>
        <pre>{`{
  "circuit":     { ...circuit JSON... },
  "explanation": { ...explain output... },
  "diagnosis":   { ...diagnose output... }
}`}</pre>
      </Card>

      <Divider />

      <SectionTitle>Module Independence</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
        {[
          ['No external deps', 'Explain & Diagnose use only stdlib'],
          ['Groq optional', 'Generate falls back to rule-based logic'],
          ['Shared constants', 'Both modules mirror POWER_SOURCES, CURRENT_LIMITERS'],
          ['FastAPI glue', 'API server wires all 4 modules together'],
        ].map(([title, body]) => (
          <div key={title} style={{
            background: '#0d1424', border: '1px solid #1e2d45',
            borderRadius: 8, padding: '16px 18px',
          }}>
            <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.88rem', marginBottom: 6 }}>{title}</div>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{body}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}
