
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Settings() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Settings
      </h1>

      <p className="mb-6 text-gray-600">
        Manage your account settings.
      </p>

      <div className="max-w-lg rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Account Information
        </h2>

        <p className="mb-4 text-gray-600">
          Email: {user?.email || "Not available"}
        </p>

        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
