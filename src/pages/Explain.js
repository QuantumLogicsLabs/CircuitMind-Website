import React from 'react';
import { Page, PageTitle, Card, SectionTitle, Divider } from '../components/Layout';

const components = [
  ['Power',      'battery, power_supply, solar_cell'],
  ['Passive',    'resistor, capacitor, inductor, potentiometer'],
  ['Diodes',     'diode, led, zener_diode'],
  ['Transistors','transistor, npn_transistor, pnp_transistor, mosfet'],
  ['ICs',        'op_amp, 555_timer, arduino, microcontroller'],
  ['Output',     'buzzer, motor, speaker, relay, display, lcd'],
  ['Sensors',    'ldr, thermistor, photodiode, button, switch, sensor'],
  ['Other',      'ground, fuse, transformer'],
];

export default function Explain() {
  return (
    <Page>
      <PageTitle
        tag="Module 2 — explain/explain_module.py"
        title="Explain"
        sub="Receives circuit JSON and returns a plain-English explanation, component roles, current flow narrative, and warnings."
      />

      <SectionTitle>How It Works</SectionTitle>
      <Card>
        <ol style={{ paddingLeft: 20, color: '#94a3b8', fontSize: '0.9rem', lineHeight: 2 }}>
          <li><strong style={{ color: '#e2e8f0' }}>Normalize</strong> — component names lowercased, spaces/hyphens → underscores</li>
          <li><strong style={{ color: '#e2e8f0' }}>Knowledge lookup</strong> — each component matched against 30+ entry COMPONENT_INFO dict</li>
          <li><strong style={{ color: '#e2e8f0' }}>Explanation builder</strong> — assembles sentence from role + description for each part</li>
          <li><strong style={{ color: '#e2e8f0' }}>_build_flow_description()</strong> — parses connection strings ("→" / "--") into a narrative</li>
          <li><strong style={{ color: '#e2e8f0' }}>_check_warnings()</strong> — flags missing power source, missing current limiter, unknown components</li>
        </ol>
      </Card>

      <SectionTitle>Input / Output</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Input</div>
          <pre>{`{
  "components": [
    "battery","resistor","led"
  ],
  "connections": [
    "battery -> resistor -> led"
  ]
}`}</pre>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Output</div>
          <pre>{`{
  "explanation": "This circuit uses
    a battery (power source)...",
  "component_details": [
    { "name": "battery",
      "role": "power source",
      "description": "..." },
    ...
  ],
  "flow_description": "Current flows
    from battery → resistor → led.",
  "warnings": []
}`}</pre>
        </div>
      </div>

      <Divider />

      <SectionTitle>Knowledge Base — 30+ Components</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>Category</th><th>Components</th></tr>
          </thead>
          <tbody>
            {components.map(([cat, comps]) => (
              <tr key={cat}>
                <td style={{ color: '#e2e8f0', fontWeight: 500, whiteSpace: 'nowrap' }}>{cat}</td>
                <td style={{ color: '#94a3b8', fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>{comps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <SectionTitle>Warnings Checked</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {[
          ['No power source', 'Circuit has no battery, power_supply, or solar_cell'],
          ['Missing current limiter', 'LED or diode present without resistor/transistor'],
          ['Unknown component', 'Component not in knowledge base — included with warning'],
        ].map(([title, body]) => (
          <Card key={title} style={{ background: '#120f1a', borderColor: '#f59e0b44' }}>
            <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.88rem', marginBottom: 6 }}>⚠ {title}</div>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{body}</div>
          </Card>
        ))}
      </div>

      <Divider />

      <SectionTitle>Usage Notes</SectionTitle>
      <Card>
        <ul style={{ paddingLeft: 20, color: '#94a3b8', fontSize: '0.88rem', lineHeight: 2 }}>
          <li>Case-insensitive — <code>"LED"</code>, <code>"Led"</code>, <code>"led"</code> all work</li>
          <li>Both <code>→</code> and <code>--</code> work as connection separators</li>
          <li>No external dependencies — pure Python stdlib</li>
          <li>Batch mode: <code>explain_circuits_batch([ c1, c2, ... ])</code></li>
        </ul>
      </Card>
    </Page>
  );
}
