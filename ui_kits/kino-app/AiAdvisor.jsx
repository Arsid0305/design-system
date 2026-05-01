// AiAdvisor.jsx — Kino UI Kit
// Recreated from src/components/AiAdvisor.tsx
// Chat panel fills full screen from header to bottom
// Inline movie cards with BookmarkPlus / Star / EyeOff actions

const PROVIDERS = [
  { id: 'claude', label: 'Claude', color: '#E8784D' },
  { id: 'gpt4o', label: 'GPT', color: '#10A37F' },
  { id: 'gemini', label: 'Gemini', color: '#4285F4' },
  { id: 'deepseek', label: 'DS', color: '#4D6AFF' },
];

const ProviderDot = ({ color }) => (
  <svg width="11" height="11" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill={color} /></svg>
);

// Inline mini movie card for chat suggestions
const ChatMovieCard = ({ movie, onWatchlist, onRate, onDismiss, inWatchlist, inWatched, inDismissed }) => (
  <div style={{ background: 'hsl(220 18% 10%)', border: '1px solid hsl(220 15% 18%)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 0 20px -5px hsl(38 90% 55% / 0.15)' }}>
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.04em', color: '#ece9e0', lineHeight: 1.1 }}>{movie.titleRu}</div>
        <div style={{ fontSize: 10, color: '#787e8a', marginTop: 2 }}>
          {movie.title}{movie.year > 0 ? ` · ${movie.year}` : ''} · {movie.type === 'series' ? 'Сериал' : 'Фильм'}
        </div>
      </div>
      {movie.description && <div style={{ fontSize: 12, color: '#d6d0c4', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{movie.description}</div>}
      {movie.reasonToWatch && (
        <div style={{ borderRadius: 8, border: '1px solid hsl(38 90% 55% / 0.2)', background: 'hsl(38 90% 55% / 0.05)', padding: '7px 9px' }}>
          <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'hsl(38 90% 55%)' }}>Почему вам подойдёт</div>
          <div style={{ fontSize: 11, color: '#d6d0c4', marginTop: 3, lineHeight: 1.4 }}>{movie.reasonToWatch}</div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
        <a href={`https://yandex.ru/search/?text=${encodeURIComponent(movie.titleRu + ' фильм ' + (movie.year || ''))}`}
          target="_blank" rel="noreferrer"
          style={{ padding: '9px 14px', borderRadius: 10, border: '1px solid hsl(220 15% 18%)', color: '#787e8a', fontSize: 12, fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
          Яндекс
        </a>
        <button onClick={() => onWatchlist(movie)} disabled={inWatchlist}
          style={{ flex: 1, padding: '9px', borderRadius: 10, border: `1px solid ${inWatchlist ? 'hsl(38 90% 55% / 0.3)' : 'hsl(220 15% 18%)'}`, background: inWatchlist ? 'hsl(38 90% 55% / 0.1)' : 'none', color: inWatchlist ? 'hsl(38 90% 55%)' : '#ece9e0', fontSize: 12, fontWeight: 600, cursor: inWatchlist ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path><line x1="12" y1="7" x2="12" y2="13"></line><line x1="9" y1="10" x2="15" y2="10"></line></svg>
          Буду смотреть
        </button>
        <button onClick={() => onRate(movie)}
          style={{ padding: '9px 12px', borderRadius: 10, border: `1px solid ${inWatched ? 'hsl(38 90% 55%)' : 'hsl(220 15% 18%)'}`, background: inWatched ? 'hsl(38 90% 55%)' : 'none', color: inWatched ? '#0d1117' : '#ece9e0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={inWatched ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </button>
        <button onClick={() => onDismiss(movie)} disabled={inDismissed}
          style={{ padding: '9px 12px', borderRadius: 10, border: `1px solid ${inDismissed ? 'hsl(0 70% 50% / 0.3)' : 'hsl(220 15% 18%)'}`, background: inDismissed ? 'hsl(0 70% 50% / 0.1)' : 'none', color: inDismissed ? 'hsl(0 70% 50%)' : '#787e8a', cursor: inDismissed ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
        </button>
      </div>
    </div>
  </div>
);

const AiAdvisor = ({ watchedMovies = [], watchlistMovies = [], dismissedMovies = [], onAddToWatchlist, onRateMovie, onDismissMovie }) => {
  const [open, setOpen] = React.useState(false);
  const [provider, setProvider] = React.useState('claude');
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef(null);

  const watchedKeys = React.useMemo(() => new Set(watchedMovies.map(m => `${m.titleRu}:${m.year}`)), [watchedMovies]);
  const watchlistKeys = React.useMemo(() => new Set(watchlistMovies.map(m => `${m.titleRu}:${m.year}`)), [watchlistMovies]);
  const dismissedKeys = React.useMemo(() => new Set(dismissedMovies.map(m => `${m.titleRu}:${m.year}`)), [dismissedMovies]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { id: Date.now(), role: 'user', content: text, suggestions: [] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const botMsg = {
      id: Date.now() + 1, role: 'assistant',
      content: 'Вот несколько вариантов под твой запрос:',
      suggestions: [
        { id: 's1', titleRu: 'DREDD', title: 'Dredd', year: 2012, type: 'movie', description: '95 минут чистого экшена. Очень плотный темп, никакой воды.', reasonToWatch: 'Короткий, напряжённый, без лишних слов.', duration: 95, director: 'Pete Travis', kpRating: 7.2, genre: ['боевик', 'фантастика'], mood: ['напряжённое'] },
        { id: 's2', titleRu: 'ЛОКК', title: 'Locke', year: 2013, type: 'movie', description: 'Один мужчина. Одна машина. Одна ночь.', reasonToWatch: 'Если хочешь тихое, но держит мёртвой хваткой.', duration: 85, director: 'Steven Knight', kpRating: 7.5, genre: ['драма', 'триллер'], mood: ['напряжённое'] },
      ],
    };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const renderContent = (content) => content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const S = {
    fab: { position: 'fixed', bottom: 22, right: 22, zIndex: 50, width: 52, height: 52, borderRadius: '50%', background: 'hsl(38 90% 55%)', color: '#0d1117', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px -4px hsl(38 90% 55% / 0.35)', transition: 'transform 0.15s' },
    panel: { position: 'fixed', insetInline: 0, bottom: 0, top: 64, zIndex: 50, maxWidth: 448, margin: '0 auto', display: 'flex', flexDirection: 'column', background: 'hsl(220 18% 10%)', border: '1px solid hsl(220 15% 18%)', borderRadius: '16px 16px 0 0', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)', opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 0.25s, transform 0.25s', pointerEvents: open ? 'auto' : 'none' },
    panelHeader: { borderBottom: '1px solid hsl(220 15% 18%)', background: 'hsl(220 15% 16% / 0.5)', flexShrink: 0 },
    headerTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' },
    title: { display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.04em', color: '#ece9e0' },
    tabs: { display: 'flex', background: 'hsl(220 15% 16%)', borderRadius: 12, padding: 4, margin: '0 12px 10px', gap: 2 },
    tab: (active) => ({ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '5px 0', borderRadius: 9, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s', background: active ? 'hsl(220 18% 10%)' : 'transparent', color: active ? '#ece9e0' : '#787e8a', boxShadow: active ? '0 1px 3px rgba(0,0,0,0.3)' : 'none' }),
    messages: { flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 },
    msgUser: { alignSelf: 'flex-end', background: 'hsl(38 90% 55%)', color: '#0d1117', borderRadius: '14px 14px 4px 14px', padding: '8px 12px', fontSize: 13, maxWidth: '75%' },
    msgBot: { alignSelf: 'flex-start', background: 'hsl(220 15% 16%)', color: '#ece9e0', borderRadius: '14px 14px 14px 4px', padding: '8px 12px', fontSize: 13, maxWidth: '85%', lineHeight: 1.45 },
    inputArea: { padding: '10px 12px', borderTop: '1px solid hsl(220 15% 18%)', background: 'hsl(220 15% 16% / 0.3)', display: 'flex', gap: 7, flexShrink: 0 },
    input: { flex: 1, background: 'hsl(220 15% 16%)', border: '1px solid hsl(220 15% 18%)', borderRadius: 12, padding: '8px 12px', fontSize: 13, color: '#ece9e0', outline: 'none', fontFamily: 'Inter, sans-serif' },
    sendBtn: (disabled) => ({ width: 38, height: 38, borderRadius: 10, background: 'hsl(38 90% 55%)', color: '#0d1117', border: 'none', cursor: disabled ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: disabled ? 0.4 : 1 }),
  };

  return (
    <>
      {!open && (
        <button style={S.fab} onClick={() => setOpen(true)}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.88)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2M20 14h2M15 13v2M9 13v2"></path></svg>
        </button>
      )}

      <div style={S.panel}>
        <div style={S.panelHeader}>
          <div style={S.headerTop}>
            <div style={S.title}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(38 90% 55%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
              Кино AI
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {messages.length > 0 && (
                <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', padding: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              )}
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#787e8a', cursor: 'pointer', padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          <div style={S.tabs}>
            {PROVIDERS.map(p => (
              <button key={p.id} onClick={() => setProvider(p.id)} style={S.tab(provider === p.id)}>
                <ProviderDot color={p.color} />{p.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} style={S.messages}>
          {messages.length === 0 && !loading && (
            <div style={{ textAlign: 'center', color: '#787e8a', fontSize: 13, padding: '32px 0' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(38 90% 55% / 0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 10px', display: 'block' }}><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2M20 14h2M15 13v2M9 13v2"></path></svg>
              <div>Спроси, что посмотреть.</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>Я отвечаю только про фильмы, сериалы и похожий видеоконтент.</div>
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={msg.role === 'user' ? S.msgUser : S.msgBot}
                dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }} />
              {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                  {msg.suggestions.map(movie => {
                    const key = `${movie.titleRu}:${movie.year}`;
                    return (
                      <ChatMovieCard key={key} movie={movie}
                        inWatchlist={watchlistKeys.has(key)}
                        inWatched={watchedKeys.has(key)}
                        inDismissed={dismissedKeys.has(key)}
                        onWatchlist={m => onAddToWatchlist && onAddToWatchlist(m)}
                        onRate={m => onRateMovie && onRateMovie(m)}
                        onDismiss={m => onDismissMovie && onDismissMovie(m)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ ...S.msgBot, display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(38 90% 55%)', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          )}
        </div>

        <div style={S.inputArea}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Например: короткие серии на несколько дней" style={S.input} />
          <button onClick={send} disabled={!input.trim() || loading} style={S.sendBtn(!input.trim() || loading)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.85)} 50%{opacity:1;transform:scale(1.1)} }`}</style>
    </>
  );
};

Object.assign(window, { AiAdvisor, ChatMovieCard });
