import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-5 md:px-8">
          <div>
            <p className="text-sm text-slate-500">
              Welcome back,
            </p>
            <h2 className="text-xl font-bold capitalize">
              {user?.name || "Admin"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full bg-slate-100 p-3"
            >
              <Bell size={19} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;