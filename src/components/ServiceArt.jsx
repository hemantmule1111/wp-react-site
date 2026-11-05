// Custom SVG illustration for each service. One scene per service, themed with a gradient palette.
const palettes = [
  ['#ff8c00', '#d946ef'], // dark orange -> fuchsia
  ['#d946ef', '#fb923c'], // fuchsia -> orange
  ['#ff8c00', '#ff8c00'], // sky -> dark orange
  ['#10b981', '#ff8c00'], // emerald -> sky
  ['#f97316', '#e11d48'], // orange -> rose
];

const kinds = {
  'website-development': 'website',
  'web-application-development': 'webapp',
  'mobile-app-development': 'mobile',
  'ecommerce-development': 'ecommerce',
  'custom-software-development': 'custom',
  'erp-software-development': 'erp',
  'crm-software-development': 'crm',
  'ui-ux-design-development': 'uiux',
  'api-development-integration': 'api',
  'ai-machine-learning': 'ai',
  'cloud-application-development': 'cloud',
  'desktop-application-development': 'desktop',
  'software-testing-qa': 'qa',
  'devops-ci-cd': 'devops',
  'cybersecurity-software-development': 'security',
  'blockchain-development': 'blockchain',
  'iot-software-development': 'iot',
  'data-analytics-bi-development': 'analytics',
  'payment-gateway-integration': 'payments',
  'maintenance-support': 'support',
};

const spin = { transformBox: 'fill-box', transformOrigin: 'center', animationDuration: '14s' };
const W = '#fff';
const line = (x, y, w, c = '#e2e8f0', h = 9) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />;

function Win({ x, y, w, h, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="16" fill={W} filter="url(#sh)" />
      <circle cx={x + 18} cy={y + 17} r="4.5" fill="#f87171" />
      <circle cx={x + 33} cy={y + 17} r="4.5" fill="#fbbf24" />
      <circle cx={x + 48} cy={y + 17} r="4.5" fill="#34d399" />
      {children}
    </g>
  );
}

function Gear({ cx, cy, r, grad }) {
  return (
    <g className="animate-spin" style={spin}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={W} strokeWidth={r * 0.45} strokeDasharray={`${r * 0.3} ${r * 0.22}`} />
      <circle cx={cx} cy={cy} r={r * 0.78} fill={W} />
      <circle cx={cx} cy={cy} r={r * 0.34} fill={grad} />
    </g>
  );
}

