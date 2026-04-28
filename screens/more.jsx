// YECO — Track collection + Impact + Wallet + Profile + Onboarding

const TrackScreen = ({ t, goBack, nav }) => {
  const [status, setStatus] = React.useState(1); // 0 pending, 1 assigned, 2 on-way, 3 collected, 4 validated
  const [eta, setEta] = React.useState(14);

  React.useEffect(() => {
    const id = setInterval(() => setEta(e => Math.max(1, e - 1)), 4000);
    return () => clearInterval(id);
  }, []);

  const steps = [
    { id: 0, label: t('pending'), icon: 'clock' },
    { id: 1, label: t('assigned'), icon: 'user' },
    { id: 2, label: t('collectorOnWay'), icon: 'truck' },
    { id: 3, label: t('collected'), icon: 'check' },
    { id: 4, label: t('validated'), icon: 'star' },
  ];

  return (
    <div className="screen-scroll page-enter">
      <div style={{ padding: '10px 16px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={goBack} className="tap" style={{
          width: 40, height: 40, borderRadius: 999, border: 0,
          background: 'var(--card)', boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: 'var(--ink)',
        }}>
          <Icon name="chevronLeft" size={20}/>
        </button>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{t('trackCollection')}</div>
        <div style={{ marginLeft: 'auto' }}>
          <StatusChip type="live">{t('live')}</StatusChip>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          height: 220, borderRadius: 24, position: 'relative', overflow: 'hidden',
          background: 'oklch(0.96 0.015 150)',
          border: '1px solid var(--line)',
        }}>
          {/* stylized street grid */}
          <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%">
            <defs>
              <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="oklch(0.9 0.02 150)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            {/* roads */}
            <path d="M 0 110 Q 100 80 220 120 T 400 90" stroke="oklch(0.88 0.02 150)" strokeWidth="14" fill="none" strokeLinecap="round"/>
            <path d="M 140 0 Q 160 120 130 240" stroke="oklch(0.88 0.02 150)" strokeWidth="14" fill="none" strokeLinecap="round"/>
            <path d="M 0 110 Q 100 80 220 120 T 400 90" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d="M 140 0 Q 160 120 130 240" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round"/>
            {/* route */}
            <path d="M 50 180 Q 100 150 130 140 T 230 110" stroke="var(--leaf)" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round"/>
          </svg>
          {/* truck marker (collector) */}
          <div style={{
            position: 'absolute', left: '18%', top: '70%',
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: -12, borderRadius: 999,
                background: 'var(--leaf)', opacity: 0.2,
                animation: 'pulse-ring 2s infinite',
              }}/>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                background: 'var(--leaf)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-md)', position: 'relative',
              }}>
                <Icon name="truck" size={18} stroke={2.2}/>
              </div>
            </div>
          </div>
          {/* home marker */}
          <div style={{ position: 'absolute', right: '25%', top: '38%' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 999,
              background: 'var(--ink)', color: 'var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
            }}>
              <Icon name="home" size={16}/>
            </div>
          </div>
          {/* ETA pill */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '10px 14px', borderRadius: 999, background: 'var(--ink)', color: 'var(--bg)',
            fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: 'var(--shadow-md)',
          }}>
            <Icon name="clock" size={14}/> {t('arrivesIn')} {eta} {t('minutes')}
          </div>
        </div>
      </div>

      {/* Collector card */}
      <div style={{ padding: '6px 16px 12px' }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 999,
              background: 'var(--leaf-soft)', color: 'var(--leaf-deep)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 18, position: 'relative',
            }}>
              ST
              <div style={{
                position: 'absolute', bottom: -2, right: -2,
                width: 18, height: 18, borderRadius: 999,
                background: 'oklch(0.65 0.2 130)', border: '3px solid var(--card)',
              }}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{MOCK.collector.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <Icon name="star" size={12} color="var(--amber)"/> {MOCK.collector.rating}
                <span>•</span>
                <span>{MOCK.collector.collections} {t('collections')}</span>
                <span>•</span>
                <span>Tricycle</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="tap" style={{ width: 44, height: 44, borderRadius: 999, border: 0, cursor: 'pointer', background: 'var(--leaf)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="bell" size={18}/>
              </button>
              <button className="tap" style={{ width: 44, height: 44, borderRadius: 999, border: 0, cursor: 'pointer', background: 'var(--bg-2)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="info" size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '6px 16px 24px' }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 16 }}>
            Statut de la collecte
          </div>
          {steps.map((s, i) => {
            const done = i < status;
            const current = i === status;
            return (
              <div key={s.id} style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: i < steps.length - 1 ? 20 : 0 }}>
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute', left: 15, top: 32, bottom: -4, width: 2,
                    background: done ? 'var(--leaf)' : 'var(--line)',
                  }}/>
                )}
                <div style={{
                  width: 32, height: 32, borderRadius: 999, flexShrink: 0,
                  background: done || current ? 'var(--leaf)' : 'var(--bg-2)',
                  color: done || current ? '#fff' : 'var(--ink-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: current ? '0 0 0 6px var(--leaf-soft)' : 'none',
                  zIndex: 1, position: 'relative',
                }}>
                  <Icon name={s.icon} size={16} stroke={2.4}/>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: current ? 700 : 500, color: done || current ? 'var(--ink)' : 'var(--ink-3)' }}>{s.label}</div>
                  {current && (
                    <div style={{ fontSize: 12, color: 'var(--leaf-deep)', fontWeight: 600, marginTop: 2 }}>
                      En cours…
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <button onClick={() => setStatus(s => Math.min(4, s + 1))} className="btn btn-secondary" style={{ width: '100%', marginTop: 16 }}>
            Simuler l'étape suivante
          </button>
        </div>
      </div>
    </div>
  );
};

// IMPACT screen
const ImpactScreen = ({ t }) => {
  const stats = [
    { icon: 'leaf', color: 'var(--leaf)', bg: 'var(--leaf-soft)', value: '142', unit: 'kg', label: 'CO₂ évités' },
    { icon: 'tree', color: 'oklch(0.5 0.14 145)', bg: 'var(--leaf-soft)', value: '8.6', unit: '', label: 'arbres équiv.' },
    { icon: 'recycle', color: 'oklch(0.45 0.14 220)', bg: 'oklch(0.94 0.05 220)', value: '47', unit: 'kg', label: 'plastique recyclé' },
    { icon: 'sparkle', color: 'oklch(0.55 0.15 85)', bg: 'var(--amber-soft)', value: '1 284', unit: 'pts', label: 'Écopoints' },
  ];
  const badges = [
    { icon: '🌱', name: t('pionneer'), unlocked: true, date: '12 mars' },
    { icon: '🏆', name: t('ecoHero'), unlocked: true, date: '2 avril' },
    { icon: '🤝', name: t('ambassador'), unlocked: false, progress: '2/5' },
    { icon: '♻️', name: 'Trieur d\'élite', unlocked: false, progress: '18/30 j' },
  ];

  return (
    <div className="screen-scroll page-enter">
      <div style={{ padding: '12px 20px 4px' }}>
        <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Instrument Serif, serif', lineHeight: 1.1 }}>
          Votre impact
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{t('sinceJoined')} • Mars 2026</div>
      </div>

      {/* Hero CO2 card */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          borderRadius: 28, padding: 24,
          background: 'linear-gradient(160deg, var(--leaf), var(--leaf-deep))',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <svg style={{ position: 'absolute', right: -60, bottom: -60, opacity: 0.12 }} width="260" height="260" viewBox="0 0 260 260">
            <path d="M130 20 C 180 70, 220 110, 130 240 C 40 110, 80 70, 130 20 Z" fill="#fff"/>
          </svg>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, opacity: 0.85 }}>
            CO₂ évités ce mois
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
            <div className="serif" style={{ fontSize: 72, lineHeight: 0.9, fontWeight: 400 }}>18,4</div>
            <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.9 }}>kg</div>
          </div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 12, maxWidth: 240, lineHeight: 1.4 }}>
            Équivalent à <b>1,2 arbres</b> plantés ou <b>86 km</b> en voiture non parcourus.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <div style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="bolt" size={12}/> +12% vs. mois dernier
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '6px 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            padding: 16, borderRadius: 22, background: s.bg,
          }}>
            <div style={{ color: s.color, marginBottom: 10 }}><Icon name={s.icon} size={22}/></div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: 'Instrument Serif, serif', lineHeight: 1 }}>
              {s.value}<span style={{ fontSize: 14, marginLeft: 3 }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-2)', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ padding: '6px 16px 12px' }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Collectes sur 7 jours</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>kg collectés</div>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 120 }}>
            {[
              { d: 'L', o: 28, n: 8 },
              { d: 'M', o: 45, n: 15 },
              { d: 'M', o: 32, n: 10 },
              { d: 'J', o: 60, n: 22 },
              { d: 'V', o: 50, n: 18 },
              { d: 'S', o: 75, n: 30 },
              { d: 'D', o: 42, n: 14 },
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2 }}>
                  <div style={{ height: `${bar.n}%`, background: 'oklch(0.55 0.12 220)', borderRadius: 4 }}/>
                  <div style={{ height: `${bar.o}%`, background: 'var(--leaf)', borderRadius: 4 }}/>
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)' }}>{bar.d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-2)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--leaf)' }}/> Organique
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-2)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: 'oklch(0.55 0.12 220)' }}/> Non-organique
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '6px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{t('badges')}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>2 / 12</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {badges.map(b => (
            <div key={b.name} style={{
              padding: 14, borderRadius: 20,
              background: b.unlocked ? 'var(--card)' : 'var(--bg-2)',
              boxShadow: b.unlocked ? 'var(--shadow-sm)' : 'none',
              border: b.unlocked ? 0 : '1px dashed var(--line-2)',
              opacity: b.unlocked ? 1 : 0.75,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, marginBottom: 10,
                background: b.unlocked ? 'var(--amber-soft)' : 'var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, filter: b.unlocked ? 'none' : 'grayscale(1)',
              }}>{b.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>
                {b.unlocked ? `Obtenu le ${b.date}` : b.progress}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// WALLET / Subscription
const WalletScreen = ({ t }) => {
  return (
    <div className="screen-scroll page-enter">
      <div style={{ padding: '12px 20px 4px' }}>
        <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Instrument Serif, serif', lineHeight: 1.1 }}>
          Portefeuille
        </div>
      </div>

      {/* Ecopoints card */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          borderRadius: 28, padding: 22,
          background: 'linear-gradient(140deg, oklch(0.78 0.14 75), oklch(0.65 0.15 50))',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, opacity: 0.9 }}>
            Solde Écopoints
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
            <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>1 284</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>pts</div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
            ≈ 6 420 FCFA de crédit YECO
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button className="tap" style={{
              flex: 1, height: 40, border: 0, borderRadius: 999,
              background: '#fff', color: 'oklch(0.45 0.15 60)',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            }}>{t('redeem')}</button>
            <button className="tap" style={{
              height: 40, padding: '0 16px', border: 0, borderRadius: 999,
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            }}>+ {t('earnMore')}</button>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div style={{ padding: '6px 16px 12px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10, padding: '0 4px' }}>
          Abonnement
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Essentiel</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                {t('activeUntil')} 24 mai 2026
              </div>
            </div>
            <StatusChip type="ok">Actif</StatusChip>
          </div>

          <div style={{ padding: 14, background: 'var(--bg)', borderRadius: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 6 }}>
              <span>Collectes organiques ce mois</span>
              <span>12 / 15</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'var(--line)' }}>
              <div style={{ width: '80%', height: '100%', borderRadius: 99, background: 'var(--leaf)' }}/>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Instrument Serif, serif' }}>1 500 <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>FCFA/mois</span></div>
            </div>
            <button className="btn btn-secondary" style={{ height: 40, padding: '0 16px', fontSize: 13 }}>
              Passer à Premium <Icon name="sparkle" size={14}/>
            </button>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div style={{ padding: '6px 16px 12px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10, padding: '0 4px' }}>
          Moyens de paiement
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { label: 'MTN Mobile Money', sub: '+237 ••• 32 45 38', color: '#ffcc00', fg: '#000', init: 'MTN', primary: true },
            { label: 'Orange Money', sub: '+237 ••• 12 08 77', color: '#ff6600', fg: '#fff', init: 'OM' },
          ].map((m, i, arr) => (
            <div key={m.label} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: m.color, color: m.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>{m.init}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {m.label}
                  {m.primary && <span style={{ fontSize: 9.5, fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: 'var(--leaf-soft)', color: 'var(--leaf-deep)' }}>PRINCIPAL</span>}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{m.sub}</div>
              </div>
              <Icon name="chevron" size={16} color="var(--ink-3)"/>
            </div>
          ))}
          <button style={{ width: '100%', padding: 14, border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--leaf)', fontWeight: 700, fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Icon name="plus" size={16}/> Ajouter un moyen de paiement
          </button>
        </div>
      </div>

      {/* History */}
      <div style={{ padding: '6px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Historique</div>
          <div style={{ fontSize: 11, color: 'var(--leaf)', fontWeight: 700 }}>Tout voir</div>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { label: 'Collecte organique', date: '22 avr.', amount: '-500', state: 'via abonnement' },
            { label: 'Abonnement Essentiel', date: '20 avr.', amount: '-1 500', state: 'MTN MoMo' },
            { label: 'Bonus parrainage', date: '18 avr.', amount: '+250 pts', plus: true },
            { label: 'Collecte organique', date: '15 avr.', amount: '-500', state: 'via abonnement' },
          ].map((tx, i, arr) => (
            <div key={i} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: tx.plus ? 'var(--amber-soft)' : 'var(--bg-2)',
                color: tx.plus ? 'oklch(0.55 0.15 85)' : 'var(--ink-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={tx.plus ? 'sparkle' : 'truck'} size={16}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{tx.label}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{tx.date} • {tx.state}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: tx.plus ? 'var(--leaf)' : 'var(--ink)' }}>
                {tx.amount}{!tx.plus && ' FCFA'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// PROFILE screen
const ProfileScreen = ({ t, setState, state }) => {
  const items = [
    { icon: 'user', label: 'Mon profil', sub: MOCK.user.fullName },
    { icon: 'mapPin', label: 'Adresse', sub: MOCK.user.neighborhood },
    { icon: 'qr', label: 'Mes poubelles', sub: '1 poubelle active • YB-08342' },
    { icon: 'bell', label: 'Notifications', sub: 'Push + SMS' },
    { icon: 'settings', label: 'Préférences', sub: 'Langue, thème' },
    { icon: 'info', label: 'Aide et support', sub: 'FAQ, contact' },
  ];
  return (
    <div className="screen-scroll page-enter">
      <div style={{ padding: '12px 20px 4px' }}>
        <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Instrument Serif, serif', lineHeight: 1.1 }}>
          Profil
        </div>
      </div>

      {/* Profile header card */}
      <div style={{ padding: '14px 16px' }}>
        <div className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'linear-gradient(135deg, var(--leaf), var(--leaf-deep))',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 22,
          }}>A</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{MOCK.user.fullName}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Membre depuis mars 2026</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <div className="chip"><Icon name="flame" size={12}/> 21 j</div>
              <div className="chip" style={{ background: 'var(--amber-soft)', color: 'oklch(0.45 0.15 75)' }}>#4 quartier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: '6px 16px 12px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {items.map((it, i, arr) => (
            <button key={it.label} className="tap" style={{
              width: '100%', border: 0, background: 'transparent', cursor: 'pointer',
              padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 0,
              fontFamily: 'inherit', textAlign: 'left', color: 'var(--ink)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'var(--leaf-soft)', color: 'var(--leaf-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={it.icon} size={18}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{it.label}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{it.sub}</div>
              </div>
              <Icon name="chevron" size={16} color="var(--ink-3)"/>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '4px 16px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace' }}>
          YECO v1.0 • Nexus Africa Solutions
        </div>
      </div>
    </div>
  );
};

// ONBOARDING modal (phone + OTP)
const OnboardingScreen = ({ t, onDone }) => {
  const [step, setStep] = React.useState(0);
  const [phone, setPhone] = React.useState('656 32 45 38');
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);

  return (
    <div className="screen-scroll" style={{ background: 'var(--bg)' }}>
      {step === 0 && (
        <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{
              width: 96, height: 96, borderRadius: 28,
              background: 'linear-gradient(135deg, var(--leaf), var(--leaf-deep))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', marginBottom: 24,
              boxShadow: '0 20px 40px oklch(0.52 0.12 155 / 0.25)',
            }}>
              <YecoMark size={56} color="#fff"/>
            </div>
            <div className="serif" style={{ fontSize: 42, lineHeight: 1, marginBottom: 8 }}>
              Bienvenue
            </div>
            <div style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: 280, lineHeight: 1.5 }}>
              Votre éco-compagnon pour la gestion intelligente des déchets à Yaoundé.
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setStep(1)} style={{ width: '100%' }}>
            Commencer <Icon name="arrow" size={18}/>
          </button>
          <button className="btn btn-ghost" style={{ width: '100%', marginTop: 6 }} onClick={onDone}>
            J'ai déjà un compte
          </button>
        </div>
      )}
      {step === 1 && (
        <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setStep(0)} className="tap" style={{ width: 40, height: 40, borderRadius: 999, border: 0, background: 'var(--card)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)', marginBottom: 20 }}>
            <Icon name="chevronLeft" size={20}/>
          </button>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>Votre numéro</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
              Nous vous enverrons un code SMS à 6 chiffres pour vérifier.
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 14px', borderRadius: 16, background: 'var(--card)', boxShadow: 'var(--shadow-sm)', border: '2px solid var(--leaf)' }}>
              <div style={{ fontSize: 20 }}>🇨🇲</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-2)' }}>+237</div>
              <div style={{ width: 1, height: 24, background: 'var(--line)' }}/>
              <input value={phone} onChange={e => setPhone(e.target.value)} style={{
                flex: 1, border: 0, outline: 0, padding: '14px 0',
                fontSize: 17, fontWeight: 700, fontFamily: 'inherit', color: 'var(--ink)',
                background: 'transparent',
              }}/>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
              <Icon name="lock" size={12}/> Nous respectons la loi n°2010/012 sur la cybersécurité.
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setStep(2)} style={{ width: '100%' }}>
            Envoyer le code
          </button>
        </div>
      )}
      {step === 2 && (
        <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setStep(1)} className="tap" style={{ width: 40, height: 40, borderRadius: 999, border: 0, background: 'var(--card)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)', marginBottom: 20 }}>
            <Icon name="chevronLeft" size={20}/>
          </button>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>Code SMS</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 28 }}>
              Entrez les 6 chiffres envoyés au +237 {phone}.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              {['4', '2', '7', '8', '1', ''].map((d, i) => (
                <div key={i} style={{
                  flex: 1, height: 62, borderRadius: 14,
                  background: 'var(--card)',
                  border: i === 5 ? '2px solid var(--leaf)' : d ? '2px solid var(--line-2)' : '2px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, fontWeight: 700, color: 'var(--ink)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {d || (i === 5 ? <span style={{ width: 2, height: 28, background: 'var(--leaf)', animation: 'bob 1s infinite' }}/> : '')}
                </div>
              ))}
            </div>
            <button style={{ marginTop: 16, border: 0, background: 'transparent', color: 'var(--leaf)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              Renvoyer le code (30s)
            </button>
          </div>
          <button className="btn btn-primary" onClick={onDone} style={{ width: '100%' }}>
            Vérifier et continuer
          </button>
        </div>
      )}
    </div>
  );
};

