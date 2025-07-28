import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { AuditsDone, AuditsRecieved } from "../Queries/Queries";

export const AuditGraph = () => {
  const { loading: loadingDone, error: errorDone, data: dataDone, refetch: refetchAuditsDone } = useQuery(AuditsDone);
  const { loading: loadingReceived, error: errorReceived, data: dataReceived, refetch: refetchAuditsReceived } = useQuery(AuditsRecieved);

  useEffect(() => {
    refetchAuditsDone();
    refetchAuditsReceived();
  }, [refetchAuditsDone, refetchAuditsReceived]);

  if (loadingDone || loadingReceived) return null;
  if (errorDone || errorReceived) return null;

  const doneAmount = Number((dataDone?.transaction_aggregate?.aggregate?.sum?.amount || 0) / 1_000_000).toFixed(3);
  const receivedAmount = Number((dataReceived?.transaction_aggregate?.aggregate?.sum?.amount || 0) / 1_000_000).toFixed(3);
  const auditRatio = dataDone?.user?.[0]?.auditRatio != null ? dataDone.user[0].auditRatio.toFixed(1) : "0.0";

  if (auditRatio === "0.0") return null;

  const chartOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      sparkline: { enabled: true },
    },
    stroke: { width: 0 },
    labels: ["Done", "Received"],

    colors: ["#34d399", "#60a5fa"],
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
      enabled: true,
      theme: "light",
      y: {
        formatter: (val, opts) => {
          const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
          const percent = ((val / total) * 100).toFixed(1);
          return `${val.toFixed(3)} MB (${percent}%)`;
        },
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    
  };

  const chartSeries = [parseFloat(doneAmount), parseFloat(receivedAmount)];

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="100%"
        height="100%"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-blue-600">{auditRatio}x</span>
      </div>
    </div>
  );
};
