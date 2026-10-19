import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useFetch from "../hooks/useFetch";
import StatCard from "../components/StatCard";
import Loading from "../components/Loading";

function Dashboard() {
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useFetch(import.meta.env.VITE_USERS_API_URL);

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useFetch(import.meta.env.VITE_PRODUCTS_API_URL);

  const loading = usersLoading || productsLoading;
  const error = usersError || productsError;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-slate-500">
            Monitor your application in one place.
          </p>
        </div>

        <button
          onClick={() => {
            refetchUsers();
            refetchProducts();
          }}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Refresh Data
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Check your internet connection and API URLs.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total Users"
              value={users.length}
              description="Users returned by the API"
              icon="👥"
            />

            <StatCard
              title="Total Products"
              value={products.length}
              description="Products returned by the API"
              icon="📦"
            />

            <StatCard
              title="Application Status"
              value="Active"
              description="Dashboard interface is running"
              icon="✅"
            />
          </div>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Recent Users
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest users returned by the API
                </p>
              </div>

              <Link
                to="/users"
                className="flex items-center gap-2 text-sm font-semibold text-indigo-600"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-3 py-4">Name</th>
                    <th className="px-3 py-4">Email</th>
                    <th className="px-3 py-4">City</th>
                  </tr>
                </thead>

                <tbody>
                  {users.slice(0, 5).map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-4 font-medium">
                        {user.name}
                      </td>
                      <td className="px-3 py-4 text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-3 py-4 text-slate-600">
                        {user.address?.city || "—"}
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-3 py-8 text-center text-slate-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;