import React from 'react';
import { Page, PageTitle, Card, SectionTitle, Divider } from '../components/Layout';

const checks = [
  {
    num: 1, title: 'Power Source', color: '#ef4444',
    fn: 'check_power_source()',
    desc: 'Verifies at least one of battery, power_supply, or solar_cell is in the components list.',
    err: 'Error: No power source found. Add a battery or power supply.',
  },
  {
    num: 2, title: 'Current Limiting', color: '#f59e0b',
    fn: 'check_current_limiting()',
    desc: 'If LED, diode, or zener_diode is present, at least one of resistor, potentiometer, mosfet, transistor must also be present.',
    err: "Warning: 'led' detected without a current-limiting component.",
  },
  {
    num: 3, title: 'Empty Connections', color: '#ef4444',
    fn: 'check_empty_connections()',
    desc: 'Fails if the connections list is empty — components are present but not wired.',
    err: 'Error: No connections defined. Components are not linked together.',
  },
  {
    num: 4, title: 'Short Circuit (BFS)', color: '#ef4444',
    fn: 'check_short_circuit()',
    desc: 'BFS from every power-source node. If ground is reachable without passing through a real load, a short circuit is reported. Detects paths of any length.',
    err: 'Error: Short circuit detected — power reaches ground with no load. Path: [battery -> ground]',
  },
  {
    num: 5, title: 'Floating Components', color: '#f59e0b',
    fn: 'check_floating_components()',
    desc: 'Any non-power-source component not mentioned in any connection string is flagged as floating (disconnected).',
    err: "Warning: 'motor' is not found in any connection. It may be floating.",
  },
  {
    num: 6, title: 'Capacitor Polarity', color: '#0891b2',
    fn: 'check_capacitor_polarity()',
    desc: 'If a capacitor is present, checks connection strings for polarity keywords (+, pos, anode, vcc…). Emits an info notice if none found.',
    err: 'Info: Capacitor detected but no polarity indication found.',
  },
];

export default function Diagnose() {
  return (
    <Page>
      <PageTitle
        tag="Module 3 — diagnose/diagnose_module.py"
        title="Diagnose"
        sub="Runs 6 sequential electrical checks on a circuit JSON and returns a list of issues plus a passed boolean."
      />

      <SectionTitle>The 6 Checks</SectionTitle>
      {checks.map(c => (
        <Card key={c.num} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: c.color + '22', border: `1.5px solid ${c.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: c.color, fontWeight: 700, fontSize: '0.78rem',
            }}>{c.num}</div>
            <strong style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{c.title}</strong>
            <code style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>{c.fn}</code>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: 10 }}>{c.desc}</p>
          <pre style={{ fontSize: '0.78rem', color: c.color, padding: '8px 14px' }}>{c.err}</pre>
        </Card>
      ))}

      <Divider />

      <SectionTitle>BFS Short Circuit Logic</SectionTitle>
      <Card>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 14 }}>
          Unlike a simple 2-node check, the BFS algorithm traverses paths of any length.
          Wire/net labels (<code>wire</code>, <code>node</code>, <code>net</code>, <code>trace</code>) are
          excluded from "load" detection so they don't mask a short.
        </p>
        <pre>{`battery -> ground              ✅ detected (2 nodes)
battery -> wire -> ground      ✅ detected (3 nodes)
battery -> n1 -> n2 -> gnd    ✅ detected (4+ nodes)`}</pre>
      </Card>

      <Divider />

      <SectionTitle>Input / Output</SectionTitle>
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
  ]
}`}</pre>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Output (pass)</div>
          <pre>{`{
  "circuit_name": "LED Circuit",
  "issues": [],
  "passed": true
}`}</pre>
          <div style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'var(--mono)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, marginTop: 16 }}>Output (fail)</div>
          <pre>{`{
  "circuit_name": "Bad Circuit",
  "issues": [
    "Warning: 'led' detected without
     a current-limiting component."
  ],
  "passed": false
}`}</pre>
        </div>
      </div>

      <Divider />

      <SectionTitle>Shared Constants with Explain</SectionTitle>
      <Card>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: 12 }}>
          Both modules mirror identical constant sets to stay consistent:
        </p>
        <pre>{`POWER_SOURCES       = {"battery", "power_supply", "solar_cell"}
NEEDS_CURRENT_LIMIT = {"led", "diode", "zener_diode"}
CURRENT_LIMITERS    = {"resistor", "potentiometer", "mosfet",
                       "transistor", "npn_transistor", "pnp_transistor"}`}</pre>
      </Card>

      <Divider />

      <SectionTitle>Test Suite — 11 Cases</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>ID</th><th>Scenario</th><th>Expected</th><th>Actual</th></tr>
          </thead>
          <tbody>
            {[
              ['TC01','Valid LED circuit','pass ✅','PASS'],
              ['TC02','LED without resistor','warn ⚠️','PASS'],
              ['TC03','No power source','error ❌','PASS'],
              ['TC04','Short circuit 2 nodes','error ❌','PASS'],
              ['TC05','Short circuit 3 nodes','error ❌','PASS'],
              ['TC06','Short circuit 4 nodes','error ❌','PASS'],
              ['TC07','No connections','error ❌','PASS'],
              ['TC08','Floating component','warn ⚠️','PASS'],
              ['TC09','Capacitor no polarity','info ℹ️','PASS'],
              ['TC10','LED + NPN transistor','pass ✅','PASS'],
              ['TC11','LED + PNP transistor','pass ✅','PASS'],
            ].map(([id, desc, exp, act]) => (
              <tr key={id}>
                <td><code>{id}</code></td>
                <td style={{ color: '#e2e8f0' }}>{desc}</td>
                <td style={{ color: '#94a3b8' }}>{exp}</td>
                <td style={{ color: '#10b981', fontWeight: 600 }}>{act}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
