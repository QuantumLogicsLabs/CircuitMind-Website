import React from 'react';
import { Page, PageTitle, Card, SectionTitle, Divider } from '../components/Layout';

const endpoints = [
  {
    method: 'GET', path: '/',
    desc: 'Health check. Confirms API is running and lists all endpoints.',
    body: null,
    res: `{ "status": "running", "message": "CircuitMind API is live!", "endpoints": {...} }`,
  },
  {
    method: 'POST', path: '/generate',
    desc: 'Convert a natural-language prompt to circuit JSON.',
    body: `{ "prompt": "make me a LED circuit" }`,
    res: `{
  "circuit_name": "LED Circuit",
  "components": ["battery","resistor","led"],
  "connections": ["battery -> resistor -> led"],
  "confidence": "high",
  "source": "llm"
}`,
  },
  {
    method: 'POST', path: '/explain',
    desc: 'Generate a plain-English explanation for a circuit JSON.',
    body: `{
  "circuit_json": {
    "circuit_name": "LED Circuit",
    "components": ["battery","resistor","led"],
    "connections": ["battery -> resistor -> led"]
  }
}`,
    res: `{
  "explanation": "This circuit uses a battery...",
  "component_details": [...],
  "flow_description": "...",
  "warnings": []
}`,
  },
  {
    method: 'POST', path: '/diagnose',
    desc: 'Run all 6 electrical checks on a circuit JSON.',
    body: `{
  "circuit_json": {
    "circuit_name": "Bad Circuit",
    "components": ["battery","led"],
    "connections": ["battery -> led"]
  }
}`,
    res: `{
  "circuit_name": "Bad Circuit",
  "issues": ["Warning: 'led' detected without a current-limiting component."],
  "passed": false
}`,
  },
  {
    method: 'POST', path: '/export',
    desc: 'Export a circuit to SPICE netlist or SVG schematic.',
    body: `{
  "circuit_json": {
    "circuit_name": "LED Circuit",
    "components": ["battery","resistor","led"],
    "connections": ["battery -> resistor -> led"]
  },
  "export_format": "spice"
}`,
    res: `{
  "status": "success",
  "format": "spice",
  "circuit_name": "LED Circuit",
  "spice_netlist": "LED Circuit\\nV1 1 2 9V\\n..."
}`,
  },
  {
    method: 'POST', path: '/generate-and-explain',
    desc: 'Generate + Explain + Diagnose in a single request.',
    body: `{ "prompt": "555 timer circuit" }`,
    res: `{
  "circuit":     { ...circuit JSON... },
  "explanation": { ...explain output... },
  "diagnosis":   { ...diagnose output... }
}`,
  },
];

function MethodBadge({ method }) {
  return (
    <span className={`badge badge-${method.toLowerCase()}`} style={{ minWidth: 48, textAlign: 'center' }}>
      {method}
    </span>
  );
}

export default function API() {
  return (
    <Page>
      <PageTitle
        tag="api/app.py — FastAPI"
        title="API Reference"
        sub="The FastAPI server wires all four modules into a single running service. Start it with uvicorn, then hit any endpoint."
      />

      <SectionTitle>Setup</SectionTitle>
      <Card>
        <pre>{`# 1. Install dependencies
pip install -r requirements.txt

# 2. Add API key
cp .env.example .env
# Edit .env: GROQ_API_KEY=your_key_here

# 3. Start the server
uvicorn api.app:app --reload

# 4. Interactive docs
open http://localhost:8000/docs`}</pre>
      </Card>

      <Divider />

      <SectionTitle>Endpoints</SectionTitle>

      {endpoints.map(ep => (
        <Card key={ep.path} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <MethodBadge method={ep.method} />
            <code style={{ fontSize: '1rem', background: 'transparent', border: 'none',
              padding: 0, color: '#e2e8f0' }}>{ep.path}</code>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: ep.body ? 14 : 0 }}>{ep.desc}</p>

          {ep.body && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>
              <div>
                <div style={{ color: '#475569', fontSize: '0.72rem', fontFamily: 'var(--mono)',
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Request body</div>
                <pre style={{ margin: 0 }}>{ep.body}</pre>
              </div>
              <div>
                <div style={{ color: '#475569', fontSize: '0.72rem', fontFamily: 'var(--mono)',
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Response</div>
                <pre style={{ margin: 0 }}>{ep.res}</pre>
              </div>
            </div>
          )}

          {!ep.body && ep.res && (
            <div style={{ marginTop: 10 }}>
              <pre style={{ margin: 0 }}>{ep.res}</pre>
            </div>
          )}
        </Card>
      ))}

      <Divider />

      <SectionTitle>Input Models (Pydantic)</SectionTitle>
      <Card>
        <pre>{`class GenerateRequest(BaseModel):
    prompt: str

class CircuitRequest(BaseModel):
    circuit_json: dict

class ExportRequest(BaseModel):
    circuit_json: dict
    export_format: Optional[str] = "spice"  # "spice" | "svg"`}</pre>
      </Card>

      <Divider />

      <SectionTitle>Curl Examples</SectionTitle>
      <Card>
        <pre>{`# Generate
curl -X POST http://localhost:8000/generate \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"LED circuit"}'

# All-in-one
curl -X POST http://localhost:8000/generate-and-explain \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"555 timer circuit"}'`}</pre>
      </Card>
    </Page>
  );
}