function Scene({ kind, g }) {
  const G = `url(#${g})`;
  switch (kind) {
    case 'website':
      return (
        <g>
          <Win x={70} y={55} w={340} h={250}>
            <rect x={88} y={92} width={304} height={78} rx="10" fill={G} />
            <text x={106} y={128} fill={W} fontSize="20" fontWeight="800">Your Website</text>
            {line(106, 142, 120, 'rgba(255,255,255,.7)')}
            {line(88, 188, 190)}
            {line(88, 206, 150)}
            <rect x={88} y={232} width={92} height={30} rx="15" fill={G} />
            <rect x={296} y={186} width={96} height={80} rx="10" fill="#f1f5f9" />
            <rect x={306} y={196} width={76} height={36} rx="6" fill={G} opacity=".5" />
            {line(306, 242, 60)}
          </Win>
          <g className="animate-float"><circle cx={410} cy={78} r={30} fill={W} filter="url(#sh)" /><text x={410} y={85} textAnchor="middle" fontSize="18" fontWeight="800" fill="#ff8c00">&lt;/&gt;</text></g>
        </g>
      );
    case 'webapp':
      return (
        <g>
          <Win x={45} y={50} w={390} h={255}>
            <rect x={58} y={84} width={62} height={208} rx="10" fill="#f1f5f9" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={66} y={98 + i * 30} width={46} height={12} rx="6" fill={i === 0 ? G : '#cbd5e1'} />)}
            {[0, 1, 2].map((i) => (
              <g key={i}><rect x={134 + i * 98} y={90} width={88} height={46} rx="10" fill="#f8fafc" stroke="#e2e8f0" />
                {line(144 + i * 98, 102, 40, '#cbd5e1', 7)}<rect x={144 + i * 98} y={116} width={52} height={10} rx="5" fill={G} /></g>
            ))}
            {[40, 70, 50, 95, 65, 110, 85].map((h, i) => <rect key={i} x={140 + i * 40} y={282 - h} width={26} height={h} rx="6" fill={G} opacity={0.45 + i * 0.08} />)}
          </Win>
          <g className="animate-float"><circle cx={425} cy={70} r={26} fill={W} filter="url(#sh)" /><text x={425} y={78} textAnchor="middle" fontSize="22">📈</text></g>
        </g>
      );
    case 'mobile':
      return (
        <g>
          <g transform="rotate(12 350 190)"><rect x={290} y={70} width={120} height={240} rx="24" fill={W} opacity=".85" filter="url(#sh)" />
            <rect x={300} y={90} width={100} height={70} rx="14" fill={G} opacity=".7" />{line(300, 176, 80)}{line(300, 194, 60)}</g>
          <g className="animate-float">
            <rect x={140} y={35} width={140} height={290} rx="28" fill={W} filter="url(#sh)" />
            <rect x={152} y={60} width={116} height={240} rx="18" fill="#f8fafc" />
            <rect x={152} y={60} width={116} height={86} rx="18" fill={G} />
            <text x={166} y={100} fill={W} fontSize="15" fontWeight="800">Hello 👋</text>
            {line(166, 112, 60, 'rgba(255,255,255,.7)')}
            {[0, 1, 2].map((i) => <g key={i}><rect x={160} y={160 + i * 40} width={100} height={32} rx="10" fill={W} stroke="#e2e8f0" /><circle cx={176} cy={176 + i * 40} r="8" fill={G} />{line(192, 172 + i * 40, 56, '#cbd5e1', 8)}</g>)}
            <rect x={188} y={44} width={44} height={6} rx="3" fill="#e2e8f0" />
          </g>
        </g>
      );
    case 'ecommerce':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} className={i === 1 ? 'animate-float' : ''}>
              <rect x={50 + i * 130} y={i === 1 ? 70 : 95} width={118} height={170} rx="16" fill={W} filter="url(#sh)" />
              <rect x={60 + i * 130} y={(i === 1 ? 70 : 95) + 10} width={98} height={78} rx="10" fill={G} opacity={0.5 + i * 0.2} />
              <text x={109 + i * 130} y={(i === 1 ? 70 : 95) + 60} textAnchor="middle" fontSize="34">{['👟', '🎧', '⌚'][i]}</text>
              {line(60 + i * 130, (i === 1 ? 70 : 95) + 104, 70, '#cbd5e1')}
              <rect x={60 + i * 130} y={(i === 1 ? 70 : 95) + 126} width={52} height={24} rx="12" fill={G} />
            </g>
          ))}
          <circle cx={405} cy={285} r={36} fill={W} filter="url(#sh)" /><text x={405} y={297} textAnchor="middle" fontSize="34">🛒</text>
        </g>
      );
    case 'custom':
      return (
        <g>
          <Gear cx={190} cy={170} r={70} grad={G} />
          <Gear cx={320} cy={110} r={42} grad={G} />
          <Gear cx={330} cy={250} r={34} grad={G} />
          <g className="animate-float"><rect x={50} y={50} width={96} height={46} rx="12" fill={W} filter="url(#sh)" /><text x={98} y={80} textAnchor="middle" fontSize="18" fontWeight="800" fill="#ff8c00">{'{ code }'}</text></g>
        </g>
      );
    case 'erp': {
      const mods = ['Finance', 'HR', 'Stock', 'Sales', 'Buying', 'Reports'];
      const pts = mods.map((_, i) => [240 + 160 * Math.cos((i * 60 - 90) * Math.PI / 180) * 0.95, 180 + 120 * Math.sin((i * 60 - 90) * Math.PI / 180)]);
      return (
        <g>
          {pts.map(([x, y], i) => <line key={i} x1={240} y1={180} x2={x} y2={y} stroke={W} strokeWidth="3" strokeDasharray="6 6" opacity=".8" />)}
          {pts.map(([x, y], i) => (
            <g key={mods[i]}><rect x={x - 38} y={y - 22} width={76} height={44} rx="12" fill={W} filter="url(#sh)" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{mods[i]}</text></g>
          ))}
          <g className="animate-float"><circle cx={240} cy={180} r={46} fill={W} filter="url(#sh)" /><text x={240} y={194} textAnchor="middle" fontSize="40">🏢</text></g>
        </g>
      );
    }
    case 'crm':
      return (
        <g>
          {['Lead', 'Talk', 'Won'].map((t, c) => (
            <g key={t}>
              <rect x={50 + c * 135} y={55} width={120} height={250} rx="16" fill={W} opacity=".95" filter="url(#sh)" />
              <rect x={60 + c * 135} y={67} width={100} height={26} rx="13" fill={G} opacity={0.6 + c * 0.2} />
              <text x={110 + c * 135} y={85} textAnchor="middle" fontSize="12" fontWeight="800" fill={W}>{t}</text>
              {Array.from({ length: 3 - (c === 2 ? 1 : 0) }).map((_, r) => (
                <g key={r}><rect x={60 + c * 135} y={106 + r * 62} width={100} height={52} rx="10" fill="#f8fafc" stroke="#e2e8f0" />
                  <circle cx={78 + c * 135} cy={132 + r * 62} r="11" fill={G} />{line(96 + c * 135, 122 + r * 62, 52, '#cbd5e1', 8)}{line(96 + c * 135, 138 + r * 62, 34, '#e2e8f0', 7)}</g>
              ))}
            </g>
          ))}
          <g className="animate-float"><circle cx={445} cy={60} r={26} fill={W} filter="url(#sh)" /><text x={445} y={69} textAnchor="middle" fontSize="24">🤝</text></g>
        </g>
      );
    case 'uiux':
      return (
        <g>
          <rect x={55} y={55} width={250} height={250} rx="16" fill={W} filter="url(#sh)" />
          <rect x={75} y={78} width={210} height={70} rx="10" fill="none" stroke="#ffb84d" strokeWidth="2" strokeDasharray="6 5" />
          <rect x={75} y={162} width={100} height={60} rx="10" fill={G} opacity=".75" />
          <rect x={185} y={162} width={100} height={60} rx="10" fill="none" stroke="#ffb84d" strokeWidth="2" strokeDasharray="6 5" />
          {line(75, 240, 150)}{line(75, 258, 110)}
          <rect x={75} y={276} width={70} height={18} rx="9" fill={G} />
          {['#ff8c00', '#d946ef', '#fb923c', '#ffa733'].map((c, i) => <circle key={c} cx={352} cy={90 + i * 56} r={22} fill={c} stroke={W} strokeWidth="5" filter="url(#sh)" />)}
          <path d="M392 230 l0 52 l14 -12 l11 24 l9 -4 l-11 -23 l19 -2 z" fill="#1e1b4b" stroke={W} strokeWidth="3" className="animate-float" />
        </g>
      );
    case 'api':
      return (
        <g>
          <rect x={45} y={115} width={120} height={130} rx="16" fill={W} filter="url(#sh)" />
          <text x={105} y={180} textAnchor="middle" fontSize="40" fontWeight="800" fill="#ff8c00">{'{ }'}</text>
          {line(65, 205, 80)}{line(65, 221, 55)}
          <rect x={315} y={115} width={120} height={130} rx="16" fill={W} filter="url(#sh)" />
          <text x={375} y={180} textAnchor="middle" fontSize="36">🗄️</text>
          {line(335, 205, 80)}{line(335, 221, 55)}
          <path d="M170 150 H310 M310 150 l-12 -9 M310 150 l-12 9" stroke={W} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="1 0" />
          <path d="M310 212 H170 M170 212 l12 -9 M170 212 l12 9" stroke={W} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".8" />
          <g className="animate-float"><circle cx={240} cy={181} r={36} fill={W} filter="url(#sh)" /><text x={240} y={188} textAnchor="middle" fontSize="19" fontWeight="800" fill="#d946ef">API</text></g>
        </g>
      );
    case 'ai': {
      const layers = [[110, [120, 180, 240]], [200, [95, 150, 210, 265]], [290, [120, 180, 240]], [370, [180]]];
      return (
        <g>
          {layers.slice(0, -1).map(([x, ys], li) => ys.flatMap((y1) => layers[li + 1][1].map((y2) => <line key={`${li}-${y1}-${y2}`} x1={x} y1={y1} x2={layers[li + 1][0]} y2={y2} stroke={W} strokeWidth="1.6" opacity=".55" />)))}
          {layers.map(([x, ys]) => ys.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="15" fill={W} filter="url(#sh)"><title>node</title></circle>))}
          {layers.map(([x, ys]) => ys.map((y) => <circle key={`d${x}-${y}`} cx={x} cy={y} r="6" fill={G} />))}
          <g className="animate-float"><rect x={330} y={42} width={112} height={50} rx="16" fill={W} filter="url(#sh)" /><text x={386} y={73} textAnchor="middle" fontSize="16" fontWeight="800" fill="#ff8c00">✨ AI ready</text></g>
        </g>
      );
    }
    case 'cloud':
      return (
        <g>
          <g className="animate-float" filter="url(#sh)">
            <circle cx={190} cy={140} r={46} fill={W} /><circle cx={250} cy={118} r={58} fill={W} /><circle cx={318} cy={142} r={44} fill={W} />
            <rect x={160} y={140} width={200} height={50} rx="25" fill={W} />
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i}><rect x={110 + i * 100} y={250} width={90} height={46} rx="10" fill={W} filter="url(#sh)" />
              <circle cx={126 + i * 100} cy={273} r="5" fill="#34d399" />{line(138 + i * 100, 268, 40, '#cbd5e1', 8)}
              <path d={`M${155 + i * 100} 245 V205`} stroke={W} strokeWidth="4" strokeDasharray="5 6" strokeLinecap="round" /></g>
          ))}
        </g>
      );
    case 'desktop':
      return (
        <g>
          <rect x={80} y={50} width={320} height={215} rx="18" fill={W} filter="url(#sh)" />
          <rect x={92} y={62} width={296} height={191} rx="10" fill={G} opacity=".9" />
          <rect x={112} y={84} width={150} height={110} rx="10" fill={W} />
          <rect x={112} y={84} width={150} height={22} rx="10" fill="#f1f5f9" />
          {line(124, 120, 100)}{line(124, 138, 120)}{line(124, 156, 80)}
          <rect x={278} y={110} width={92} height={110} rx="10" fill="rgba(255,255,255,.35)" />
          <rect x={212} y={265} width={56} height={36} fill={W} opacity=".9" /><rect x={160} y={300} width={160} height={14} rx="7" fill={W} />
          <g className="animate-float"><circle cx={400} cy={70} r={26} fill={W} filter="url(#sh)" /><text x={400} y={79} textAnchor="middle" fontSize="24">🪟</text></g>
        </g>
      );
    case 'qa':
      return (
        <g>
          <rect x={65} y={50} width={250} height={255} rx="18" fill={W} filter="url(#sh)" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}><circle cx={96} cy={96 + i * 54} r="15" fill={i === 2 ? '#f87171' : '#22c55e'} />
              <text x={96} y={102 + i * 54} textAnchor="middle" fill={W} fontSize="16" fontWeight="800">{i === 2 ? '✕' : '✓'}</text>
              {line(122, 88 + i * 54, 150 - i * 12, '#cbd5e1', 10)}{line(122, 106 + i * 54, 90, '#e2e8f0', 7)}</g>
          ))}
          <circle cx={365} cy={225} r={46} fill="rgba(255,255,255,.35)" stroke={W} strokeWidth="12" />
          <path d="M398 258 L435 295" stroke={W} strokeWidth="14" strokeLinecap="round" />
          <g className="animate-float"><text x={365} y={238} textAnchor="middle" fontSize="40">🐞</text></g>
        </g>
      );
    case 'devops':
      return (
        <g>
          <path d="M120 180 C120 115 200 115 240 180 C280 245 360 245 360 180 C360 115 280 115 240 180 C200 245 120 245 120 180 Z" fill="none" stroke={W} strokeWidth="16" strokeLinejoin="round" opacity=".9" />
          {[['Build', 120], ['Test', 240], ['Deploy', 360]].map(([t, x]) => (
            <g key={t}><circle cx={x} cy={180} r={26} fill={W} filter="url(#sh)" /><circle cx={x} cy={180} r={10} fill={G} />
              <text x={x} y={238 + 36} textAnchor="middle" fontSize="14" fontWeight="800" fill={W}>{t}</text></g>
          ))}
          <g className="animate-float"><rect x={190} y={52} width={100} height={36} rx="18" fill={W} filter="url(#sh)" /><text x={240} y={76} textAnchor="middle" fontSize="15" fontWeight="800" fill="#ff8c00">CI / CD ♾️</text></g>
        </g>
      );
    case 'security':
      return (
        <g>
          <path d="M240 45 L365 92 V190 C365 262 305 304 240 326 C175 304 115 262 115 190 V92 Z" fill={W} filter="url(#sh)" />
          <path d="M240 72 L342 108 V190 C342 248 292 282 240 300 C188 282 138 248 138 190 V108 Z" fill={G} opacity=".9" />
          <rect x={206} y={168} width={68} height={56} rx="10" fill={W} />
          <path d="M219 168 V150 a21 21 0 0 1 42 0 V168" stroke={W} strokeWidth="10" fill="none" />
          <circle cx={240} cy={192} r="7" fill="#ff8c00" /><rect x={237} y={194} width={6} height={16} rx="3" fill="#ff8c00" />
          <g className="animate-float"><circle cx={395} cy={300} r={26} fill={W} filter="url(#sh)" /><text x={395} y={309} textAnchor="middle" fontSize="24">✅</text></g>
        </g>
      );
    case 'blockchain':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className={i % 2 ? 'animate-float' : ''}>
              {i < 3 && <rect x={108 + i * 98} y={i % 2 ? 148 : 168} width={52} height={14} rx="7" fill={W} opacity=".8" transform={`rotate(${i % 2 ? 30 : -30} ${134 + i * 98} 165)`} />}
              <rect x={40 + i * 98} y={i % 2 ? 175 : 95} width={92} height={78} rx="14" fill={W} filter="url(#sh)" />
              <rect x={50 + i * 98} y={(i % 2 ? 175 : 95) + 10} width={72} height={18} rx="9" fill={G} />
              {line(50 + i * 98, (i % 2 ? 175 : 95) + 38, 72, '#cbd5e1', 8)}{line(50 + i * 98, (i % 2 ? 175 : 95) + 54, 46, '#e2e8f0', 8)}
            </g>
          ))}
          <text x={240} y={320} textAnchor="middle" fontSize="15" fontWeight="800" fill={W}>⛓️ Secure · Transparent · Decentralized</text>
        </g>
      );
    case 'iot': {
      const dev = [[95, 90, '🌡️'], [385, 90, '💡'], [95, 270, '📷'], [385, 270, '🔒']];
      return (
        <g>
          {dev.map(([x, y], i) => <line key={i} x1={240} y1={180} x2={x} y2={y} stroke={W} strokeWidth="3" strokeDasharray="6 6" />)}
          {[60, 90, 120].map((r) => <circle key={r} cx={240} cy={180} r={r} fill="none" stroke={W} strokeWidth="2" opacity={0.5 - r / 400} />)}
          {dev.map(([x, y, e]) => <g key={e}><circle cx={x} cy={y} r="32" fill={W} filter="url(#sh)" /><text x={x} y={y + 11} textAnchor="middle" fontSize="30">{e}</text></g>)}
          <g className="animate-float"><circle cx={240} cy={180} r={42} fill={W} filter="url(#sh)" /><text x={240} y={194} textAnchor="middle" fontSize="38">📡</text></g>
        </g>
      );
    }
    case 'analytics':
      return (
        <g>
          <rect x={40} y={50} width={260} height={160} rx="16" fill={W} filter="url(#sh)" />
          <path d="M58 180 L100 140 L140 158 L190 100 L240 122 L282 76 V196 H58 Z" fill={G} opacity=".25" />
          <path d="M58 180 L100 140 L140 158 L190 100 L240 122 L282 76" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={320} y={50} width={125} height={160} rx="16" fill={W} filter="url(#sh)" />
          <circle cx={382} cy={118} r="38" fill="none" stroke="#e2e8f0" strokeWidth="16" />
          <circle cx={382} cy={118} r="38" fill="none" stroke={G} strokeWidth="16" strokeDasharray="150 240" strokeLinecap="round" transform="rotate(-90 382 118)" />
          <rect x={40} y={226} width={405} height={86} rx="16" fill={W} filter="url(#sh)" />
          {[34, 56, 42, 68, 50, 74, 60, 80, 58, 70].map((h, i) => <rect key={i} x={62 + i * 38} y={300 - h} width={22} height={h} rx="6" fill={G} opacity={0.4 + i * 0.06} />)}
          <g className="animate-float"><circle cx={445} cy={50} r={22} fill={W} filter="url(#sh)" /><text x={445} y={58} textAnchor="middle" fontSize="20">📊</text></g>
        </g>
      );
    case 'payments':
      return (
        <g>
          <g transform="rotate(8 240 180)"><rect x={90} y={100} width={250} height={150} rx="18" fill={W} opacity=".85" /></g>
          <g transform="rotate(-8 240 180)" className="animate-float">
            <rect x={70} y={85} width={260} height={160} rx="18" fill="#1e1b4b" filter="url(#sh)" />
            <rect x={92} y={112} width={44} height={32} rx="7" fill="#fbbf24" />
            <text x={92} y={190} fill={W} fontSize="20" letterSpacing="3" fontWeight="700">•••• •••• 4242</text>
            <text x={92} y={222} fill="#c4b5fd" fontSize="12">WPART  ·  12/29</text>
            <circle cx={290} cy={218} r="14" fill="#f43f5e" opacity=".9" /><circle cx={308} cy={218} r="14" fill="#fb923c" opacity=".9" />
          </g>
          <circle cx={385} cy={245} r={44} fill={W} filter="url(#sh)" /><text x={385} y={262} textAnchor="middle" fontSize="46" fontWeight="800" fill="#d946ef">$</text>
          <circle cx={395} cy={80} r={26} fill="#22c55e" filter="url(#sh)" /><text x={395} y={90} textAnchor="middle" fontSize="28" fill={W} fontWeight="800">✓</text>
        </g>
      );
    case 'support':
    default:
      return (
        <g>
          <rect x={55} y={60} width={255} height={235} rx="18" fill={W} filter="url(#sh)" />
          {[['#22c55e', 'Fixed'], ['#f59e0b', 'In progress'], ['#22c55e', 'Updated'], ['#ffa733', 'Monitoring']].map(([c, t], i) => (
            <g key={t}><circle cx={84} cy={100 + i * 52} r="9" fill={c} />{line(104, 91 + i * 52, 120, '#cbd5e1', 10)}
              <rect x={104} y={106 + i * 52} width={62} height={16} rx="8" fill={`${c}33`} /><text x={135} y={118 + i * 52} textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">{t}</text></g>
          ))}
          <Gear cx={375} cy={235} r={44} grad={G} />
          <g className="animate-float"><circle cx={375} cy={105} r={42} fill={W} filter="url(#sh)" /><text x={375} y={120} textAnchor="middle" fontSize="40">🎧</text></g>
        </g>
      );
  }
}

export default function ServiceArt({ slug, index = 0, className = '' }) {
  const kind = kinds[slug] ?? 'support';
  const [c1, c2] = palettes[index % palettes.length];
  const g = `g-${slug}-${index % palettes.length}`;
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-label={`${slug.replace(/-/g, ' ')} illustration`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} />
        </linearGradient>
        <filter id="sh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#1e1b4b" floodOpacity=".22" />
        </filter>
      </defs>
      <rect width="480" height="360" fill={`url(#${g})`} />
      <circle cx="430" cy="40" r="110" fill="#fff" opacity=".12" />
      <circle cx="40" cy="330" r="90" fill="#fff" opacity=".12" />
      <circle cx="250" cy="180" r="170" fill="#fff" opacity=".05" />
      <Scene kind={kind} g={g} />
    </svg>
  );
}
