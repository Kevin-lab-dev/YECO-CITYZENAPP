// YECO — icons + shared UI primitives

const Icon = ({ name, size = 24, stroke = 2, color = 'currentColor', style = {} }) => {
  const P = {
    fill: 'none', stroke: color, strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  const paths = {
    home: <><path d="M3 11L12 3l9 8" {...P}/><path d="M5 10v10h14V10" {...P}/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" {...P}/><path d="M3 10h18M8 3v4M16 3v4" {...P}/></>,
    leaf: <><path d="M5 19c0-8 7-14 15-14 0 8-6 15-14 15-1 0-1 0-1-1z" {...P}/><path d="M5 19c2-4 5-7 10-10" {...P}/></>,
    bell: <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 7 2 7H4s2-2 2-7z" {...P}/><path d="M10 21a2 2 0 0 0 4 0" {...P}/></>,
    user: <><circle cx="12" cy="8" r="4" {...P}/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" {...P}/></>,
    plus: <><path d="M12 5v14M5 12h14" {...P}/></>,
    check: <><path d="M5 13l4 4L19 7" {...P}/></>,
    chevron: <><path d="M9 6l6 6-6 6" {...P}/></>,
    chevronLeft: <><path d="M15 6l-6 6 6 6" {...P}/></>,
    chevronDown: <><path d="M6 9l6 6 6-6" {...P}/></>,
    scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" {...P}/><path d="M4 12h16" {...P}/></>,
    qr: <><rect x="3" y="3" width="7" height="7" rx="1" {...P}/><rect x="14" y="3" width="7" height="7" rx="1" {...P}/><rect x="3" y="14" width="7" height="7" rx="1" {...P}/><path d="M14 14h3v3M21 14v7h-7M17 21v-4" {...P}/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" {...P}/></>,
    truck: <><path d="M3 7h11v10H3z" {...P}/><path d="M14 10h5l2 3v4h-7" {...P}/><circle cx="7" cy="18" r="2" {...P}/><circle cx="17" cy="18" r="2" {...P}/></>,
    clock: <><circle cx="12" cy="12" r="9" {...P}/><path d="M12 7v5l3 2" {...P}/></>,
    map: <><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" {...P}/><path d="M9 4v16M15 6v16" {...P}/></>,
    mapPin: <><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" {...P}/><circle cx="12" cy="9" r="2.5" {...P}/></>,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4zM8 8H5v2a3 3 0 0 0 3 3M16 8h3v2a3 3 0 0 1-3 3M10 14v3h4v-3M8 20h8" {...P}/></>,
    star: <><path d="M12 3l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1L6.6 19.4l1.3-6L3.3 9.2l6.1-.6L12 3z" {...P}/></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" {...P}/><path d="M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" {...P}/></>,
    camera: <><path d="M4 7h3l2-3h6l2 3h3v12H4z" {...P}/><circle cx="12" cy="13" r="4" {...P}/></>,
    wallet: <><path d="M3 7h15a2 2 0 0 1 2 2v1H4a1 1 0 0 0 0 2h16v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" {...P}/><circle cx="17" cy="13" r="1.2" fill={color} stroke="none"/></>,
    bolt: <><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" {...P}/></>,
    recycle: <><path d="M7 10l2-4 2 2-3 5-5-1 2-2zM17 10l-2-4-2 2 3 5 5-1-2-2zM12 22l4-2-2-2-5 3 2 3 1-2z" {...P}/></>,
    close: <><path d="M6 6l12 12M6 18L18 6" {...P}/></>,
    settings: <><circle cx="12" cy="12" r="3" {...P}/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.3 7.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" {...P}/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" {...P}/></>,
    flame: <><path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 1-3s-1 5 3 5c2 0 0-10 0-10z" {...P}/></>,
    info: <><circle cx="12" cy="12" r="9" {...P}/><path d="M12 11v6M12 7.5v.5" {...P}/></>,
    tree: <><path d="M12 3l5 7h-3l4 5h-3l3 5H6l3-5H6l4-5H7l5-7z" {...P}/><path d="M12 20v2" {...P}/></>,
    filter: <><path d="M3 5h18l-7 9v5l-4 2v-7L3 5z" {...P}/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" {...P}/><path d="M8 11V8a4 4 0 0 1 8 0v3" {...P}/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" {...P}/><circle cx="12" cy="12" r="3" {...P}/></>,
    share: <><circle cx="6" cy="12" r="2.5" {...P}/><circle cx="18" cy="6" r="2.5" {...P}/><circle cx="18" cy="18" r="2.5" {...P}/><path d="M8 11l8-4M8 13l8 4" {...P}/></>,
    refresh: <><path d="M4 12a8 8 0 0 1 13.3-6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.3 6L4 16M4 20v-4h4" {...P}/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, ...style }}>
      {paths[name]}
    </svg>
  );
};

