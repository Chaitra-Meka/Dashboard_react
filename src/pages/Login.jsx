import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination =
      location.state?.from?.pathname || "/";

    navigate(destination, { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white">
            A
          </div>

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access your dashboard
          </p>
        </div>

        <label className="mb-2 block text-sm font-medium">
          Email address
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
          className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter any password"
          className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Sign In
        </button>

        <p className="mt-5 text-center text-xs text-slate-500">
          Demo only: any nonempty email and password work.
        </p>
      </form>
    </div>
  );
}

export default Login;