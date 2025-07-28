import React from "react";
import { useQuery } from "@apollo/client";
import { CurrentProject } from "../Queries/Queries";

export const CurrentProjectCard = () => {
  const { data, loading, error } = useQuery(CurrentProject);

  const name = data?.progress?.[0]?.object?.name;

  if (loading) return <p className="text-sm text-gray-500">Loading current project...</p>;
  if (error) return <p className="text-sm text-red-500">Error loading current project</p>;

  return (

      <p className="text-lg font-bold text-indigo-600">{name || "None"}</p>

  );
};
