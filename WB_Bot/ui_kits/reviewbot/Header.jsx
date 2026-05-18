// Header.jsx — ReviewBot App Header
// Exports: Header, PlatformSwitch

const THEMES = window.RB_THEMES;

function PlatformSwitch({ current, onChange }) {
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: 4, gap: 4 }}>
      {["wb", "ozon"].map(p => (
        <button key={p} onClick={() => onChange(p)}
          style={{
            padding: "6px 18px", borderRadius: 9, border: "none", fontSize: 14, fontWeight: 700,
            cursor: "pointer", transition: "all 0.2s",
            background: current === p ? "#fff" : "transparent",
            color: current === p ? THEMES[p].accent : "rgba(255,255,255,0.75)"
          }}>
          {THEMES[p].name}
        </button>
      ))}
    </div>
  );
}

function Header({ platform, onSwitchPlatform, onOpenSettings, feedbackCount }) {
  const t = THEMES[platform] || THEMES.wb;
  return (
    <div style={{ background: t.grad, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💬</div>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>ReviewBot</span>
        {feedbackCount > 0 && (
          <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 20, padding: "3px 12px", fontSize: 12 }}>🎓 {feedbackCount}</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 0" }}>
        <PlatformSwitch current={platform} onChange={onSwitchPlatform} />
        <button onClick={onOpenSettings}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "8px 10px", color: "#fff", cursor: "pointer", display: "flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Header, PlatformSwitch });
