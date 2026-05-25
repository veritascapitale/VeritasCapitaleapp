import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const C = {
  bg:           "#000000",
  card:         "#111111",
  cardBorder:   "rgba(255,255,255,0.09)",
  oliveBar:     "#161d08",
  oliveAccent:  "#4a5c1a",
  oliveFill:    "#1e2709",
  oliveBorder:  "#3d4f15",
  white:        "#ffffff",
  white2:       "#e2e8f0",
  grey:         "#64748b",
  greyLight:    "#94a3b8",
  purple:       "#a855f7",
  blue:         "#3b82f6",
  red:          "#ef4444",
  blueMuted:    "#93c5fd",
  purpleMuted:  "#d8b4fe",
  redMuted:     "#fca5a5",
};

// ─── SVG CHART COMPONENTS ────────────────────────────────────────
function HomeChart() {
  return (
    <svg viewBox="0 0 344 115" style={{ width: "100%", overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M0,95 C22,92 40,90 62,85 C82,80 95,77 116,70 C137,63 148,59 168,51 C188,43 200,38 220,29 C240,20 256,13 278,8 C300,4 320,2 344,0" fill="url(#gH)" />
      <path d="M0,95 C22,92 40,90 62,85 C82,80 95,77 116,70 C137,63 148,59 168,51 C188,43 200,38 220,29 C240,20 256,13 278,8 C300,4 320,2 344,0"
        stroke="#ffffff" strokeWidth="1.5" fill="none" filter="url(#glow)" />
    </svg>
  );
}

function CompareChart() {
  return (
    <svg viewBox="0 0 340 88" style={{ width: "100%", overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M0,76 C50,70 100,58 152,42 C204,26 262,12 340,3" fill="url(#gP)" />
      <path d="M0,76 C50,70 100,58 152,42 C204,26 262,12 340,3"
        stroke="#ffffff" strokeWidth="1.5" fill="none" filter="url(#glow2)" />
      <path d="M0,76 C80,70 162,60 242,48 C292,41 316,36 340,30"
        stroke="#475569" strokeWidth="1" fill="none" strokeDasharray="4 3" />
    </svg>
  );
}

function StrategyChart() {
  return (
    <svg viewBox="0 0 340 70" style={{ width: "100%", overflow: "visible", display: "block", marginBottom: 14 }}>
      <defs>
        <filter id="glow3">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M0,64 C60,56 122,38 182,20 C242,4 292,1 340,0" stroke="#ffffff" strokeWidth="1.5" fill="none" filter="url(#glow3)" />
      <path d="M0,64 C60,60 122,52 182,40 C242,28 292,20 340,16" stroke="#93c5fd" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M0,64 C60,62 122,58 182,50 C242,42 292,36 340,32" stroke="#d8b4fe" strokeWidth="1" fill="none" opacity="0.7" />
    </svg>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────
function ProgressBar({ pct = 68.8 }) {
  return (
    <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, margin: "12px 0 4px", position: "relative" }}>
      <div style={{
        height: 2, width: `${pct}%`,
        background: `linear-gradient(90deg, #2d3a10, ${C.oliveAccent})`,
        borderRadius: 2, position: "relative"
      }}>
        <div style={{
          position: "absolute", right: -1, top: -4,
          width: 8, height: 8, borderRadius: "50%",
          background: C.white, boxShadow: "0 0 6px rgba(255,255,255,0.6)"
        }} />
      </div>
    </div>
  );
}

// ─── CARDS ───────────────────────────────────────────────────────
function Card({ children, olive = false, style = {} }) {
  return (
    <div style={{
      background: olive ? C.oliveFill : C.card,
      border: `${olive ? "1px" : "0.5px"} solid ${olive ? C.oliveBorder : C.cardBorder}`,
      borderRadius: 16, padding: "16px 18px", marginBottom: 10, ...style
    }}>
      {children}
    </div>
  );
}

// ─── TX ICON ─────────────────────────────────────────────────────
function TxIcon({ type }) {
  const styles = {
    v: { bg: C.oliveFill, border: C.oliveBorder },
    d: { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)" },
    s: { bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.25)" },
    f: { bg: "rgba(239,68,68,0.09)",  border: "rgba(239,68,68,0.22)" },
  };
  const s = styles[type];
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: s.bg, border: `0.5px solid ${s.border}`
    }}>
      {type === "v" && (
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
          <path d="M8 1.5L10.3 6.5H15L11.2 9.3L12.6 14L8 11.3L3.4 14L4.8 9.3L1 6.5H5.7Z" fill="#ffffff" opacity="0.85" />
        </svg>
      )}
      {type === "d" && (
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
          <path d="M8 2V14M2 8H14" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
      {type === "s" && (
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
          <circle cx="8" cy="8" r="5" stroke="#d8b4fe" strokeWidth="1.2" />
          <path d="M8 5.5V8.5L10 10" stroke="#d8b4fe" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )}
      {type === "f" && (
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
          <path d="M4 4L12 12M12 4L4 12" stroke="#fca5a5" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

// ─── TAG ─────────────────────────────────────────────────────────
function Tag({ type, children }) {
  const s = {
    v: { bg: C.oliveFill,             color: C.white2,      border: C.oliveBorder },
    d: { bg: "rgba(59,130,246,0.12)", color: C.blueMuted,   border: "transparent" },
    s: { bg: "rgba(168,85,247,0.12)", color: C.purpleMuted, border: "transparent" },
    f: { bg: "rgba(239,68,68,0.10)",  color: C.redMuted,    border: "transparent" },
  }[type];
  return (
    <span style={{
      display: "inline-block", fontSize: 9, fontWeight: 500,
      letterSpacing: "0.07em", padding: "2px 6px", borderRadius: 4,
      marginLeft: 6, background: s.bg, color: s.color,
      border: `0.5px solid ${s.border}`
    }}>{children}</span>
  );
}

// ─── TX ROW ──────────────────────────────────────────────────────
function TxRow({ icon, name, tag, tagType, date, amount, negative }) {
  return (
    <div style={{
      background: C.card, border: `0.5px solid ${C.cardBorder}`,
      borderRadius: 14, padding: "14px 16px", marginBottom: 8,
      display: "flex", alignItems: "center", gap: 12
    }}>
      <TxIcon type={icon} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.white, letterSpacing: "-0.01em", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}<Tag type={tagType}>{tag}</Tag>
        </div>
        <div style={{ fontSize: 11, color: C.grey }}>{date}</div>
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 500, color: negative ? C.red : C.white, whiteSpace: "nowrap" }}>
        {amount}
      </div>
    </div>
  );
}

// ─── NAV BAR ─────────────────────────────────────────────────────
function NavBar({ active, onNav }) {
  const items = [
    {
      id: "home", label: "Inicio",
      icon: (active) => (
        <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
          <path d="M3 10.5L11 3L19 10.5V19H14.5V14.5H7.5V19H3V10.5Z"
            stroke={active ? C.white : C.grey} strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    {
      id: "moves", label: "Movimientos",
      icon: (active) => (
        <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
          <path d="M4 7H18M4 11H18M4 15H12" stroke={active ? C.white : C.grey} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "portfolio", label: "Portfolio",
      icon: (active) => (
        <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
          <path d="M3 15.5L7.5 10L12 12.5L17 5" stroke={active ? C.white : C.grey} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="5" r="2" stroke={active ? C.white : C.grey} strokeWidth="1.2" fill="none" />
        </svg>
      )
    },
  ];

  return (
    <div style={{
      flexShrink: 0, height: 72,
      background: C.oliveBar,
      borderTop: `1px solid ${C.oliveAccent}`,
      display: "flex", alignItems: "center", justifyContent: "space-around",
      padding: "0 8px 6px"
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          padding: "6px 20px", borderRadius: 10, cursor: "pointer",
          border: "none", background: "none", WebkitTapHighlightColor: "transparent"
        }}>
          {item.icon(active === item.id)}
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.07em", color: active === item.id ? C.white : C.grey }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────
function TopBar({ title }) {
  return (
    <div style={{
      flexShrink: 0, height: 56,
      background: C.oliveBar,
      borderBottom: `1px solid ${C.oliveAccent}`,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: C.white }}>
        {title}
      </span>
    </div>
  );
}

// ─── SCREEN: HOME ─────────────────────────────────────────────────
function HomeScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 16px" }}>
      {/* Balance */}
      <div style={{ textAlign: "center", padding: "28px 0 26px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.grey, marginBottom: 14 }}>
          Acumulación Total
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, lineHeight: 1, marginBottom: 10 }}>
          <span style={{ fontSize: 28, fontWeight: 300, color: C.grey }}>₿</span>
          <span style={{ fontSize: 50, fontWeight: 600, letterSpacing: "-0.04em", color: C.white }}>1.458210</span>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 15, color: C.grey }}>≈ $115,240.50</div>
      </div>

      {/* Objetivo */}
      <Card olive>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.white2 }}>Objetivo Maximización +25%</span>
          <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: C.white }}>17.2%</span>
        </div>
        <ProgressBar pct={68.8} />
        <div style={{ fontSize: 10, color: C.grey, textAlign: "right", fontFamily: "monospace", marginTop: 6 }}>
          +0.2508 BTC generados vs DCA puro
        </div>
      </Card>

      {/* Esta semana */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.white2 }}>Esta semana</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.white, boxShadow: "0 0 8px rgba(255,255,255,0.5)" }} />
            <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 500, color: C.white }}>+0.015 BTC</span>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <div style={{ fontSize: 10, color: C.grey, letterSpacing: "0.14em", textTransform: "uppercase", margin: "22px 0 10px" }}>
        Rentabilidad / Capital Invertido
      </div>
      <HomeChart />
    </div>
  );
}

