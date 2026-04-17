import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4">
      <h3 className="text-lg font-bold">Contact App</h3>
      <button onClick={logout} className="text-red-500">
        Logout
      </button>
    </header>
  );
}
