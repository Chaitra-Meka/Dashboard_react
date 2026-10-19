import { useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

function Users() {
  const { data, loading, error, refetch } = useFetch(
    import.meta.env.VITE_USERS_API_URL
  );

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return data.filter((user) =>
      [user.name, user.email, user.username]
        .some((value) =>
          value?.toLowerCase().includes(query)
        )
    );
  }, [data, search]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Users</h1>
      <p className="mt-2 text-slate-500">
        Manage and explore user records.
      </p>

      <div className="my-6 flex flex-wrap gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or username..."
            className="min-w-0 flex-1 py-3 outline-none"
          />
        </div>

        <button
          onClick={refetch}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="rounded-xl bg-red-50 p-5 text-red-700">
          {error}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Username</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">City</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">{user.id}</td>
                  <td className="px-5 py-4 font-medium">
                    {user.name}
                  </td>
                  <td className="px-5 py-4">
                    {user.username}
                  </td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">
                    {user.address?.city || "—"}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && (
        <p className="mt-4 text-sm text-slate-500">
          Showing {filteredUsers.length} of {data.length} users
        </p>
      )}
    </div>
  );
}

export default Users;