// ─── SCREEN: MOVIMIENTOS ─────────────────────────────────────────
function MovesScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 16px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: C.white2, marginBottom: 22 }}>
        Movimientos
      </div>

      <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.grey, opacity: 0.6, padding: "0 0 10px" }}>
        Recientes
      </div>

      <TxRow icon="v" name="Algoritmo Veritas" tag="TAKE PROFIT" tagType="v" date="Hoy, 14:30" amount="+0.0150 ₿" />
      <TxRow icon="s" name="Dip Hunter" tag="−15% SNIPER" tagType="s" date="Ayer, 09:15" amount="+0.0085 ₿" />
      <TxRow icon="d" name="Compra Recurrente" tag="DCA" tagType="d" date="12 May, 00:00 · Auto" amount="+0.0042 ₿" />
      <TxRow icon="v" name="Algoritmo Veritas" tag="TAKE PROFIT" tagType="v" date="08 May, 18:45" amount="+0.0210 ₿" />

      <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.grey, opacity: 0.6, padding: "18px 0 10px" }}>
        Cargos
      </div>
      <TxRow icon="f" name="Performance Fee" tag="10%" tagType="f" date="01 May, 00:00 · Mensual" amount="−0.0035 ₿" negative />
    </div>
  );
}

// ─── SCREEN: PORTFOLIO ───────────────────────────────────────────
function PortfolioScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 16px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: C.white2, marginBottom: 22 }}>
        Portfolio
      </div>

      {/* Alpha card */}
      <Card olive>
        <div style={{ fontSize: 11, color: C.grey, letterSpacing: "0.06em" }}>vs DCA (+25%)</div>
        <div style={{ fontSize: 46, fontWeight: 600, letterSpacing: "-0.04em", color: C.white, fontFamily: "monospace", lineHeight: 1, margin: "6px 0 5px" }}>
          17.2%
        </div>
        <div style={{ fontSize: 11, color: C.grey }}>+0.2508 BTC generados sobre compra pasiva</div>
        <ProgressBar pct={68.8} />
      </Card>

      {/* Comparison chart */}
      <Card>
        <div style={{ fontSize: 11, color: C.white2, marginBottom: 10 }}>Estrategia vs DCA · Valor Fiat</div>
        <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: C.grey }}>
            <div style={{ width: 14, height: 1.5, background: C.white2 }} />
            <span>The Invisible Hand</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: C.grey }}>
            <div style={{ width: 14, height: 1, background: "repeating-linear-gradient(to right,#64748b 0,#64748b 3px,transparent 3px,transparent 6px)" }} />
            <span>DCA Puro</span>
          </div>
        </div>
        <CompareChart />
      </Card>

      {/* Strategy breakdown */}
      <Card>
        <div style={{ fontSize: 11, color: C.white2, marginBottom: 12 }}>Aportación por Estrategia</div>
        <StrategyChart />
        {[
          { dot: C.white, name: "Veritas", val: "+0.142 ₿" },
          { dot: C.blueMuted, name: "DCA", val: "+0.086 ₿" },
          { dot: C.purpleMuted, name: "Dip", val: "+0.068 ₿" },
        ].map((s, i, arr) => (
          <div key={s.name} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "11px 0",
            borderBottom: i < arr.length - 1 ? "0.5px solid rgba(255,255,255,0.05)" : "none"
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: C.white, flex: 1 }}>{s.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.white }}>{s.val}</div>
          </div>
        ))}
      </Card>

      {/* Fee */}
      <div style={{
        background: C.card, border: `0.5px solid ${C.cardBorder}`,
        borderRadius: 12, padding: "14px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 6, marginBottom: 24
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.grey }}>Performance Fee Acumulado</div>
          <div style={{ fontSize: 10, color: C.grey, opacity: 0.5, marginTop: 2 }}>Cero Market Making</div>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 500, color: C.white }}>0.045 ₿</div>
      </div>
    </div>
  );
}

