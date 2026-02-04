'use client';

// Sad robot variations - eye squint only, no fountains
const sadVariations = [
  {
    id: 'v1',
    name: 'V1: Squint Only',
    description: 'Just the subtle eye squint',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v1">
        <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
        <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
    name: 'V2: Squint + Head Bob',
    description: 'Eye squint with gentle head movement',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v2">
        <g className="head-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
    name: 'V3: Squint + Antenna Droop',
    description: 'Eye squint with sad drooping antenna',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v3">
        <g className="antenna-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
        <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
    name: 'V4: Squint + Body Shudder',
    description: 'Eye squint with subtle body trembling',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v4">
        <g className="body-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
  {
    id: 'v5',
    name: 'V5: Squint + Slow Blink',
    description: 'Eyes squint then close briefly',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v5">
        <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
        <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
    name: 'V6: Squint + Arm Droop',
    description: 'Eye squint with arms hanging lower',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v6">
        <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
        <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
    name: 'V7: Squint + Head Tilt',
    description: 'Eye squint with slight head tilting',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v7">
        <g className="head-group">
          <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
    name: 'V8: Squint + Everything',
    description: 'All subtle movements combined',
    svg: (size) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 64 82" fill="currentColor" width={size} height={size * 1.25} className="sad-v8">
        <g className="body-group">
          <g className="head-group">
            <g className="antenna-group">
              <circle className="antenna-ball" cx="32" cy="3" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
              <line className="antenna-stem" x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </g>
            <rect className="head" x="16" y="14" width="32" height="26" rx="8" ry="8" fill="none" stroke="currentColor" strokeWidth="3"/>
            <line className="eye-left" x1="22" y1="28" x2="28" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line className="eye-right" x1="36" y1="25" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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

export default function BitIterateClient() {
  return (
    <main className="bit-page">
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '8px' }}>Sad Bit Iteration</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Eye squint variations with subtle body movements. Hover to see animations.
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
  );
}
