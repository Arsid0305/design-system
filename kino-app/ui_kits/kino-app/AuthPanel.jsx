// AuthPanel.jsx — Kino UI Kit
// Recreated from src/components/AuthPanel.tsx — magic link only, no Google OAuth

const AuthPanel = ({ session, syncStatus, onSignOut, onSendLink }) => {
  const [email, setEmail] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setSubmitting(true);
    await onSendLink(email.trim());
    setEmail('');
    setSubmitting(false);
  };

  const S = {
    panel: { background: 'hsl(220 15% 16% / 0.4)', border: '1px solid hsl(220 15% 18%)', borderRadius: 16, padding: 14 },
    headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 },
    headerLeft: { display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#ece9e0' },
    signoutBtn: { fontSize: 11, color: '#787e8a', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 },
    desc: { fontSize: 11, color: '#787e8a', marginBottom: 10, lineHeight: 1.45 },
    inputRow: { display: 'flex', gap: 7 },
    inputWrap: { position: 'relative', flex: 1 },
    input: { width: '100%', background: 'hsl(220 20% 6%)', border: '1px solid hsl(220 15% 18%)', borderRadius: 12, padding: '9px 12px 9px 36px', fontSize: 13, color: '#ece9e0', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' },
    mailIcon: { position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#787e8a', pointerEvents: 'none' },
    btnSend: { padding: '9px 14px', borderRadius: 12, background: 'hsl(38 90% 55%)', color: '#0d1117', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' },
    hint: { fontSize: 10, color: '#787e8a', marginTop: 8, lineHeight: 1.4 },
  };

  if (session) {
    return (
      <div style={S.panel}>
        <div style={S.headerRow}>
          <div style={S.headerLeft}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(38 90% 55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
            Облачная синхронизация включена
          </div>
          <button style={S.signoutBtn} onClick={onSignOut}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Выйти
          </button>
        </div>
        <div style={{ fontSize: 13, color: '#d6d0c4' }}>{session.email}</div>
        <div style={{ fontSize: 11, color: '#787e8a', marginTop: 3 }}>{syncStatus}</div>
      </div>
    );
  }

  return (
    <div style={S.panel}>
      <div style={S.headerRow}>
        <div style={S.headerLeft}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(38 90% 55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
          Войдите, чтобы синхронизировать базу
        </div>
      </div>
      <div style={S.desc}>История оценок и watchlist будут храниться в Supabase и подтягиваться на любом устройстве после входа.</div>
      <div style={S.inputRow}>
        <div style={S.inputWrap}>
          <svg style={S.mailIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          <input value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="you@example.com" type="email" style={S.input} />
        </div>
        <button onClick={handleSubmit} disabled={submitting || !email.trim()}
          style={{ ...S.btnSend, opacity: (submitting || !email.trim()) ? 0.5 : 1 }}>
          {submitting ? '...' : 'Войти'}
        </button>
      </div>
      <div style={S.hint}>Пришлем magic link на email. Для этого в Supabase Auth должен быть включен Email provider.</div>
    </div>
  );
};

Object.assign(window, { AuthPanel });
