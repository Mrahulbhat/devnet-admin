import { useUserStore } from "../store/useUserStore.js";
import React from "react";
import UsersTable from "../components/UsersTable";

const HomePage = () => {
  const { getUsers } = useUserStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">

            {!getUsers ? <div>No users</div>: <UsersTable />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
