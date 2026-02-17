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

// ─── Shield SVG icon ─────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg
    style={{
      width: 52,
      height: 52,
      margin: "0 auto 1.25rem",
      display: "block",
      opacity: 0.12,
    }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 2L3 6.5v5C3 16.1 7 20.6 12 22c5-1.4 9-5.9 9-10.5v-5L12 2z" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Login Page ───────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await fakeLogin(email, password);
      onLogin(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-bg flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl card-shadow p-10 animate-fade-up">
        {/* Wordmark */}
        <h1
          className="font-serif text-stone-900 mb-1"
          style={{ fontSize: "2rem", lineHeight: 1.1 }}
        >
          Sign <em style={{ color: "#b85c2a", fontStyle: "italic" }}>in</em>
        </h1>
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-8">
          student starter · no auth yet
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs text-stone-400 uppercase tracking-widest mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-200 rounded-md"
            style={{ color: "#1c1812", transition: "border-color 0.15s" }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs text-stone-400 uppercase tracking-widest mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="min 4 chars"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="input-field w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-200 rounded-md"
            style={{ color: "#1c1812", transition: "border-color 0.15s" }}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 text-xs font-mono uppercase tracking-wider rounded-md"
          style={{
            background: loading ? "#d4cfc8" : "#1c1812",
            color: loading ? "#a89f92" : "#f5f2ee",
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.12em",
            border: "none",
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = "#3a3020";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = "#1c1812";
          }}
          onMouseDown={(e) => {
            if (!loading) e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {loading ? "Checking…" : "Sign in →"}
        </button>

        {/* Error */}
        {error && (
          <p
            className="mt-3 text-xs text-center animate-shake"
            style={{ color: "#b85c2a" }}
          >
            {error}
          </p>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-stone-100" />

        {/* Hint */}
        <p className="text-xs text-stone-400 text-center leading-relaxed">
          Any email + password ≥ 4 chars will work.
          <br />
          <span style={{ color: "#6b5c48", fontWeight: 600 }}>
            Your job:
          </span>{" "}
          replace{" "}
          <code
            className="text-xs bg-stone-100 px-1 py-0.5 rounded"
            style={{ color: "#7a6a55" }}
          >
            fakeLogin()
          </code>{" "}
          with the real thing.
        </p>
      </div>
    </div>
  );
};

// ─── Shield / Protected Page ──────────────────────────────────────────────────
const ShieldPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen page-bg flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl card-shadow p-10 text-center animate-fade-up">
        <ShieldIcon />

        <h2
          className="font-serif text-stone-900 mb-2"
          style={{ fontSize: "1.4rem" }}
        >
          Protected Page
        </h2>
        <p className="text-xs text-stone-400 leading-relaxed mb-8">
          You made it in as{" "}
          <strong style={{ color: "#5a4d3e" }}>{user?.name ?? "guest"}</strong>.
          <br />
          But this page has no real guard yet — anyone can reach it.
        </p>

        {/* Checklist */}
        <div className="text-left border border-dashed border-stone-200 rounded-lg p-5 mb-6">
          <h3
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#b85c2a" }}
          >
            Your implementation checklist
          </h3>
          <ul className="space-y-2">
            {[
              <>
                <code
                  className="text-xs bg-stone-100 px-1 rounded"
                  style={{ color: "#7a6a55" }}
                >
                  AuthContext
                </code>{" "}
                +{" "}
                <code
                  className="text-xs bg-stone-100 px-1 rounded"
                  style={{ color: "#7a6a55" }}
                >
                  AuthProvider
                </code>
              </>,
              <>
                Replace{" "}
                <code
                  className="text-xs bg-stone-100 px-1 rounded"
                  style={{ color: "#7a6a55" }}
                >
                  fakeLogin()
                </code>{" "}
                with a real API / Firebase call
              </>,
              "Persist the session with localStorage or a cookie",
              "Add a route guard that redirects unauthenticated users",
              "Handle token expiry + refresh",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-stone-400"
              >
                <span
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#ddd6cb" }}
                >
                  ○
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-md"
          style={{
            color: "#b0a090",
            background: "transparent",
            border: "1px solid #ddd6cb",
            cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#1c1812";
            e.currentTarget.style.color = "#1c1812";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#ddd6cb";
            e.currentTarget.style.color = "#b0a090";
          }}
        >
          ← Log out
        </button>
      </div>
    </div>
  );
};

// ─── Exports ──────────────────────────────────────────────────────────────────
export { ShieldPage };
export default LoginPage;
