import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// ─── App ─────────────────────────────────────────────────────────────────────
// Routes added here as each page is built.
// TODO: wrap /dashboard (and future protected pages) with an auth guard once
//       the token-refresh flow is finalised.

export default function App() {
  return (
    <Routes>
      {/* Default → register (first page a new user sees) */}
      <Route path="/"          element={<Navigate to="/register" replace />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
