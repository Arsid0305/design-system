// RespondPanel.jsx — Response editor + AI generation panel
// Exports: RespondPanel

const THEMES = window.RB_THEMES;

const MOCK_RESPONSES = {
  5: "Мария, большое спасибо за тёплый отзыв о мяче BounceX Pro! 🎉 Очень рады, что питомец оценил игрушку по достоинству. Будем рады видеть вас снова!\n\nС уважением,\nкоманда Arols",
  4: "Анна, спасибо за отзыв о мяче BounceX Pro! Рады, что товар понравился. Если появятся вопросы — пишите в ЛС, всегда поможем.\n\nС уважением,\nкоманда Arols",
  3: "Спасибо за честную оценку мяча BounceX Pro. Примем к сведению ваше замечание и постараемся улучшить качество. Если есть вопросы — напишите нам в ЛС.\n\nС уважением,\nкоманда Arols",
  2: "Приносим свои извинения за неудобства с мячом BounceX Pro. Нам важно разобраться в ситуации — пожалуйста, напишите нам в ЛС, решим вопрос.\n\nС уважением,\nкоманда Arols",
  1: "Очень жаль, что мяч BounceX Pro не оправдал ожиданий. Приносим извинения. Пожалуйста, напишите нам в ЛС — обязательно разберёмся и найдём решение.\n\nС уважением,\nкоманда Arols",
};

function RespondPanel({ review, settings, onBack, onSubmit }) {
  const { useState, useRef } = React;
  const t = THEMES[review.platform] || THEMES.wb;
  const [response, setResponse] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const taRef = useRef(null);
  const MAX = 1000;
  const charColor = response.length > 900 ? "#FF3B30" : response.length > 700 ? "#FF9500" : "#999";

  const handleGenerate = () => {
    setGenerating(true);
    setShowRating(false);
    setTimeout(() => {
      const text = MOCK_RESPONSES[review.stars] || MOCK_RESPONSES[3];
      setResponse(text);
      setGenerated(true);
      setGenerating(false);
      setShowRating(true);
      setTimeout(() => taRef.current?.focus(), 100);
    }, 1200);
  };

  const handleSubmit = () => {
    if (!response.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      onSubmit({ reviewId: review.id, response: response.trim() });
    }, 900);
  };

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: 48, animation: "rb-fadeIn 0.4s ease" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>Ответ отправлен!</div>
        {rating > 0 && <div style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>Оценка {rating}★ сохранена</div>}
        <button onClick={onBack}
          style={{ padding: "12px 32px", background: t.grad, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          ← К списку отзывов
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ background: t.grad, padding: "0 24px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "16px 4px", display: "flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Ответ на отзыв</span>
        <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 20, padding: "3px 12px", fontSize: 12, marginLeft: "auto" }}>{t.name} API</span>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px", display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        {/* Review summary */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e6e8ec", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", padding: 24 }}>
          <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, color: "#fff", background: t.grad, marginBottom: 8 }}>{t.name}</span>
          <div style={{ fontSize: 14, color: "#666", marginBottom: 3 }}>{review.author}</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>{review.productName}</div>
          {review.article && <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Арт: {review.article}</div>}
          <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 24, color: i <= review.stars ? "#ffb84d" : "#e6e6e6" }}>★</span>)}
          </div>
          {review.pros && <div style={{ background: "#f9fafc", padding: "12px 16px", borderRadius: 10, fontSize: 15, marginBottom: 10, lineHeight: 1.6 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#34C759", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Достоинства</div>{review.pros}</div>}
          {review.cons && <div style={{ background: "#f9fafc", padding: "12px 16px", borderRadius: 10, fontSize: 15, marginBottom: 10, lineHeight: 1.6 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#FF3B30", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Недостатки</div>{review.cons}</div>}
          {review.comment && <div style={{ background: "#f9fafc", padding: "12px 16px", borderRadius: 10, fontSize: 15, lineHeight: 1.6 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Комментарий</div>{review.comment}</div>}
        </div>

        {/* Response editor */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e6e8ec", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>Ответ продавца</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
                Обращение: <strong style={{ color: t.accent }}>{review.author.split(" ")[0]}</strong>
              </div>
            </div>
            <button onClick={handleGenerate} disabled={generating}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: generating ? "#f0f1f4" : "#10A37F", color: generating ? "#999" : "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: generating ? "not-allowed" : "pointer", transition: "all 0.15s" }}>
              {generating
                ? <><span style={{ display: "inline-block", animation: "rb-spin 1s linear infinite" }}>⟳</span>Генерирую...</>
                : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>{generated ? "Перегенерировать" : "Сгенерировать ИИ"}</>}
            </button>
          </div>
          <div style={{ padding: "0 24px" }}>
            <textarea ref={taRef} value={response} onChange={e => e.target.value.length <= MAX && setResponse(e.target.value)}
              placeholder="Напишите ответ вручную или нажмите «Сгенерировать ИИ»..."
              style={{ width: "100%", minHeight: 150, border: "none", outline: "none", resize: "none", fontSize: 15, color: "#1a1a1a", lineHeight: 1.6, padding: "16px 0", background: "transparent", fontFamily: "inherit" }} />
          </div>
          <div style={{ padding: "0 24px 16px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "#bbb" }}>Лимит: 1000 символов</span>
            <span style={{ fontSize: 13, color: charColor, fontWeight: response.length > 900 ? 600 : 400 }}>{response.length} / {MAX}</span>
          </div>
        </div>

        {/* Rating feedback */}
        {showRating && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e6e8ec", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", padding: 24, animation: "rb-fadeIn 0.3s ease" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 14 }}>🎓 Оцените ответ — бот учится на ваших оценках</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n}
                  onMouseEnter={() => setHoverRating(n)} onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(n)}
                  style={{ width: 44, height: 44, borderRadius: 10, border: `2px solid ${(hoverRating || rating) >= n ? "#ffb84d" : "#e6e8ec"}`, background: (hoverRating || rating) >= n ? "#FFF8E1" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.1s" }}>
                  <span style={{ fontSize: 22, color: (hoverRating || rating) >= n ? "#ffb84d" : "#e6e6e6" }}>★</span>
                </button>
              ))}
              {rating > 0 && <span style={{ alignSelf: "center", fontSize: 14, color: "#888", marginLeft: 8 }}>{rating <= 2 ? "Плохо" : rating === 3 ? "Нормально" : rating === 4 ? "Хорошо" : "Отлично!"}</span>}
            </div>
          </div>
        )}

        {/* Send button */}
        <button onClick={handleSubmit} disabled={!response.trim() || response.length > MAX || sending}
          style={{ padding: "13px 20px", background: !response.trim() || sending ? "#e6e8ec" : t.grad, color: !response.trim() || sending ? "#999" : "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: !response.trim() || sending ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s", fontFamily: "inherit" }}>
          {sending
            ? <><span style={{ display: "inline-block", animation: "rb-spin 1s linear infinite" }}>⟳</span>Отправляю...</>
            : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Отправить на {t.name}</>}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { RespondPanel });
