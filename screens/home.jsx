// YECO — Home screen

const HomeScreen = ({ t, state, setState, nav }) => {
  const { bin, ecopoints, streak, co2Month } = MOCK;
  const organicState = bin.organic > 80 ? 'danger' : bin.organic > 55 ? 'warn' : 'ok';
  const inorganicState = bin.nonOrganic > 80 ? 'danger' : bin.nonOrganic > 55 ? 'warn' : 'ok';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('greetingMorning') : hour < 18 ? t('greetingAfternoon') : t('greetingEvening');

  const organicColor = organicState === 'danger' ? 'var(--danger)' : organicState === 'warn' ? 'var(--amber)' : 'var(--leaf)';
  const inorgColor = inorganicState === 'danger' ? 'var(--danger)' : inorganicState === 'warn' ? 'var(--amber)' : 'oklch(0.55 0.12 220)';

  return (
    <div className="screen-scroll page-enter">
      {/* Top chrome */}
      <div style={{ padding: '10px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: 'linear-gradient(135deg, var(--leaf), var(--leaf-deep))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 15,
            boxShadow: 'var(--shadow-sm)',
          }}>A</div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>{greeting},</div>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>{MOCK.user.name} 👋</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="tap" onClick={() => nav('notifications')} style={{
            width: 40, height: 40, borderRadius: 999, border: 0,
            background: 'var(--card)', boxShadow: 'var(--shadow-sm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)', cursor: 'pointer', position: 'relative',
          }}>
            <Icon name="bell" size={20}/>
            <span style={{
              position: 'absolute', top: 8, right: 9,
              width: 8, height: 8, borderRadius: 999,
              background: 'var(--clay)', border: '2px solid var(--card)',
            }}/>
          </button>
        </div>
      </div>

      {/* Hero — bin card */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{
          background: 'linear-gradient(160deg, oklch(0.98 0.025 150), oklch(0.95 0.05 145))',
          borderRadius: 28, padding: 20,
          border: '1px solid oklch(0.9 0.04 150)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* subtle background pattern */}
          <svg style={{ position: 'absolute', right: -40, top: -40, opacity: 0.08 }} width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--leaf-deep)" strokeWidth="1" strokeDasharray="2 4"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="var(--leaf-deep)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="30" fill="none" stroke="var(--leaf-deep)" strokeWidth="1" strokeDasharray="1 3"/>
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                {t('myBin')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                YB-08342
                <StatusChip type="live">{t('live')}</StatusChip>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="refresh" size={12}/> {t('syncedAgo')} {bin.lastSync}
              </div>
            </div>
          </div>

          {/* compartments */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <LiquidFill percent={bin.organic} color={organicColor} size={108} label="organic" sub={t('organic')}/>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-2)' }}>
                {bin.organic > 80 ? t('almostFull') : bin.organic > 40 ? t('fillingUp') : t('fine')}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <LiquidFill percent={bin.nonOrganic} color={inorgColor} size={108} label="nonorg" sub={t('nonOrganic')}/>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-2)' }}>
                {bin.nonOrganic > 80 ? t('almostFull') : bin.nonOrganic > 40 ? t('fillingUp') : t('fine')}
              </div>
            </div>
          </div>

          <button className="tap" onClick={() => nav('request')} style={{
            marginTop: 18, width: '100%', height: 52,
            border: 0, borderRadius: 999, cursor: 'pointer',
            background: 'var(--ink)', color: 'var(--bg)',
            fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 4px 14px rgba(20, 40, 30, 0.18)',
          }}>
            <Icon name="truck" size={20} stroke={2.2}/> {t('requestCollection')}
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { id: 'scan', icon: 'camera', label: t('scanWaste'), bg: 'var(--lime-soft)', fg: 'oklch(0.38 0.12 130)' },
            { id: 'guide', icon: 'recycle', label: t('sortGuide'), bg: 'var(--leaf-soft)', fg: 'var(--leaf-deep)' },
            { id: 'report', icon: 'info', label: t('reportIssue'), bg: 'var(--amber-soft)', fg: '#7a4a00' },
          ].map(q => (
            <button key={q.id} className="tap" onClick={() => nav(q.id)} style={{
              flex: 1, border: 0, cursor: 'pointer',
              padding: '14px 10px', borderRadius: 20,
              background: q.bg, color: q.fg, fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22,
              minHeight: 96,
            }}>
              <Icon name={q.icon} size={22}/>
              <span style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.2, textAlign: 'left' }}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Impact strip */}
      <div style={{ padding: '4px 16px 12px' }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{t('todayImpact')}</div>
            <button onClick={() => nav('impact')} style={{
              appearance: 'none', border: 0, background: 'transparent',
              color: 'var(--leaf)', fontWeight: 700, fontSize: 12, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 2,
            }}>
              {t('seeAll')} <Icon name="chevron" size={14}/>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <ImpactStat
              value={co2Month}
              unit={t('co2Avoided')}
              icon="leaf"
              tint="var(--leaf)"
              bg="var(--leaf-soft)"
              sub={'+' + '1.2 ' + t('kgShort') + ' • 7j'}
            />
            <ImpactStat
              value={ecopoints.toLocaleString('fr-FR')}
              unit={t('ecopoints')}
              icon="sparkle"
              tint="oklch(0.55 0.15 85)"
              bg="var(--amber-soft)"
              sub={'+340 ' + t('thisMonth')}
              isPoint
            />
          </div>
          {/* streak progress */}
          <div style={{ marginTop: 16, padding: 12, background: 'var(--bg)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'var(--clay-soft)', color: 'var(--clay)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="flame" size={22}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{streak} {t('streakDays')}</div>
              <div style={{ marginTop: 4, height: 6, borderRadius: 99, background: 'var(--line)' }}>
                <div style={{ width: `${(streak / 30) * 100}%`, height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, var(--amber), var(--clay))' }}/>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>{streak}/30</div>
          </div>
        </div>
      </div>

      {/* Next pickup */}
      <div style={{ padding: '4px 16px 12px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{t('nextCollection')}</div>
            <StatusChip type="ok">{t('assigned')}</StatusChip>
          </div>
          <div className="divider"/>
          <button className="tap" onClick={() => nav('track')} style={{
            padding: 18, display: 'flex', alignItems: 'center', gap: 14, width: '100%',
            background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit', color: 'var(--ink)',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'var(--leaf-soft)', color: 'var(--leaf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="truck" size={24}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{t('organicCollection')}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="clock" size={12}/>
                {t('tomorrow')} • {t('morning')} ({t('slotMorning')})
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="user" size={12}/> {MOCK.collector.name} ★ {MOCK.collector.rating}
              </div>
            </div>
            <Icon name="chevron" size={18} color="var(--ink-3)"/>
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ padding: '4px 16px 24px' }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{t('neighborhoodRank')}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>{MOCK.user.neighborhood}</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 12 }}>
            {t('yourRank')}: <span style={{ color: 'var(--leaf)', fontWeight: 700 }}>#{MOCK.rank} / {MOCK.totalHomes}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {MOCK.leaderboard.map(row => (
              <div key={row.rank} style={{
                padding: '10px 12px', borderRadius: 14,
                background: row.you ? 'var(--leaf-soft)' : 'transparent',
                border: row.you ? '1px solid oklch(0.85 0.08 150)' : '1px solid transparent',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 999,
                  background: row.rank <= 3 ? 'var(--ink)' : 'var(--bg-2)',
                  color: row.rank <= 3 ? 'var(--bg)' : 'var(--ink-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12,
                }}>{row.rank}</div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: row.you ? 700 : 500 }}>
                  {row.name}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: row.you ? 'var(--leaf-deep)' : 'var(--ink-2)' }}>
                  {row.pts.toLocaleString('fr-FR')} <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-3)' }}>pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 8 }}/>
    </div>
  );
};

const ImpactStat = ({ value, unit, icon, tint, bg, sub, isPoint }) => (
  <div style={{
    flex: 1, padding: 14, borderRadius: 18,
    background: bg,
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ color: tint }}><Icon name={icon} size={20}/></div>
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: tint, lineHeight: 1, fontFamily: isPoint ? 'Plus Jakarta Sans' : 'Instrument Serif, serif' }} className={!isPoint ? '' : ''}>
      {value}
    </div>
    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.3 }}>
      {unit}
    </div>
    <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 600, marginTop: 4 }}>
      {sub}
    </div>
  </div>
);

Object.assign(window, { HomeScreen });
