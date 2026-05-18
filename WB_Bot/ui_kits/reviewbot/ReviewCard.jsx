// ReviewCard.jsx — Single review card
// Exports: ReviewCard, Stars

const THEMES = window.RB_THEMES;

function Stars({ count, size = 22 }) {
  return (
    <span style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= count ? "#ffb84d" : "#e6e6e6", textShadow: i <= count ? "0 1px 4px rgba(255,184,77,0.35)" : "none", lineHeight: 1 }}>★</span>
      ))}
    </span>
  );
}

function PlatformBadge({ platform }) {
  const t = THEMES[platform] || THEMES.wb;
  return (
    <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, color: "#fff", background: t.grad, marginBottom: 8 }}>
      {t.name}
    </span>
  );
}

function ReviewCard({ review, clickable, onSelect, onDelete, accentShadow }) {
  const { useState } = React;
  const [hovered, setHovered] = useState(false);
  const noContent = !(review.pros || review.cons || review.comment);
  const isManual = review.source === "manual";

  return (
    <div
      onClick={() => clickable && !noContent && onSelect(review)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 14, border: "1px solid #e6e8ec", padding: 24, marginBottom: 16,
        cursor: clickable && !noContent ? "pointer" : "default",
        boxShadow: hovered && clickable && !noContent ? `0 12px 32px ${accentShadow}` : "0 8px 24px rgba(0,0,0,0.05)",
        transform: hovered && clickable && !noContent ? "translateY(-1px)" : "none",
        transition: "box-shadow 0.15s, transform 0.15s"
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
        {isManual
          ? <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, color: "#666", background: "#f0f1f4", marginBottom: 8 }}>Вручную</span>
          : <PlatformBadge platform={review.platform} />
        }
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {review.status === "responded" && (
            <span style={{ background: "rgba(52,199,89,0.1)", color: "#34C759", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Отвечено
            </span>
          )}
          {clickable && (
            <button onClick={e => { e.stopPropagation(); onDelete(review.id); }}
              style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", display: "flex", padding: 2, transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#FF3B30"}
              onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div style={{ fontSize: 14, color: "#666", marginBottom: 3 }}>{review.author}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 4 }}>{review.productName}</div>
      <div style={{ display: "flex", gap: "6px 14px", flexWrap: "wrap", marginBottom: 12, fontSize: 13, color: "#888" }}>
        {review.article && review.article !== "—" && <span>🏷 <b style={{ color: "#555" }}>{review.article}</b></span>}
        {review.date && <span>📝 {review.date}</span>}
      </div>
      <div style={{ marginBottom: 14 }}><Stars count={review.stars} size={22} /></div>
      {review.pros && <div style={{ background: "#f9fafc", padding: "10px 14px", borderRadius: 8, fontSize: 14, marginBottom: 8, lineHeight: 1.55 }}><span style={{ fontWeight: 700, color: "#34C759", fontSize: 12 }}>Достоинства: </span>{review.pros}</div>}
      {review.cons && <div style={{ background: "#f9fafc", padding: "10px 14px", borderRadius: 8, fontSize: 14, marginBottom: 8, lineHeight: 1.55 }}><span style={{ fontWeight: 700, color: "#FF3B30", fontSize: 12 }}>Недостатки: </span>{review.cons}</div>}
      {review.comment && <div style={{ background: "#f9fafc", padding: "10px 14px", borderRadius: 8, fontSize: 14, lineHeight: 1.55 }}><span style={{ fontWeight: 700, color: "#888", fontSize: 12 }}>Комментарий: </span>{review.comment}</div>}
      {noContent && <div style={{ fontSize: 13, color: "#bbb", fontStyle: "italic" }}>Только оценка — ответ не требуется</div>}
    </div>
  );
}

Object.assign(window, { ReviewCard, Stars, PlatformBadge });
