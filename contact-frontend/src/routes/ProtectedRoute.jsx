import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Optional: basic expiry check (safe)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;

    if (payload.exp && payload.exp < now) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
}
