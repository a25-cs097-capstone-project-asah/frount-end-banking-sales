import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ConversionChart = ({ conversionTrend }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    const axisColor = isLight ? "#0A1931" : "#e5e7eb";
    const gridColor = isLight
      ? "rgba(148, 163, 184, 0.4)"
      : "rgba(148, 163, 184, 0.25)";

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: conversionTrend.labels,
          datasets: [
            {
              label: "Konversi",
              data: conversionTrend.datasets,
              borderColor: "rgba(0, 181, 204, 1)",
              backgroundColor: "rgba(0, 181, 204, 0.15)",
              tension: 0.35,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: axisColor },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: axisColor },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [conversionTrend]);

  return (
    <div className="chart-card">
      <div className="card-header">
        <h3>Trend Konversi</h3>
        <select className="select-period">
          <option>7 Hari Terakhir</option>
          <option>30 Hari Terakhir</option>
          <option>3 Bulan Terakhir</option>
        </select>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ConversionChart;
