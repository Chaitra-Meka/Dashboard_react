import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <h1 className="text-8xl font-black text-indigo-600">
        404
      </h1>

      <h2 className="mt-5 text-2xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-3 text-slate-500">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-7 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;