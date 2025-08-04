import React from "react";
import { useQuery } from "@apollo/client";
import { AuditGraph } from "./Elements/Audit";
import { CurrentProjectCard } from "./Elements/CurrentProject";
import ToadGameResultsCard from "./Elements/Toad";
import { UserXPCard } from "./Elements/UserXP";
import { ProjectChart } from "./Elements/Projects";
import { UserInfo, LabelQuery, UserRole } from "./Queries/Queries";
import { Card } from "./Card";

export default function Profile() {
  const { data: userData, loading: userLoading } = useQuery(UserInfo);
  const { data: roleData, loading: roleLoading } = useQuery(UserRole);
  const { data: labelData, loading: labelLoading } = useQuery(LabelQuery);

  const user = userData?.user?.[0];
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading…";

  if (userLoading || roleLoading || !user) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  const isAdmin = roleData?.user_role?.some(
    (entry) => entry.userId === user?.id && entry.role?.slug === "admin"
  );

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10 text-center">
        <p className="text-red-600 text-lg font-semibold mb-6">
          🛡️ You are an admin. The full profile cannot be loaded.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  const hasTechTeamLabel = labelData?.label_user?.some(
    (label) =>
      label.labelName.toLowerCase() === "tech team" && label.userId === user?.id
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Nav */}
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {fullName}</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      {/* KPI Row */}
      <div className="p-8 w-full space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Game Progress">
            <ToadGameResultsCard />
          </Card>

          <Card className="flex flex-col items-center text-center divide-y justify-center p-8 divide-gray-100">
            <div className="py-6 flex flex-col gap-2 items-center w-full">
              <h3 className="text-sm text-gray-500">Currently working on:</h3>
              <CurrentProjectCard />
            </div>

            {user?.id && (
              <div className="py-6 flex flex-col gap-2 items-center w-full">
                <h3 className="text-sm text-gray-500">Total XP</h3>
                <UserXPCard userId={Number(user.id)} />
                {hasTechTeamLabel && (
                  <p className="text-xs text-indigo-600 mt-2">
                    🔧 You're part of the Tech Team – XP may be inaccurate.
                  </p>
                )}
              </div>
            )}
          </Card>

          <Card
            title="Audit Ratio"
            className="flex items-center justify-center"
          >
            <div className="w-24 h-24">
              <AuditGraph small />
            </div>
          </Card>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-md w-screen p-6 rounded-none">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Projects Completed
        </h2>
        <ProjectChart />
      </div>
    </div>
  );
}
