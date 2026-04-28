// YECO — App shell and entry

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "fr",
  "theme": "light",
  "accent": "leaf",
  "binState": "normal",
  "startScreen": "home"
}/*EDITMODE-END*/;

const ACCENTS = {
  leaf:   { leaf: 'oklch(0.52 0.12 155)', deep: 'oklch(0.38 0.10 155)', soft: 'oklch(0.94 0.04 150)' },
  forest: { leaf: 'oklch(0.42 0.11 160)', deep: 'oklch(0.30 0.09 160)', soft: 'oklch(0.92 0.035 160)' },
  ocean:  { leaf: 'oklch(0.55 0.12 210)', deep: 'oklch(0.40 0.10 215)', soft: 'oklch(0.94 0.04 215)' },
  clay:   { leaf: 'oklch(0.60 0.14 45)',  deep: 'oklch(0.42 0.12 40)',  soft: 'oklch(0.94 0.04 45)' },
};

const BIN_STATES = {
  empty:  { organic: 8, nonOrganic: 12 },
  normal: { organic: 64, nonOrganic: 32 },
  full:   { organic: 92, nonOrganic: 84 },
};

function YecoApp() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState({ screen: tweaks.startScreen || 'home', hist: [] });
  const [tab, setTab] = React.useState(tweaks.startScreen === 'impact' ? 'impact' : tweaks.startScreen === 'wallet' ? 'wallet' : tweaks.startScreen === 'profile' ? 'profile' : 'home');

  const t = makeT(tweaks.language);

  // Apply theme + accent via CSS vars
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    const a = ACCENTS[tweaks.accent] || ACCENTS.leaf;
    document.documentElement.style.setProperty('--leaf', a.leaf);
    document.documentElement.style.setProperty('--leaf-deep', a.deep);
    document.documentElement.style.setProperty('--leaf-soft', a.soft);
  }, [tweaks.theme, tweaks.accent]);

  // Swap bin data per state
  React.useEffect(() => {
    const s = BIN_STATES[tweaks.binState] || BIN_STATES.normal;
    MOCK.bin.organic = s.organic;
    MOCK.bin.nonOrganic = s.nonOrganic;
  }, [tweaks.binState]);

  const nav = (screen) => {
    if (['home', 'impact', 'wallet', 'profile', 'collect'].includes(screen)) {
      setTab(screen);
      setRoute({ screen, hist: [] });
    } else {
      setRoute(r => ({ screen, hist: [...r.hist, r.screen] }));
    }
  };
  const goBack = () => setRoute(r => {
    if (r.hist.length === 0) return { screen: tab, hist: [] };
    const hist = [...r.hist];
    const screen = hist.pop();
    return { screen, hist };
  });

  const onTab = (id) => {
    setTab(id);
    if (id === 'collect') setRoute({ screen: 'request', hist: [] });
    else setRoute({ screen: id, hist: [] });
  };

  let view;
  switch (route.screen) {
    case 'home': view = <HomeScreen t={t} nav={nav}/>; break;
    case 'request': view = <RequestScreen t={t} nav={nav} goBack={goBack}/>; break;
    case 'track': view = <TrackScreen t={t} nav={nav} goBack={goBack}/>; break;
    case 'impact': view = <ImpactScreen t={t}/>; break;
    case 'wallet': view = <WalletScreen t={t}/>; break;
    case 'profile': view = <ProfileScreen t={t}/>; break;
    case 'notifications': view = <NotificationsScreen t={t} goBack={goBack}/>; break;
    case 'onboarding': view = <OnboardingScreen t={t} onDone={() => nav('home')}/>; break;
    default: view = <HomeScreen t={t} nav={nav}/>;
  }

  const hideTabBar = ['request', 'track', 'onboarding', 'notifications'].includes(route.screen);

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32, background: tweaks.theme === 'dark' ? '#0e1410' : '#eef2ed',
      gap: 48,
    }}>
      <AndroidDevice width={412} height={892} dark={tweaks.theme === 'dark'}>
        <div className="screen">
          {view}
          {!hideTabBar && <TabBar active={tab} setActive={onTab} t={t}/>}
        </div>
      </AndroidDevice>

      <TweaksPanel title="YECO Tweaks">
        <TweakSection title="Language">
          <TweakRadio
            value={tweaks.language}
            onChange={v => setTweaks({ language: v })}
            options={[{ value: 'fr', label: 'Français' }, { value: 'en', label: 'English' }]}
          />
        </TweakSection>

        <TweakSection title="Theme">
          <TweakRadio
            value={tweaks.theme}
            onChange={v => setTweaks({ theme: v })}
            options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
          />
        </TweakSection>

        <TweakSection title="Accent">
          <TweakRadio
            value={tweaks.accent}
            onChange={v => setTweaks({ accent: v })}
            options={[
              { value: 'leaf',   label: 'Leaf green' },
              { value: 'forest', label: 'Deep forest' },
              { value: 'ocean',  label: 'Ocean' },
              { value: 'clay',   label: 'Clay' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Bin fill state">
          <TweakRadio
            value={tweaks.binState}
            onChange={v => setTweaks({ binState: v })}
            options={[
              { value: 'empty',  label: 'Empty (just emptied)' },
              { value: 'normal', label: 'Normal (64 / 32%)' },
              { value: 'full',   label: 'Almost full (92 / 84%)' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Jump to screen">
          <TweakRadio
            value={route.screen}
            onChange={v => nav(v)}
            options={[
              { value: 'home',          label: 'Home dashboard' },
              { value: 'request',       label: 'Request pickup' },
              { value: 'track',         label: 'Track collection' },
              { value: 'impact',        label: 'CO₂ impact' },
              { value: 'wallet',        label: 'Wallet & plan' },
              { value: 'profile',       label: 'Profile' },
              { value: 'notifications', label: 'Notifications' },
              { value: 'onboarding',    label: 'Onboarding + OTP' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<YecoApp/>);
