// YECO — Request a pickup flow

const RequestScreen = ({ t, nav, goBack }) => {
  const [step, setStep] = React.useState(1); // 1=type, 2=slot, 3=payment, 4=confirmed
  const [type, setType] = React.useState('organic');
  const [slot, setSlot] = React.useState('morning');
  const [date, setDate] = React.useState(1); // 0 today, 1 tomorrow
  const [payment, setPayment] = React.useState('included');

  const back = () => step > 1 ? setStep(s => s - 1) : goBack();

  return (
    <div className="screen-scroll page-enter" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ padding: '10px 16px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={back} className="tap" style={{
          width: 40, height: 40, borderRadius: 999, border: 0,
          background: 'var(--card)', boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: 'var(--ink)',
        }}>
          <Icon name="chevronLeft" size={20}/>
        </button>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{t('requestCollection')}</div>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
          {step === 4 ? '✓' : `${step}/3`}
        </div>
      </div>

      {/* Progress */}
      {step < 4 && (
        <div style={{ padding: '10px 16px 16px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= step ? 'var(--leaf)' : 'var(--line)',
                transition: 'background 0.3s',
              }}/>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div style={{ padding: '6px 16px 24px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>
            Quel type de collecte ?
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
            Choisissez le compartiment à vider.
          </div>

          <TypeCard
            active={type === 'organic'} onClick={() => setType('organic')}
            icon="leaf" iconColor="var(--leaf)" iconBg="var(--leaf-soft)"
            title={t('organicCollection')}
            sub="Restes alimentaires, épluchures, déchets verts"
            percent={64}
            price="500 FCFA"
            priceTag={t('included')}
          />
          <div style={{ height: 12 }}/>
          <TypeCard
            active={type === 'nonorg'} onClick={() => setType('nonorg')}
            icon="recycle" iconColor="oklch(0.45 0.14 220)" iconBg="oklch(0.94 0.04 220)"
            title={t('nonOrgCollection')}
            sub="Plastique, papier, verre, métal"
            percent={32}
            price={t('freeLabel')}
            priceTag={t('freeLabel')}
            free
          />

          <button className="btn btn-primary" onClick={() => setStep(2)} style={{ width: '100%', marginTop: 24 }}>
            {t('continue')} <Icon name="arrow" size={18}/>
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: '6px 16px 24px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>
            {t('pickSlot')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
            Choisissez la date et le créneau qui vous arrangent.
          </div>

          {/* Date selector */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
            {[
              { id: 0, label: t('today'), day: '24', weekday: 'Ven' },
              { id: 1, label: t('tomorrow'), day: '25', weekday: 'Sam' },
            ].map(d => (
              <button key={d.id} onClick={() => setDate(d.id)} className="tap" style={{
                flex: 1, padding: '14px 16px', borderRadius: 18,
                border: date === d.id ? '2px solid var(--leaf)' : '2px solid var(--line)',
                background: date === d.id ? 'var(--leaf-soft)' : 'var(--card)',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                color: 'var(--ink)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {d.weekday}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, marginTop: 4, fontFamily: 'Instrument Serif, serif' }}>{d.day}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 600, marginTop: 2 }}>{d.label}</div>
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
            Créneau
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'morning', label: t('morning'), hours: t('slotMorning'), icon: '🌅', avail: 'Disponible' },
              { id: 'afternoon', label: t('afternoon'), hours: t('slotAfternoon'), icon: '☀️', avail: 'Disponible' },
              { id: 'evening', label: t('evening'), hours: t('slotEvening'), icon: '🌙', avail: 'Peu disponible' },
            ].map(s => (
              <button key={s.id} onClick={() => setSlot(s.id)} className="tap" style={{
                padding: '14px 16px', borderRadius: 18, border: 0, cursor: 'pointer',
                background: slot === s.id ? 'var(--ink)' : 'var(--card)',
                color: slot === s.id ? 'var(--bg)' : 'var(--ink)',
                boxShadow: slot === s.id ? 'none' : 'var(--shadow-sm)',
                display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', fontFamily: 'inherit',
              }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{s.hours}</div>
                </div>
                <div style={{
                  fontSize: 10.5, fontWeight: 700,
                  padding: '4px 8px', borderRadius: 999,
                  background: slot === s.id ? 'rgba(255,255,255,0.15)' : 'var(--leaf-soft)',
                  color: slot === s.id ? 'var(--bg)' : 'var(--leaf-deep)',
                }}>{s.avail}</div>
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={() => setStep(3)} style={{ width: '100%', marginTop: 24 }}>
            {t('continue')} <Icon name="arrow" size={18}/>
          </button>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: '6px 16px 24px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>
            Paiement
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
            Votre abonnement Essentiel couvre cette collecte.
          </div>

          {/* Summary */}
          <div className="card" style={{ padding: 16, marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'var(--ink-3)' }}>Collecte</span>
              <span style={{ fontWeight: 600 }}>{type === 'organic' ? t('organicCollection') : t('nonOrgCollection')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'var(--ink-3)' }}>Quand</span>
              <span style={{ fontWeight: 600 }}>{date === 0 ? t('today') : t('tomorrow')} • {t(slot)}</span>
            </div>
            <div style={{ height: 1, background: 'var(--line)', margin: '12px 0' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 700, color: 'var(--leaf)' }}>500 FCFA</span>
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
            Mode de paiement
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <PaymentOpt id="included" active={payment} setActive={setPayment}
              label={t('included')} sub="Abonnement Essentiel • 12/15 collectes restantes"
              icon={<div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--leaf-soft)', color: 'var(--leaf)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={22} stroke={2.5}/></div>}
              tag="Inclus"
            />
            <PaymentOpt id="mtn" active={payment} setActive={setPayment}
              label={t('mtnMomo')} sub="+237 ••• 32 45 38"
              icon={<div style={{ width: 38, height: 38, borderRadius: 10, background: '#ffcc00', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>MTN</div>}
            />
            <PaymentOpt id="orange" active={payment} setActive={setPayment}
              label={t('orangeMoney')} sub="+237 ••• 12 08 77"
              icon={<div style={{ width: 38, height: 38, borderRadius: 10, background: '#ff6600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10 }}>OM</div>}
            />
            <PaymentOpt id="ecopoints" active={payment} setActive={setPayment}
              label={t('useEcopoints')} sub="1 284 pts disponibles • 100 pts = 500 FCFA"
              icon={<div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--amber-soft)', color: 'oklch(0.55 0.15 85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="sparkle" size={22}/></div>}
            />
          </div>

          <button className="btn btn-primary" onClick={() => setStep(4)} style={{ width: '100%', marginTop: 24 }}>
            <Icon name="lock" size={16}/> Confirmer la collecte
          </button>
        </div>
      )}

      {step === 4 && (
        <div style={{
          padding: 24, flex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          minHeight: 560,
        }}>
          <div style={{
            position: 'relative', width: 120, height: 120, marginBottom: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'var(--leaf)', animation: 'pulse-ring 2s ease-out infinite',
            }}/>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'var(--leaf)', animation: 'pulse-ring 2s ease-out 0.5s infinite',
            }}/>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'var(--leaf)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 1,
            }}>
              <Icon name="check" size={48} stroke={3}/>
            </div>
          </div>
          <div className="serif" style={{ fontSize: 34, lineHeight: 1.1, marginBottom: 8 }}>
            {t('requestSent')}
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: 280, marginBottom: 28, lineHeight: 1.4 }}>
            {t('requestSentSub')} • {date === 0 ? t('today') : t('tomorrow')} {t(slot)}
          </div>

          <div className="card" style={{ padding: 16, width: '100%', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 999,
              background: 'var(--leaf-soft)', color: 'var(--leaf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
            }}>ST</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{MOCK.collector.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon name="star" size={12} color="var(--amber)"/> {MOCK.collector.rating} • {MOCK.collector.collections} {t('collections')}
              </div>
            </div>
            <StatusChip type="ok">{t('assigned')}</StatusChip>
          </div>

          <button className="btn btn-primary" onClick={() => nav('track')} style={{ width: '100%' }}>
            {t('trackCollection')} <Icon name="arrow" size={18}/>
          </button>
          <button className="btn btn-ghost" onClick={() => nav('home')} style={{ width: '100%', marginTop: 6 }}>
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
};

const TypeCard = ({ active, onClick, icon, iconColor, iconBg, title, sub, percent, price, priceTag, free }) => (
  <button onClick={onClick} className="tap" style={{
    width: '100%', padding: 16, borderRadius: 22,
    border: active ? '2px solid var(--leaf)' : '2px solid var(--line)',
    background: active ? 'var(--leaf-soft)' : 'var(--card)',
    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
    display: 'flex', gap: 14, alignItems: 'center', color: 'var(--ink)',
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: 16,
      background: iconBg, color: iconColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon name={icon} size={28}/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
        {free && <div style={{ fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 999, background: 'var(--leaf)', color: '#fff' }}>GRATUIT</div>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.3 }}>{sub}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'var(--line)' }}>
          <div style={{ width: `${percent}%`, height: '100%', borderRadius: 99, background: iconColor }}/>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)' }}>{percent}%</div>
      </div>
    </div>
    <div style={{
      width: 22, height: 22, borderRadius: 999, flexShrink: 0,
      border: active ? '7px solid var(--leaf)' : '2px solid var(--line-2)',
      background: active ? '#fff' : 'transparent',
      transition: 'all 0.2s',
    }}/>
  </button>
);

const PaymentOpt = ({ id, active, setActive, label, sub, icon, tag }) => (
  <button onClick={() => setActive(id)} className="tap" style={{
    padding: 14, borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit',
    border: active === id ? '2px solid var(--leaf)' : '2px solid transparent',
    background: 'var(--card)',
    boxShadow: active === id ? 'none' : 'var(--shadow-sm)',
    display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
    color: 'var(--ink)',
  }}>
    {icon}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
        {label}
        {tag && <span style={{ fontSize: 9.5, fontWeight: 800, padding: '2px 7px', borderRadius: 999, background: 'var(--leaf)', color: '#fff' }}>{tag.toUpperCase()}</span>}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>
    </div>
    <div style={{
      width: 20, height: 20, borderRadius: 999, flexShrink: 0,
      border: active === id ? '6px solid var(--leaf)' : '2px solid var(--line-2)',
      background: active === id ? '#fff' : 'transparent',
    }}/>
  </button>
);

Object.assign(window, { RequestScreen });
