import React from 'react';
import { Page, PageTitle, Card, SectionTitle, Divider } from '../components/Layout';

const spiceMap = [
  ['battery',   'V',  '9V'],
  ['resistor',  'R',  '330ohm'],
  ['led',       'D',  'LED'],
  ['capacitor', 'C',  '100uF'],
  ['switch',    'S',  'SW'],
  ['motor',     'M',  'MOTOR'],
];

export default function Export() {
  return (
    <Page>
      <PageTitle
        tag="Module 4 — export/export_module.py"
        title="Export"
        sub="Converts circuit JSON to a SPICE netlist (.sp) or SVG schematic using schemdraw. Optionally saves files to disk."
      />

      <SectionTitle>How It Works</SectionTitle>
      <Card>
        <ol style={{ paddingLeft: 20, color: '#94a3b8', fontSize: '0.9rem', lineHeight: 2 }}>
          <li><strong style={{ color: '#e2e8f0' }}>Parse input</strong> — JSON string decoded, fields validated</li>
          <li><strong style={{ color: '#e2e8f0' }}>generate_spice()</strong> — maps each component to its SPICE symbol and assigns node numbers sequentially</li>
          <li><strong style={{ color: '#e2e8f0' }}>generate_svg()</strong> — uses schemdraw to draw a schematic and returns SVG markup</li>
          <li><strong style={{ color: '#e2e8f0' }}>export_module()</strong> — routes to SPICE or SVG based on <code>export_format</code> param</li>
          <li><strong style={{ color: '#e2e8f0' }}>File save (optional)</strong> — writes <code>.json</code>, <code>.txt</code>, and <code>.sp</code> to disk when <code>save_to_file=True</code></li>
        </ol>
      </Card>

      <SectionTitle>SPICE Example</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Input</div>
          <pre>{`{
  "circuit_name": "LED Circuit",
  "components": [
    "battery","resistor","led"
  ],
  "connections": [
    "battery -> resistor -> led"
  ],
  "export_format": "spice"
}`}</pre>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>SPICE Netlist</div>
          <pre>{`LED Circuit
V1 1 2 9V
R2 2 3 330ohm
D3 3 4 LED
.end`}</pre>
        </div>
      </div>

      <Divider />

      <SectionTitle>Component → SPICE Symbol Map</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>Component</th><th>SPICE Symbol</th><th>Default Value</th></tr>
          </thead>
          <tbody>
            {spiceMap.map(([comp, sym, val]) => (
              <tr key={comp}>
                <td><code>{comp}</code></td>
                <td style={{ color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 600 }}>{sym}</td>
                <td style={{ color: '#94a3b8' }}>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <SectionTitle>Output Format</SectionTitle>
      <Card>
        <pre>{`{
  "status": "success",
  "format": "spice",
  "circuit_name": "LED Circuit",
  "components": "battery, resistor, led",
  "connections": "battery → resistor → led",
  "spice_netlist": "LED Circuit\\nV1 1 2 9V\\nR2 2 3 330ohm\\n..."
}`}</pre>
      </Card>

      <Divider />

      <SectionTitle>Error Handling</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>Case</th><th>Response</th></tr>
          </thead>
          <tbody>
            {[
              ['Empty input',       '{ "status": "error", "message": "Input is empty." }'],
              ['Invalid JSON',      '{ "status": "error", "message": "Invalid JSON input." }'],
              ['Missing fields',    '{ "status": "error", "message": "Missing required fields." }'],
              ['Bad export_format', '{ "status": "error", "message": "Invalid format. Use spice or svg." }'],
            ].map(([c, r]) => (
              <tr key={c}>
                <td style={{ color: '#e2e8f0' }}>{c}</td>
                <td style={{ color: '#94a3b8', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <SectionTitle>Test Results</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
        {[
          { label: 'LED Circuit',   status: 'success', color: '#10b981' },
          { label: 'Motor Circuit', status: 'success', color: '#10b981' },
          { label: 'Fan Circuit',   status: 'success', color: '#10b981' },
          { label: 'Empty input',   status: 'error',   color: '#ef4444' },
          { label: 'Invalid JSON',  status: 'error',   color: '#ef4444' },
        ].map(t => (
          <div key={t.label} style={{
            background: '#0d1424', border: `1px solid ${t.color}33`,
            borderRadius: 8, padding: '12px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>{t.label}</span>
            <span style={{ color: t.color, fontWeight: 600, fontSize: '0.8rem' }}>{t.status}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}
