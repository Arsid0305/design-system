// SetupForm.jsx — Brand setup / settings screen
// Exports: SetupForm

const THEMES = window.RB_THEMES;

const TONE_LABELS   = { formal: "Официальный", friendly: "Дружелюбный", neutral: "Нейтральный" };
const LENGTH_LABELS = { short: "Короткий (до 200 зн.)", medium: "Средний (до 500 зн.)", long: "Развёрнутый (до 900 зн.)" };
const MODEL_LABELS  = { "gpt-4o-mini": "GPT-4o mini — быстро, дёшево", "gpt-4o": "GPT-4o — выше качество" };

const INP_STYLE = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #d9dbe0",
  borderRadius: 10, fontSize: 15, color: "#1a1a1a", background: "#fafafa",
  transition: "all 0.15s", fontFamily: "inherit"
};
const LBL_STYLE = { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 };

function SetupForm({ initial, isEdit, onSave, onBack, platform }) {
  const { useState } = React;
  const t = THEMES[platform] || THEMES.wb;
  const [form, setForm] = useState(initial || {
    brandName: "", tone: "friendly", responseLength: "medium",
    model: "gpt-4o-mini", signature: "", customInstructions: ""
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.brandName.trim().length > 0;

  const focusStyle = (e) => {
    e.target.style.borderColor = t.accent;
    e.target.style.boxShadow = `0 0 0 3px ${t.accentBg}`;
  };
  const blurStyle = (e) => {
    e.target.style.borderColor = "#d9dbe0";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8" }}>
      <div style={{ background: t.grad, padding: "0 24px", display: "flex", alignItems: "center", gap: 12 }}>
        {isEdit && (
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "16px 4px", display: "flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        )}
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 0" }}>
          {isEdit ? "Настройки бренда" : "Настройка бота"}
        </span>
      </div>

      <div style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e6e8ec", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Brand name */}
          <div>
            <label style={LBL_STYLE}>Название бренда <span style={{ color: t.accent }}>*</span></label>
            <input style={INP_STYLE} placeholder="Organic Lab" value={form.brandName}
              onChange={e => set("brandName", e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          {/* Tone */}
          <div>
            <label style={LBL_STYLE}>Тон</label>
            <div style={{ display: "flex", gap: 8 }}>
              {Object.entries(TONE_LABELS).map(([k, v]) => (
                <button key={k} onClick={() => set("tone", k)}
                  style={{ flex: 1, padding: "9px 4px", borderRadius: 10, border: `2px solid ${form.tone === k ? t.accent : "#e6e8ec"}`, background: form.tone === k ? t.accentBg : "#fff", color: form.tone === k ? t.accent : "#333", fontSize: 13, fontWeight: form.tone === k ? 600 : 400, cursor: "pointer" }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Response length */}
          <div>
            <label style={LBL_STYLE}>Длина ответа</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(LENGTH_LABELS).map(([k, v]) => (
                <button key={k} onClick={() => set("responseLength", k)}
                  style={{ padding: "10px 16px", borderRadius: 10, border: `2px solid ${form.responseLength === k ? t.accent : "#e6e8ec"}`, background: form.responseLength === k ? t.accentBg : "#fff", color: form.responseLength === k ? t.accent : "#333", fontSize: 14, fontWeight: form.responseLength === k ? 600 : 400, cursor: "pointer", textAlign: "left" }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Model */}
          <div>
            <label style={LBL_STYLE}>Модель GPT</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(MODEL_LABELS).map(([k, v]) => (
                <button key={k} onClick={() => set("model", k)}
                  style={{ padding: "10px 16px", borderRadius: 10, border: `2px solid ${form.model === k ? "#10A37F" : "#e6e8ec"}`, background: form.model === k ? "rgba(16,163,127,0.06)" : "#fff", color: form.model === k ? "#10A37F" : "#333", fontSize: 14, fontWeight: form.model === k ? 600 : 400, cursor: "pointer", textAlign: "left" }}>
                  {v}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>mini: ~$0.0002 за ответ · 4o: ~$0.003 за ответ</div>
          </div>

          {/* Signature */}
          <div>
            <label style={LBL_STYLE}>Подпись</label>
            <input style={INP_STYLE} placeholder={`С уважением, команда ${form.brandName || "бренда"}`}
              value={form.signature} onChange={e => set("signature", e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          {/* Custom instructions */}
          <div>
            <label style={LBL_STYLE}>Доп. инструкции</label>
            <textarea style={{ ...INP_STYLE, height: 90, lineHeight: 1.6, resize: "vertical" }}
              placeholder="Например: при браке — предлагать замену..."
              value={form.customInstructions} onChange={e => set("customInstructions", e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          {/* Save */}
          <button onClick={() => valid && onSave(form)} disabled={!valid}
            style={{ padding: "13px 20px", background: valid ? t.grad : "#e6e8ec", color: valid ? "#fff" : "#999", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
            {isEdit ? "Сохранить" : "Начать работу →"}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SetupForm });
