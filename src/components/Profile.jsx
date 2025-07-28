import React from "react";
import { useQuery } from "@apollo/client";
import { AuditGraph } from "./Elements/Audit";
import { CurrentProjectCard } from "./Elements/CurrentProject";
import ToadGameResultsCard from "./Elements/Toad";
import { UserXPCard } from "./Elements/UserXP";
import { ProjectChart } from "./Elements/Projects";
import { UserInfo } from "./Queries/Queries";

import { Card } from "./Card";

export default function Profile() {
  const { data: userData } = useQuery(UserInfo);
  const user = userData?.user?.[0];
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading…";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
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

      {/* Top KPI Row */}
      <main className="p-8 max-w-7xl mx-auto space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1) Game Progress */}
          <Card title="Game Progress">
            <ToadGameResultsCard />
          </Card>
           {/* Card 2: Current Project + XP */}
          <Card className="flex flex-col items-center text-center divide-y divide-gray-100">
            {/* Current Project block */}
            <div className="py-6 flex flex-col gap-2 items-center w-full">
              <h3 className="text-sm text-gray-500">Current Project</h3>
              <CurrentProjectCard />
            </div>

            {/* Total XP block */}
            {user?.id && (
              <div className="py-6 flex flex-col gap-2 items-center w-full">
                <h3 className="text-sm text-gray-500">Total XP</h3>
                <UserXPCard userId={Number(user.id)} />
              </div>
            )}
          </Card>
          {/* 3) Audit Ratio */}
          <Card
            title="Audit Ratio"
            className="flex items-center justify-center"
          >
            <div className="w-24 h-24">
              <AuditGraph small />
            </div>
          </Card>
        </section>

        {/* Projects Completed Chart */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Projects Completed
          </h2>
          <ProjectChart />
        </section>
      </main>
    </div>
  );
}
