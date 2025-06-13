import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/reg/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-8">Loading users...</div>;

  return (
    <div className="w-full px-2 sm:px-4 py-4">
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-[1000px] w-full text-xs">
          <thead className="bg-indigo-600 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">Name</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">Email</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">Phone</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">City</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">College</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">Domain</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">Year</th>
              <th className="px-3 py-2 text-left font-bold text-white uppercase tracking-wider">Degree</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={idx % 2 === 0 ? "bg-gray-50 hover:bg-indigo-50 transition" : "bg-white hover:bg-indigo-50 transition"}
                >
                  <td className="px-3 py-2 whitespace-nowrap">{user.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.email}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.phone}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.city}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.college}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.domain}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.year}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{user.degree}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
