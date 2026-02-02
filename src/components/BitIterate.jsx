import SEO from './SEO';
import Footer from './Footer';
import './BitIterate.css';

// Sad robot variations - arc-only tears with sobbing motion variations
const sadVariations = [
  {
    id: 'v1',
    name: 'V1: Gentle Sob',
    description: 'Subtle sobbing motion, slow tears',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v1">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Arc tears only - no circles */}
          <path className="tear-arc-left" d="M14 27 Q6 18 2 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right" d="M50 27 Q58 18 62 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v2',
    name: 'V2: Heavy Sob',
    description: 'More pronounced head movement',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v2">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path className="tear-arc-left" d="M14 27 Q6 18 2 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right" d="M50 27 Q58 18 62 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v3',
    name: 'V3: Double Arc',
    description: 'Two tear arcs per side',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v3">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Double arcs */}
          <path className="tear-arc-left-1" d="M14 25 Q7 17 3 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-left-2" d="M14 30 Q6 23 2 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right-1" d="M50 25 Q57 17 61 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right-2" d="M50 30 Q58 23 62 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v4',
    name: 'V4: Triple Arc Spray',
    description: 'Three tear arcs fanning out',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v4">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Triple arcs */}
          <path className="tear-arc-left-1" d="M14 23 Q8 14 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-left-2" d="M14 27 Q6 18 2 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-left-3" d="M14 31 Q7 25 3 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right-1" d="M50 23 Q56 14 60 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right-2" d="M50 27 Q58 18 62 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right-3" d="M50 31 Q57 25 61 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v5',
    name: 'V5: Longer Arcs',
    description: 'Extended tear arcs reaching further',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 72 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v5">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Longer arcs */}
          <path className="tear-arc-left" d="M14 27 Q4 14 -2 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right" d="M50 27 Q60 14 66 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v6',
    name: 'V6: Thicker Arcs',
    description: 'Heavier stroke weight on tears',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v6">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Thicker arcs */}
          <path className="tear-arc-left" d="M14 27 Q6 18 2 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right" d="M50 27 Q58 18 62 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v7',
    name: 'V7: Alternating Arcs',
    description: 'Left and right tears alternate timing',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v7">
        <g className="sobbing-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path className="tear-arc-left" d="M14 27 Q6 18 2 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path className="tear-arc-right" d="M50 27 Q58 18 62 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="32" cy="52" r="1.5"/>
        <circle cx="32" cy="58" r="1.5"/>
        <g className="arm-left">
          <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="62" r="2"/>
        </g>
        <g className="arm-right">
          <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="48" cy="62" r="2"/>
        </g>
        <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'v8',
    name: 'V8: Full Body Sob',
    description: 'Sobbing with whole body involved',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v8">
        <g className="full-body-sob">
          <g className="sobbing-group">
            <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
            <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path className="tear-arc-left" d="M14 27 Q6 18 2 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path className="tear-arc-right" d="M50 27 Q58 18 62 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </g>
          <rect className="body" x="26" y="46" width="12" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="52" r="1.5"/>
          <circle cx="32" cy="58" r="1.5"/>
          <g className="arm-left">
            <line x1="20" y1="52" x2="16" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="16" cy="62" r="2"/>
          </g>
          <g className="arm-right">
            <line x1="44" y1="52" x2="48" y2="62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="48" cy="62" r="2"/>
          </g>
          <line className="leg-left" x1="27" y1="68" x2="27" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="leg-right" x1="37" y1="68" x2="37" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  },
];

export default function BitIterate() {
  return (
    <>
      <SEO
        title="Sad Bit Iteration | Please Recompile"
        description="Iterating on the sad robot design"
      />
      <main className="bit-page">
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '8px' }}>Sad Bit Iteration</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Arc-only fountain tears with sobbing variations. Hover to see animations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '48px'
          }}>
            {sadVariations.map((variant) => (
              <div key={variant.id} className="iterate-card">
                <div className="iterate-preview">
                  {variant.svg(96)}
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: '14px' }}>{variant.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{variant.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
