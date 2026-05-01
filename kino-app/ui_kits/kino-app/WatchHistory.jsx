// WatchHistory.jsx — Kino UI Kit
// Recreated from src/components/WatchHistory.tsx — compact rows, click to re-rate

const WatchHistory = ({ watched = [], onReRate }) => {
  if (watched.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: '#787e8a' }}>
        <div style={{ fontSize: 14 }}>Пока нет просмотренных фильмов</div>
        <div style={{ fontSize: 11, marginTop: 4 }}>Получите рекомендацию и оцените!</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {watched.map((movie, i) => (
        <div key={movie.id || i} onClick={() => onReRate && onReRate(movie)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'hsl(220 15% 16% / 0.5)', borderRadius: 12,
            border: '1px solid hsl(220 15% 18%)', padding: '10px 12px',
            cursor: 'pointer', transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'hsl(38 90% 55% / 0.4)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'hsl(220 15% 18%)'}>
          {/* Icon */}
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'hsl(220 18% 12%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
            🎬
          </div>
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#ece9e0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.titleRu}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, color: 'hsl(38 90% 55%)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="hsl(38 90% 55%)" stroke="hsl(38 90% 55%)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                {movie.rating}
              </span>
              {movie.duration > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, color: '#787e8a' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {movie.duration}м
                </span>
              )}
            </div>
          </div>
          {/* Notes */}
          {movie.notes && (
            <div style={{ fontSize: 10, color: '#787e8a', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.notes}</div>
          )}
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { WatchHistory });
