import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/',         label: 'Overview' },
  { to: '/pipeline', label: 'Pipeline' },
  { to: '/generate', label: 'Generate' },
  { to: '/explain',  label: 'Explain' },
  { to: '/diagnose', label: 'Diagnose' },
  { to: '/export',   label: 'Export' },
  { to: '/api',      label: 'API' },
];

const style = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(10,14,23,0.92)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #1e2d45',
    display: 'flex', alignItems: 'center',
    padding: '0 32px', gap: 4,
  },
  logo: {
    fontWeight: 700, fontSize: '1.1rem', color: '#00d4ff',
    marginRight: 24, letterSpacing: '-0.02em', padding: '18px 0',
    whiteSpace: 'nowrap',
  },
  link: {
    color: '#64748b', padding: '18px 12px',
    fontWeight: 500, fontSize: '0.88rem',
    borderBottom: '2px solid transparent',
    transition: 'color 0.15s, border-color 0.15s',
    whiteSpace: 'nowrap',
  },
  activeLink: {
    color: '#00d4ff',
    borderBottom: '2px solid #00d4ff',
  },
};

export default function Navbar() {
  return (
    <nav style={style.nav}>
      <div style={style.logo}>⚡ CircuitMind</div>
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === '/'}
          style={({ isActive }) => ({
            ...style.link,
            ...(isActive ? style.activeLink : {}),
          })}
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
