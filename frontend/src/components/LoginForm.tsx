import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// STUDENT TODO LIST
// ─────────────────────────────────────────────────────────────────────────────
// 1. CONTEXT  — Create an AuthContext and wrap the app so any component can
//               read/update the current user without prop-drilling.
//
// 2. AUTH     — Replace the fake `fakeLogin()` stub with a real call to your
//               backend
//
// 3. STORAGE  — Persist the session so a page refresh doesn't log the user out.
//               Try localStorage.
//
// 4. GUARD    — Make <ShieldPage /> truly private. Redirect to <LoginPage />
//               whenever no valid session exists.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Fake auth stub (replace me!) ────────────────────────────────────────────
const fakeLogin = (email, password) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (email && password.length >= 4)
        resolve({ id: "u_001", email, name: email.split("@")[0] });
      else reject(new Error("Invalid credentials"));
    }, 900),
  );

// ─── Shared design tokens ─────────────────────────────────────────────────────
const C = {
  bg: "#f3f0eb",
  surface: "#ffffff",
  border: "#e5e0d8",
  accent: "#b85c2a",
  ink: "#1c1812",
  inkMid: "#5a4d3e",
  inkLight: "#a09484",
  inkFaint: "#c8c0b4",
  mono: "ui-monospace, 'Cascadia Code', 'SF Mono', Menlo, monospace",
  serif: "Georgia, 'Times New Roman', serif",
};

// ─── Label ───────────────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label style={{
    display: "block", marginBottom: 8,
    fontFamily: C.mono, fontSize: "0.65rem",
    letterSpacing: "0.13em", textTransform: "uppercase", color: C.inkLight,
  }}>
    {children}
  </label>
);

