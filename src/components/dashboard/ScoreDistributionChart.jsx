import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ScoreDistributionChart = ({ scoreDistribution }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const labels = scoreDistribution.map((item) => {
    switch (item.category) {
      case "high":
        return "Prioritas Tinggi";
      case "medium":
        return "Prioritas Sedang";
      case "low":
        return "Prioritas Rendah";
      default:
        return item.category || "Tidak diketahui";
    }
  });

  const values = scoreDistribution.map((item) => item.count || 0);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    const legendColor = isLight ? "#0A1931" : "#e5e7eb";

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "rgba(34,197,94,0.9)", // Tinggi
                "rgba(234,179,8,0.9)", // Sedang
                "rgba(239,68,68,0.9)", // Rendah
              ],
              borderColor: "#0f172a",
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: legendColor,
                boxWidth: 12,
              },
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
  }, [labels, values]);

  return (
    <div className="chart-card">
      <div className="card-header">
        <h3>Distribusi Lead Score</h3>
        <button className="btn-icon" type="button">
          <i className="fas fa-ellipsis-v" />
        </button>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ScoreDistributionChart;
