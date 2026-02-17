import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage, { ShieldPage } from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <LoginPage onLogin={setUser} />   // 👈 THIS is what was missing
          }
        />
        <Route
          path="/dashboard"
          element={
            user
              ? <ShieldPage user={user} onLogout={() => setUser(null)} />
              : <Navigate to="/login" replace />   // basic route guard
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;