// ─── Login Page ───────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [focused, setFocused]   = useState(null);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const user = await fakeLogin(email, password);
      onLogin(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    display: "block", width: "100%", boxSizing: "border-box",
    padding: "13px 16px",
    fontFamily: C.mono, fontSize: "0.9rem", color: C.ink,
    background: "#f9f7f5",
    border: `1.5px solid ${focused === name ? C.accent : C.border}`,
    borderRadius: 8, outline: "none", transition: "border-color 0.15s",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 32,
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* Accent rule */}
        <div style={{ width: 48, height: 2, background: C.accent, marginBottom: 32 }} />

        {/* Heading */}
        <h1 style={{ fontFamily: C.serif, fontSize: "2.6rem", fontWeight: 400, color: C.ink, letterSpacing: "-0.02em", lineHeight: 1, margin: "0 0 8px" }}>
          Sign <em style={{ color: C.accent, fontStyle: "italic" }}>in</em>
        </h1>
        <p style={{ fontFamily: C.mono, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkLight, margin: "0 0 32px" }}>
          student starter · no auth yet
        </p>

        {/* Card */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "40px 40px 36px",
          boxShadow: "0 2px 4px rgba(28,24,18,0.04), 0 8px 28px rgba(28,24,18,0.07)",
        }}>

          {/* Email */}
          <div style={{ marginBottom: 24 }}>
            <Label>Email</Label>
            <input
              type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              style={inputStyle("email")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 32 }}>
            <Label>Password</Label>
            <input
              type="password" placeholder="min 4 chars"
              value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
              style={inputStyle("password")}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit} disabled={loading}
            style={{
              display: "block", width: "100%", padding: "14px 20px",
              fontFamily: C.mono, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: loading ? "#a89f92" : "#f5f2ee",
              background: loading ? "#d4cfc8" : C.ink,
              border: "none", borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#3a3020"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = C.ink; }}
            onMouseDown={(e)  => { if (!loading) e.currentTarget.style.transform = "scale(0.985)"; }}
            onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {loading ? "Checking…" : "Sign in →"}
          </button>

          {/* Error */}
          {error && (
            <p style={{ marginTop: 12, fontFamily: C.mono, fontSize: "0.75rem", color: C.accent, textAlign: "center" }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer hint */}
        <div style={{ marginTop: 24, paddingLeft: 14, borderLeft: `2px solid ${C.border}` }}>
          <p style={{ fontFamily: C.mono, fontSize: "0.72rem", color: C.inkLight, lineHeight: 1.65, margin: 0 }}>
            Any email + password ≥ 4 chars will work.{" "}
            <span style={{ color: C.inkMid, fontWeight: 600 }}>Your job:</span>{" "}
            replace{" "}
            <code style={{ fontFamily: C.mono, fontSize: "0.7rem", background: "#f0ece6", color: "#7a6a55", padding: "1px 6px", borderRadius: 4 }}>
              fakeLogin()
            </code>{" "}
            with the real thing.
          </p>
        </div>

      </div>
    </div>
  );
};

// ─── Shield / Protected Page ──────────────────────────────────────────────────
const ShieldPage = ({ user, onLogout }) => {
  const Code = ({ children }) => (
    <code style={{ fontFamily: C.mono, fontSize: "0.7rem", background: "#f0ece6", color: "#7a6a55", padding: "2px 6px", borderRadius: 4 }}>
      {children}
    </code>
  );

  const items = [
    <><Code>AuthContext</Code> + <Code>AuthProvider</Code></>,
    <>Replace <Code>fakeLogin()</Code> with a real API / Firebase call</>,
    "Persist the session with localStorage or a cookie",
    "Add a route guard that redirects unauthenticated users",
    "Handle token expiry + refresh",
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 32,
    }}>
      <div style={{ width: "100%", maxWidth: 560 }}>

        {/* Accent rule */}
        <div style={{ width: 48, height: 2, background: C.accent, marginBottom: 32 }} />

        {/* ── Horizontal Shield Banner ── */}
        <div style={{
          background: C.ink,
          borderRadius: 12,
          padding: "28px 36px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}>
          {/* Shield SVG — large */}
          <svg
            style={{ width: 56, height: 56, flexShrink: 0, opacity: 0.9 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f5f2ee"
            strokeWidth="1.25"
          >
            <path d="M12 2L3 6.5v5C3 16.1 7 20.6 12 22c5-1.4 9-5.9 9-10.5v-5L12 2z" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Text */}
          <div>
            <h2 style={{
              fontFamily: C.serif, fontSize: "1.5rem", fontWeight: 400,
              color: "#f5f2ee", letterSpacing: "-0.01em", margin: "0 0 6px",
            }}>
              Protected Page
            </h2>
            <p style={{
              fontFamily: C.mono, fontSize: "0.72rem",
              color: C.inkFaint, lineHeight: 1.6, margin: 0,
            }}>
              Signed in as{" "}
              <strong style={{ color: C.accent, fontWeight: 600 }}>{user?.name ?? "guest"}</strong>.
              {" "}This page has no real guard yet.
            </p>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "36px 40px 32px",
          boxShadow: "0 2px 4px rgba(28,24,18,0.04), 0 8px 28px rgba(28,24,18,0.07)",
        }}>

          {/* Checklist header */}
          <p style={{
            fontFamily: C.mono, fontSize: "0.62rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: C.accent, margin: "0 0 20px",
          }}>
            Your implementation checklist
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
            {items.map((item, i) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                fontFamily: C.mono, fontSize: "0.78rem", color: C.inkLight,
                marginBottom: i < items.length - 1 ? 16 : 0,
                lineHeight: 1.55,
              }}>
                <span style={{
                  width: 18, height: 18, flexShrink: 0,
                  border: `1.5px solid ${C.border}`, borderRadius: "50%",
                  marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.border, display: "block" }} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 28 }} />

          {/* Logout */}
          <button
            onClick={onLogout}
            style={{
              fontFamily: C.mono, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: C.inkLight, background: "transparent",
              border: `1.5px solid ${C.border}`, borderRadius: 8,
              padding: "10px 22px", cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkLight; }}
          >
            ← Log out
          </button>

        </div>
      </div>
    </div>
  );
};

// ─── Exports ──────────────────────────────────────────────────────────────────
export { ShieldPage };
export default LoginPage;