// ─── SCREEN: LOGIN ────────────────────────────────────────────────
function LoginScreen({ onLogin, error, loading }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    background: "#111111", border: `1px solid rgba(255,255,255,0.12)`,
    borderRadius: 12, color: C.white, fontSize: 15,
    fontFamily: "inherit", outline: "none",
    boxSizing: "border-box", marginBottom: 12,
    WebkitTextFillColor: C.white,
  };

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 28px", background: C.bg
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 48, textAlign: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: C.oliveFill, border: `1px solid ${C.oliveBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px"
        }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: C.white, fontFamily: "Georgia, serif", lineHeight: 1 }}>V</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: C.white, marginBottom: 6 }}>
          Veritas Capitale
        </div>
        <div style={{ fontSize: 11, color: C.grey, letterSpacing: "0.1em" }}>
          Vault de Acumulación Bitcoin
        </div>
      </div>

      {/* Form */}
      <div style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={{ ...inputStyle }}
          autoCapitalize="none"
          autoCorrect="off"
        />
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0, paddingRight: 48 }}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: C.grey, fontSize: 12, fontFamily: "inherit"
            }}
          >
            {showPass ? "Ocultar" : "Ver"}
          </button>
        </div>

        {error && (
          <div style={{ fontSize: 12, color: C.red, textAlign: "center", marginBottom: 12, padding: "8px 12px", background: "rgba(239,68,68,0.08)", borderRadius: 8 }}>
            {error}
          </div>
        )}

        <button
          onClick={() => onLogin(user, pass)}
          disabled={loading}
          style={{
            width: "100%", padding: "15px",
            background: C.oliveBar,
            border: `1px solid ${C.oliveAccent}`,
            borderRadius: 12, color: C.white,
            fontSize: 14, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", opacity: loading ? 0.7 : 1,
            transition: "opacity 0.15s"
          }}
        >
          {loading ? "Accediendo..." : "Acceder al Vault"}
        </button>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 40, fontSize: 10, color: C.grey, textAlign: "center", letterSpacing: "0.08em", lineHeight: 1.8 }}>
        VERITAS CAPITALE © 2025{"\n"}Sistema de gestión algorítmica
      </div>
    </div>
  );
}

// ─── TITLES PER SCREEN ────────────────────────────────────────────
const TITLES = {
  home: "Veritas Capitale",
  moves: "Movimientos",
  portfolio: "Portfolio",
};

// ─── VALID CREDENTIALS ───────────────────────────────────────────
const USERS = {
  VeritasCeo: "Veritas123",
};

// ─── ROOT APP ─────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("home");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  function handleLogin(user, pass) {
    setLoginLoading(true);
    setLoginError("");
    // Simulate async auth
    setTimeout(() => {
      if (USERS[user] && USERS[user] === pass) {
        setLoggedIn(true);
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
      setLoginLoading(false);
    }, 800);
  }

  return (
    <div style={{
      width: "100%", height: "100vh",
      background: C.bg, display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: C.white, overflow: "hidden",
      maxWidth: 430, margin: "0 auto",
    }}>
      {!loggedIn ? (
        <LoginScreen onLogin={handleLogin} error={loginError} loading={loginLoading} />
      ) : (
        <>
          <TopBar title={TITLES[screen]} />
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {screen === "home"      && <HomeScreen />}
            {screen === "moves"     && <MovesScreen />}
            {screen === "portfolio" && <PortfolioScreen />}
          </div>
          <NavBar active={screen} onNav={setScreen} />
        </>
      )}
    </div>
  );
}
