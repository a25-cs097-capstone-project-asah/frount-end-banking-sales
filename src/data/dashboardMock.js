// Sementara pakai dummy. Nanti tinggal ganti ambil dari API / dataset asli.

export const stats = {
  totalLead: {
    value: 1247,
    change: 12, // %
  },
  conversion: {
    value: 342,
    change: 8, // %
  },
  highPriority: {
    value: 28,
  },
  conversionRate: {
    value: 27.4, // %
    change: 3.2, // %
  },
};

export const conversionTrend = {
  labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
  datasets: [42, 51, 48, 60, 58, 65, 72],
};

export const scoreDistribution = {
  labels: ["Tinggi", "Sedang", "Rendah"],
  values: [45, 35, 20],
};

export const priorityLeads = [
  {
    id: 1,
    name: "Siti Nurhaliza",
    title: "Marketing Manager",
    age: 45,
    score: 92,
    level: "Sangat Tinggi",
  },
  {
    id: 2,
    name: "Bambang Wijaya",
    title: "Entrepreneur",
    age: 52,
    score: 89,
    level: "Sangat Tinggi",
  },
  {
    id: 3,
    name: "Dewi Lestari",
    title: "Director",
    age: 48,
    score: 87,
    level: "Sangat Tinggi",
  },
  {
    id: 4,
    name: "Andi Pratama",
    title: "IT Manager",
    age: 38,
    score: 84,
    level: "Tinggi",
  },
];

export const activities = [
  {
    id: 1,
    type: "success",
    title: "Follow up berhasil",
    desc: "Budi Santoso setuju untuk meeting",
    time: "10 menit lalu",
  },
  {
    id: 2,
    type: "info",
    title: "Lead baru ditambahkan",
    desc: "3 lead baru dari kampanye email",
    time: "1 jam lalu",
  },
  {
    id: 3,
    type: "warning",
    title: "Reminder follow up",
    desc: "5 lead perlu dihubungi hari ini",
    time: "2 jam lalu",
  },
  {
    id: 4,
    type: "success",
    title: "Konversi berhasil",
    desc: "Dewi Lestari membuka deposito",
    time: "3 jam lalu",
  },
  {
    id: 5,
    type: "info",
    title: "Email terkirim",
    desc: "28 email penawaran terkirim",
    time: "5 jam lalu",
  },
];

export const sidebarCounts = {
  leadsTotal: 124,
  highPriority: 28,
};
