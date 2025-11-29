export const exportToCSV = (data, filename = "leads.csv") => {
  if (!data || data.length === 0) {
    alert("Tidak ada data untuk diexport.");
    return;
  }

  // Header dari key data
  const headers = Object.keys(data[0]).join(",");

  // Convert value → CSV rows
  const rows = data.map((obj) =>
    Object.values(obj)
      .map((val) =>
        typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val
      )
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");

  // Create blob & download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
