import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/products", label: "Products", icon: ShoppingBag },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex w-full shrink-0 flex-col bg-slate-950 p-5 text-white md:min-h-screen md:w-64">
      <h1 className="mb-8 text-2xl font-bold">
        Admin<span className="text-indigo-400">Panel</span>
      </h1>

      <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-slate-800 md:mt-auto"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;