// Notifications list
const NotificationsScreen = ({ t, goBack }) => {
  const notifs = [
    { icon: 'bell', color: 'var(--amber)', bg: 'var(--amber-soft)', title: t('binFull'), body: t('binFullSub'), time: 'à l\'instant', unread: true },
    { icon: 'truck', color: 'var(--leaf)', bg: 'var(--leaf-soft)', title: t('collectionConfirmed'), body: t('collectionConfirmedSub'), time: 'il y a 2h', unread: true },
    { icon: 'trophy', color: 'oklch(0.55 0.15 85)', bg: 'var(--amber-soft)', title: t('newBadge'), body: t('newBadgeSub'), time: 'hier', unread: false },
    { icon: 'sparkle', color: 'oklch(0.45 0.14 220)', bg: 'oklch(0.94 0.05 220)', title: '+250 Écopoints', body: 'Parrainage de Famille Mfoula confirmé', time: 'il y a 3 jours', unread: false },
  ];
  return (
    <div className="screen-scroll page-enter">
      <div style={{ padding: '10px 16px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={goBack} className="tap" style={{
          width: 40, height: 40, borderRadius: 999, border: 0,
          background: 'var(--card)', boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: 'var(--ink)',
        }}>
          <Icon name="chevronLeft" size={20}/>
        </button>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{t('notifications')}</div>
      </div>
      <div style={{ padding: '12px 16px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8, padding: '0 4px' }}>
          {t('alertsToday')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notifs.map((n, i) => (
            <div key={i} className="card" style={{ padding: 14, display: 'flex', gap: 12, position: 'relative' }}>
              {n.unread && <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: 999, background: 'var(--leaf)' }}/>}
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: n.bg, color: n.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                marginLeft: 8,
              }}>
                <Icon name={n.icon} size={20}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{n.body}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-4)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { TrackScreen, ImpactScreen, WalletScreen, ProfileScreen, OnboardingScreen, NotificationsScreen });
