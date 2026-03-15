'use client'

import { useState, useMemo } from 'react'

const SECTOR_NAMES = {
  education: 'Education', employment: 'Employment', politics: 'Politics',
  mental_health: 'Mental Health', misinformation: 'Misinformation',
  criminal_justice: 'Criminal Justice', children_and_youth: 'Children & Youth',
  surveillance: 'Surveillance', healthcare: 'Healthcare', environment: 'Environment',
  social_media: 'Social Media', creative_industries: 'Creative Industries',
  journalism: 'Journalism', counterterrorism: 'Counterterrorism',
  finance: 'Finance', military: 'Military',
}

const TYPE_NAMES = {
  peer_reviewed: 'Peer-Reviewed', journalism: 'Journalism',
  think_tank: 'Think Tank', industry_report: 'Industry Report',
  government_report: 'Government', company_disclosure: 'Company',
  congressional_testimony: 'Congressional', whistleblower: 'Whistleblower',
}

export default function Atlas({ data }) {
  const [sector, setSector] = useState('all')
  const [impact, setImpact] = useState('all')
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(null)

  const evidence = data.evidence || []

  const sectors = useMemo(() => {
    const m = {}
    evidence.forEach(e => (e.sectors || []).forEach(s => { m[s] = (m[s] || 0) + 1 }))
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [evidence])

  const filtered = useMemo(() => {
    let r = evidence
    if (sector !== 'all') r = r.filter(e => (e.sectors || []).includes(sector))
    if (impact !== 'all') r = r.filter(e => e.impact === impact)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(e =>
        (e.claim || '').toLowerCase().includes(q) ||
        (e.summary || '').toLowerCase().includes(q) ||
        (e.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (e.authors || '').toLowerCase().includes(q)
      )
    }
    return r
  }, [evidence, sector, impact, search])

  const counts = useMemo(() => ({
    total: evidence.length,
    benefit: evidence.filter(e => e.impact === 'benefit').length,
    harm: evidence.filter(e => e.impact === 'harm').length,
    sectors: sectors.length,
  }), [evidence, sectors])

  return (
    <>
      {/* ── Nav ── */}
      <nav style={{
        padding: '18px 0',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(251,251,253,0.72)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>The AI Atlas</span>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {['all', 'benefit', 'harm', 'mixed'].map(v => (
              <button key={v} onClick={() => setImpact(v)} style={{
                fontSize: 13, fontWeight: impact === v ? 600 : 400,
                color: impact === v ? '#1d1d1f' : '#86868b',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>
                {v === 'all' ? 'All' : v.charAt(0).toUpperCase() + v.slice(1) + 's'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header style={{ maxWidth: 680, margin: '0 auto', padding: '100px 24px 72px' }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.06 }}>
          Evidence for<br />the AI age.
        </h1>
        <p style={{ fontSize: 19, fontWeight: 400, lineHeight: 1.58, color: '#86868b', maxWidth: 440, marginTop: 18 }}>
          The studies, the reporting, the data. Benefits and risks across every sector, made readable.
        </p>
        <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
          {[
            { n: counts.total, l: 'Entries' },
            { n: counts.benefit, l: 'Benefits' },
            { n: counts.harm, l: 'Harms' },
            { n: counts.sectors, l: 'Sectors' },
          ].map(d => (
            <div key={d.l}>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>{d.n}</div>
              <div style={{ fontSize: 11, color: '#86868b', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 2 }}>{d.l}</div>
            </div>
          ))}
        </div>
      </header>

      {/* ── Filters ── */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 12px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <Chip active={sector === 'all'} onClick={() => setSector('all')}>All</Chip>
          {sectors.map(([key]) => (
            <Chip key={key} active={sector === key} onClick={() => setSector(key)}>
              {SECTOR_NAMES[key] || key}
            </Chip>
          ))}
        </div>
        <input
          type="text" placeholder="Search" value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', fontSize: 15, fontWeight: 400,
            fontFamily: 'inherit', color: '#1d1d1f',
            background: 'rgba(0,0,0,0.03)', border: 'none',
            borderRadius: 10, padding: '12px 16px', outline: 'none',
          }}
        />
        <p style={{ fontSize: 12, color: '#aeaeb2', marginTop: 10 }}>
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {sector !== 'all' ? ` in ${SECTOR_NAMES[sector] || sector}` : ''}
        </p>
      </div>

      {/* ── Evidence ── */}
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '8px 24px 120px' }}>
        {filtered.map((entry, i) => {
          const isOpen = open === entry.id
          const link = entry.doi ? `https://doi.org/${entry.doi}` : entry.url
          return (
            <article
              key={entry.id}
              onClick={() => setOpen(isOpen ? null : entry.id)}
              style={{
                padding: '28px 0',
                borderTop: i === 0 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
                borderBottom: '0.5px solid rgba(0,0,0,0.08)',
                cursor: 'pointer',
                animation: `fadeUp 0.3s ease ${Math.min(i * 0.03, 0.3)}s both`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#aeaeb2' }}>
                  {TYPE_NAMES[entry.type] || entry.type}
                </span>
                <span style={{ fontSize: 11, color: '#d2d2d7' }}>/</span>
                <span style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: entry.impact === 'benefit' ? '#32834a' : entry.impact === 'harm' ? '#c23030' : '#86868b',
                }}>
                  {entry.impact}
                </span>
                <span style={{ fontSize: 11, color: '#d2d2d7' }}>/</span>
                <span style={{ fontSize: 11, color: '#aeaeb2' }}>{entry.year}</span>
              </div>

              <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
                {entry.stat}
              </div>
              <p style={{ fontSize: 12, color: '#aeaeb2', marginBottom: 14 }}>
                {entry.stat_context}
              </p>

              <p style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.47, letterSpacing: '-0.015em' }}>
                {entry.claim}
              </p>

              {isOpen && (
                <div style={{ marginTop: 20, animation: 'fadeUp 0.2s ease both' }}>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: '#424245' }}>
                    {entry.summary}
                  </p>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: 13, color: '#86868b', lineHeight: 1.55 }}>
                      {entry.authors} ({entry.year}). <em>{entry.publication}</em>
                      {link && (
                        <>
                          {' '}
                          <a href={link} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
                            style={{ color: '#06c', textDecoration: 'none' }}>
                            {entry.doi ? 'DOI' : 'Source'} ↗
                          </a>
                        </>
                      )}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                      {(entry.sectors || []).map(s => (
                        <span key={s}
                          onClick={e => { e.stopPropagation(); setSector(s); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                          style={{
                            fontSize: 11, fontWeight: 500, padding: '4px 10px',
                            borderRadius: 6, background: 'rgba(0,0,0,0.04)',
                            color: '#6e6e73', cursor: 'pointer',
                          }}>
                          {SECTOR_NAMES[s] || s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          )
        })}

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '80px 0', color: '#aeaeb2', fontSize: 15 }}>
            No entries match your filters.
          </p>
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 48px', textAlign: 'center' }}>
        <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: '#aeaeb2', lineHeight: 1.7 }}>
            The AI Atlas
          </p>
          <p style={{ fontSize: 11, color: '#d2d2d7', marginTop: 4 }}>
            Every claim backed by cited sources. Evidence, not opinion.
          </p>
        </div>
      </footer>
    </>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      fontSize: 12, fontWeight: active ? 600 : 400,
      padding: '5px 12px', borderRadius: 980,
      border: active ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
      background: active ? '#1d1d1f' : 'transparent',
      color: active ? '#fff' : '#6e6e73',
      cursor: 'pointer', transition: 'all 0.15s ease',
    }}>
      {children}
    </button>
  )
}
