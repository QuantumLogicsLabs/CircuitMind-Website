import React from 'react';

export function Page({ children }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
      {children}
    </div>
  );
}

export function PageTitle({ tag, title, sub }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {tag && (
        <div style={{ color: '#00d4ff', fontFamily: 'var(--mono)', fontSize: '0.78rem',
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          {tag}
        </div>
      )}
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700,
        color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 14 }}>
        {title}
      </h1>
      {sub && <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580 }}>{sub}</p>}
    </div>
  );
}

export function Card({ children, style: s }) {
  return (
    <div style={{
      background: '#141c2e', border: '1px solid #1e2d45',
      borderRadius: 12, padding: '24px 28px', marginBottom: 20,
      ...s,
    }}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0',
      marginBottom: 16, marginTop: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
      {children}
    </h2>
  );
}

export function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #1e2d45', margin: '36px 0' }} />;
}

export function Chip({ color = '#00d4ff', bg = '#0c2035', children }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 20,
      background: bg, color, fontSize: '0.78rem', fontWeight: 600,
      border: `1px solid ${color}33`,
    }}>
      {children}
    </span>
  );
}
