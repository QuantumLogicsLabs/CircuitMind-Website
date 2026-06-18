import React from 'react';
import { Page, PageTitle, Card, SectionTitle, Divider, Chip } from '../components/Layout';

const circuits = [
  ['LED Circuit',         'led, light'],
  ['Motor Circuit',       'motor'],
  ['Buzzer Circuit',      'buzzer'],
  ['Fan Circuit',         'fan'],
  ['Temperature Sensor',  'temperature, sensor'],
  ['Solar Charging',      'solar'],
  ['555 Timer',           '555, timer'],
  ['RC Filter',           'rc, filter'],
];

export default function Generate() {
  return (
    <Page>
      <PageTitle
        tag="Module 1 — generate/generate.py"
        title="Generate"
        sub="Converts a plain-English prompt into a structured circuit JSON. Uses Groq (Llama 3.3) with automatic rule-based fallback."
      />

      <SectionTitle>How It Works</SectionTitle>
      <Card>
        <ol style={{ paddingLeft: 20, color: '#94a3b8', fontSize: '0.9rem', lineHeight: 2 }}>
          <li><strong style={{ color: '#e2e8f0' }}>validate_input()</strong> — checks length (3–1000 chars), rejects empty/blank prompts</li>
          <li><strong style={{ color: '#e2e8f0' }}>generate_with_llm()</strong> — sends prompt to Groq API, parses JSON response</li>
          <li><strong style={{ color: '#e2e8f0' }}>generate_with_rules()</strong> — keyword-matching fallback if LLM is down or key is missing</li>
          <li><strong style={{ color: '#e2e8f0' }}>generate_circuit()</strong> — orchestrates the above; always returns a dict</li>
        </ol>
      </Card>

      <SectionTitle>Input / Output</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Input</div>
          <pre>{`{ "prompt": "make me a LED circuit" }`}</pre>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Output</div>
          <pre>{`{
  "circuit_name": "LED Circuit",
  "components": [
    "battery", "resistor", "led"
  ],
  "connections": [
    "battery -> resistor -> led"
  ],
  "confidence": "high",
  "source": "llm"
}`}</pre>
        </div>
      </div>

      <Divider />

      <SectionTitle>Rule-Based Fallback Circuits</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>Circuit</th><th>Trigger Keywords</th></tr>
          </thead>
          <tbody>
            {circuits.map(([name, kw]) => (
              <tr key={name}>
                <td style={{ color: '#e2e8f0', fontWeight: 500 }}>{name}</td>
                <td><code>{kw}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <SectionTitle>Error Handling</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>Situation</th><th>Result</th></tr>
          </thead>
          <tbody>
            {[
              ['Empty input',        'ValueError: Input cannot be empty'],
              ['< 3 characters',     'ValueError: Input too short'],
              ['> 1000 characters',  'ValueError: Input too long'],
              ['LLM fails',          'Rule-based fallback activates'],
              ['No API key',         'Rule-based fallback activates'],
              ['Groq not installed', 'Rule-based fallback activates'],
            ].map(([sit, res]) => (
              <tr key={sit}>
                <td style={{ color: '#e2e8f0' }}>{sit}</td>
                <td style={{ color: '#94a3b8' }}>{res}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <SectionTitle>Environment Setup</SectionTitle>
      <Card>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: 14 }}>
          API key is loaded from <code>.env</code> — never hardcoded.
        </p>
        <pre>{`# .env
GROQ_API_KEY=your_key_here`}</pre>
        <p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: 10 }}>
          Get a free key at <a href="https://console.groq.com" target="_blank" rel="noreferrer">console.groq.com</a>
        </p>
      </Card>

      <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
        <Chip color="#10b981" bg="#0a1f18">✅ LLM smart generation</Chip>
        <Chip color="#10b981" bg="#0a1f18">✅ Rule-based fallback</Chip>
        <Chip color="#10b981" bg="#0a1f18">✅ Input validation</Chip>
        <Chip color="#10b981" bg="#0a1f18">✅ .env key loading</Chip>
        <Chip color="#10b981" bg="#0a1f18">✅ Works offline</Chip>
      </div>
    </Page>
  );
}
