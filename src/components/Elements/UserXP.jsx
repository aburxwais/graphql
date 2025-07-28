// src/Elements/UserXP.jsx
import React from "react";
import { useQuery } from "@apollo/client";
import { UserXP } from "../Queries/Queries";

export function UserXPCard({ userId }) {
  const { data, loading, error } = useQuery(UserXP, {
    variables: { userId },
  });

  if (loading) {
    return <p className="text-sm text-gray-400">Loading XP…</p>;
  }
  if (error) {
    console.error("UserXP query failed:", error);
    return (
      <p className="text-sm text-indigo-500">
        Error fetching XP
      </p>
    );
  }

  const totalBytes = data.xp_view.reduce((sum, r) => sum + r.amount, 0);

  const totalKB = Math.round(totalBytes / 1000);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold text-indigo-600">
        {totalKB} kB
      </p>
    </div>
  );
}
