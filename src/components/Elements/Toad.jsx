import React from "react";
import { useQuery } from "@apollo/client";
import { ToadGameResults } from "../Queries/Queries";

const ToadGameResultsCard = () => {
  const { data, loading, error } = useQuery(ToadGameResults);

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (error || !data?.toad_session_game_results) {
    console.error("ToadGameResults error:", error);
    return (
      <p className="text-sm text-indigo-500">Error loading game data</p>
    );
  }

  const results = data.toad_session_game_results;
  const getBest = (name) =>
    results
      .filter((e) => e.result?.name === name)
      .sort((a, b) => b.level - a.level)[0] || { level: "-", attempts: "-" };

  const memory = getBest("memory");
  const zzle   = getBest("zzle");

  return (
    <div className="space-y-6">
      {/* Memory Row */}
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full bg-blue-100 mt-1 flex items-center justify-center">
          🧠
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-blue-800">Memory</p>
          <p className="text-xs text-gray-700">Level {memory.level}</p>
          <p className="text-xs text-gray-500">Attempts: {memory.attempts}</p>
        </div>
      </div>

      {/* Zzle Row */}
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full bg-green-100 mt-1 flex items-center justify-center">
          🧩
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-green-800">Zzle</p>
          <p className="text-xs text-gray-700">Level {zzle.level}</p>
          <p className="text-xs text-gray-500">Attempts: {zzle.attempts}</p>
        </div>
      </div>
    </div>
  );
};

export default ToadGameResultsCard;