// YECO Wordmark — custom. A stylized Y with a sprouting leaf.
const YecoMark = ({ size = 28, color = 'var(--leaf)' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <circle cx="16" cy="16" r="15" fill={color}/>
    {/* Y */}
    <path d="M10 9l6 8 6-8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17v7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
    {/* tiny leaf */}
    <path d="M16 14c2-1 3.5-0.5 4-2.5-2 0-3.2 0.8-4 2.5z" fill="#bdf26a"/>
  </svg>
);

// Animated liquid fill for a bin compartment
const LiquidFill = ({ percent = 50, color = 'var(--leaf)', size = 110, label, sub, state = 'ok' }) => {
  const fillH = Math.max(4, Math.min(100, percent)) / 100;
  const waveColor = color;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* jar */}
      <svg width={size} height={size} viewBox="0 0 110 110" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <clipPath id={`clip-${label}`}>
            <rect x="15" y="12" width="80" height="88" rx="14"/>
          </clipPath>
        </defs>
        {/* glass */}
        <rect x="15" y="12" width="80" height="88" rx="14" fill="var(--bg-2)"/>
        {/* liquid */}
        <g clipPath={`url(#clip-${label})`}>
          <rect
            x="0" y={100 - fillH * 88 + 12}
            width="220" height="200"
            fill={waveColor}
            opacity="0.88"
            style={{ transition: 'y 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          />
          {/* wave */}
          <path
            d={`M-10 ${100 - fillH * 88 + 12} Q 15 ${100 - fillH * 88 + 6} 40 ${100 - fillH * 88 + 12} T 90 ${100 - fillH * 88 + 12} T 140 ${100 - fillH * 88 + 12} T 190 ${100 - fillH * 88 + 12} T 240 ${100 - fillH * 88 + 12} L 240 120 L -10 120 Z`}
            fill={waveColor}
            opacity="1"
            style={{ transform: 'translateX(0)', animation: 'wave 3.5s linear infinite' }}
          />
        </g>
        {/* lid */}
        <rect x="22" y="7" width="66" height="10" rx="4" fill="var(--ink-4)" opacity="0.5"/>
        {/* outline */}
        <rect x="15" y="12" width="80" height="88" rx="14" fill="none" stroke="var(--line)" strokeWidth="1.5"/>
      </svg>
      {/* label over */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: percent > 55 ? '#fff' : 'var(--ink)', lineHeight: 1 }}>
          {percent}<span style={{ fontSize: 14, fontWeight: 600, opacity: 0.8 }}>%</span>
        </div>
        <div style={{ fontSize: 10, fontWeight: 600, color: percent > 55 ? 'rgba(255,255,255,0.9)' : 'var(--ink-3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {sub}
        </div>
      </div>
    </div>
  );
};

// Bottom Tab Bar
const TabBar = ({ active, setActive, t }) => {
  const tabs = [
    { id: 'home', icon: 'home', label: t('home') },
    { id: 'collect', icon: 'truck', label: t('collect') },
    { id: 'impact', icon: 'leaf', label: t('impact') },
    { id: 'wallet', icon: 'wallet', label: t('wallet') },
    { id: 'profile', icon: 'user', label: t('profile') },
  ];
  return (
    <div style={{
      background: 'var(--card)',
      borderTop: '1px solid var(--line)',
      padding: '8px 8px 6px',
      display: 'flex', justifyContent: 'space-around',
      flexShrink: 0,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className="tap"
            style={{
              appearance: 'none', border: 0, background: 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '6px 10px', cursor: 'pointer',
              color: isActive ? 'var(--leaf)' : 'var(--ink-3)',
              fontFamily: 'inherit',
              position: 'relative',
            }}>
            {isActive && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 26, height: 3, borderRadius: 2, background: 'var(--leaf)',
              }}/>
            )}
            <div style={{
              padding: 6, borderRadius: 12,
              background: isActive ? 'var(--leaf-soft)' : 'transparent',
              transition: 'background 0.2s',
            }}>
              <Icon name={tab.icon} size={22} stroke={isActive ? 2.2 : 1.8}/>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: isActive ? 700 : 500, letterSpacing: 0.1 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Status chip
const StatusChip = ({ type = 'ok', children }) => {
  const styles = {
    ok:     { bg: 'var(--leaf-soft)', fg: 'var(--leaf-deep)', dot: 'var(--leaf)' },
    warn:   { bg: 'var(--amber-soft)', fg: '#7a4a00', dot: 'var(--amber)' },
    danger: { bg: 'oklch(0.96 0.04 25)', fg: 'oklch(0.5 0.15 27)', dot: 'var(--danger)' },
    live:   { bg: 'var(--lime-soft)', fg: 'oklch(0.4 0.15 130)', dot: 'oklch(0.65 0.2 130)' },
  }[type];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: styles.bg, color: styles.fg,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.2,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: styles.dot, animation: type === 'live' ? 'bob 1.2s ease infinite' : 'none' }}/>
      {children}
    </div>
  );
};

// Sheet / modal wrapper
const Sheet = ({ open, onClose, children, height = 'auto' }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--card)',
          borderTopLeftRadius: 28, borderTopRightRadius: 28,
          padding: '8px 0 28px',
          animation: 'sheetUp 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
          maxHeight: '85%',
          overflowY: 'auto',
          height,
        }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--line-2)', margin: '8px auto 14px' }}/>
        {children}
      </div>
    </div>
  );
};

// Placeholder striped pattern
const Striped = ({ w = '100%', h = 120, label }) => (
  <div style={{
    width: w, height: h, borderRadius: 16,
    background: 'repeating-linear-gradient(45deg, var(--bg-2), var(--bg-2) 6px, var(--bg) 6px, var(--bg) 12px)',
    border: '1px dashed var(--line-2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
  }}>{label}</div>
);

Object.assign(window, { Icon, YecoMark, LiquidFill, TabBar, StatusChip, Sheet, Striped });
