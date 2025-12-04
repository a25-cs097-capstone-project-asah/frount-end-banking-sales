import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ConversionChart = ({ conversionTrend, period, onChangePeriod }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // ========== PREPARE DATA ==========
    const labels = conversionTrend.map((item) => item.date);

    const dataPoints = conversionTrend.map((item) =>
      item.conversionRate !== undefined
        ? item.conversionRate
        : item.convertionRate || 0
    );

    const isLight = document.documentElement.classList.contains("light");
    const axisColor = isLight ? "#0A1931" : "#e5e7eb";
    const gridColor = isLight
      ? "rgba(148, 163, 184, 0.4)"
      : "rgba(148, 163, 184, 0.25)";

    // ========== REMOVE OLD CHART ==========
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // ========== CREATE NEW CHART ==========
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Conversion Rate (%)",
              data: dataPoints,
              borderColor: "rgba(0, 181, 204, 1)",
              backgroundColor: "rgba(0, 181, 204, 0.15)",
              tension: 0.4,
              fill: true,
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: "rgba(0, 181, 204, 1)",
              pointBorderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: {
                color: axisColor,
                font: { size: 11 },
              },
            },
            y: {
              min: -1,
              max: 1,
              grid: { color: gridColor },
              ticks: {
                color: axisColor,
                font: { size: 11 },
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
  }, [conversionTrend, period]);

  return (
    <div className="chart-card">
      <div className="card-header">
        <h3>Trend Konversi</h3>

        {/* 🔥 Dropdown periode untuk fetch ulang backend */}
        <select
          className="select-period"
          value={period}
          onChange={(e) => onChangePeriod(Number(e.target.value))}
        >
          <option value={7}>7 Hari Terakhir</option>
          <option value={30}>30 Hari Terakhir</option>
          <option value={90}>3 Bulan Terakhir</option>
        </select>
      </div>

      <canvas ref={chartRef} />
    </div>
  );
};

export default ConversionChart;
