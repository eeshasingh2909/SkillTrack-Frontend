import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

// ─── App ─────────────────────────────────────────────────────────────────────
// Routes added here as each page is built.
// Protected routes and auth guard will be added once the auth store is wired.

export default function App() {
  return (
    <Routes>
      {/* Default → register (first page a new user sees) */}
      <Route path="/"          element={<Navigate to="/register" replace />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/login"     element={<Login />} />

      {/* Placeholder — will be replaced with real protected page */}
      <Route path="/dashboard" element={<div>Dashboard — auth required</div>} />
    </Routes>
  );
}
