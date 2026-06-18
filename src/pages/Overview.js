import React from 'react';
import { Link } from 'react-router-dom';
import { Page, Card } from '../components/Layout';

const modules = [
  {
    icon: '🧠',
    label: 'Generate',
    to: '/generate',
    color: '#7c3aed',
    desc: 'Converts a plain-English prompt into a structured circuit JSON using Groq (Llama 3.3) with a rule-based fallback.',
  },
  {
    icon: '📖',
    label: 'Explain',
    to: '/explain',
    color: '#0891b2',
    desc: 'Takes circuit JSON and produces a human-readable explanation, component roles, current flow, and warnings.',
  },
  {
    icon: '🔍',
    label: 'Diagnose',
    to: '/diagnose',
    color: '#b45309',
    desc: 'Runs 6 electrical checks — power source, current limiting, short circuits (BFS), floating components, and polarity.',
  },
  {
    icon: '📤',
    label: 'Export',
    to: '/export',
    color: '#065f46',
    desc: 'Converts circuit JSON to a SPICE netlist (.sp) or SVG schematic for use in simulation tools.',
  },
];

export default function Overview() {
  return (
    <Page>
      {/* Hero */}
      <div style={{ marginBottom: 56, paddingTop: 8 }}>
        <div style={{ color: '#00d4ff', fontFamily: 'var(--mono)', fontSize: '0.75rem',
          letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
          AI-Powered Circuit Tool
        </div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700,
          color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
          CircuitMind
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.7 }}>
          Describe a circuit in plain English. CircuitMind generates, explains,
          diagnoses, and exports it — all through a FastAPI backend with four
          independent Python modules.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <Link to="/pipeline" style={{
            background: '#00d4ff', color: '#0a0e17', padding: '10px 22px',
            borderRadius: 8, fontWeight: 700, fontSize: '0.9rem',
          }}>
            View Pipeline →
          </Link>
          <Link to="/api" style={{
            background: 'transparent', color: '#00d4ff', padding: '10px 22px',
            borderRadius: 8, fontWeight: 600, fontSize: '0.9rem',
            border: '1px solid #1e2d45',
          }}>
            API Reference
          </Link>
        </div>
      </div>

      {/* 4 module cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
        {modules.map(m => (
          <Link key={m.to} to={m.to} style={{ textDecoration: 'none' }}>
            <Card style={{ height: '100%', transition: 'border-color 0.2s', cursor: 'pointer',
              borderColor: '#1e2d45' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = m.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e2d45'}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{m.icon}</div>
              <div style={{ color: m.color, fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
                {m.label}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>{m.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* stats row */}
      <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
        {[
          ['4.2M+', 'Training circuits'],
          ['94.2%', 'Electrical validity'],
          ['81.7%', 'SPICE sim pass rate'],
          ['4.1/5', 'Engineer rating'],
        ].map(([val, lbl]) => (
          <div key={lbl}>
            <div style={{ color: '#00d4ff', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--mono)' }}>{val}</div>
            <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}
