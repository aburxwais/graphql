import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { Projects } from "../Queries/Queries";

export const ProjectChart = () => {
  const { data, loading, error } = useQuery(Projects);

  if (loading) return <p className="text-center text-gray-600">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">Error loading projects</p>;

  const projects = data?.transaction || [];

  

  const sorted = [...projects].sort(
    (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
  );
  const labels = sorted.map((tx) => tx.object.name);
  const xpValues = sorted.map((tx) => (tx.amount / 1000).toFixed(1));

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        
        rotate: -45,
        style: {
          fontSize: "10px",
          whiteSpace: "nowrap",
        },
      },
    },
    yaxis: {
      title: {
        text: "XP",
      },
    },
    colors: ["#60a5fa"], // Tailwind blue-400
    tooltip: {
      y: {
        formatter: (val) => `${val} XP`,
      },
    },
  };

  const chartSeries = [
    {
      name: "XP",
      data: xpValues,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Projects Completed</h2>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={400} />
    </div>
  );
};
