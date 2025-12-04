🏦 Banking Sales Portal — Fullstack Predictive Scoring Application

Banking Sales Portal adalah aplikasi Fullstack (Backend + Frontend) yang dirancang untuk membantu tim sales perbankan: Mengelola daftar nasabah & lead, Menentukan prioritas follow-up berbasis Machine Learning, Memantau performa akuisisi, Meningkatkan konversi penjualan melalui sistem scoring cerdas, Aplikasi ini menyediakan dashboard interaktif, manajemen lead yang lengkap, histori aktivitas follow-up, dan dukungan Dark/Light Mode yang modern serta responsif.

🧩 Arsitektur Sistem
                ┌────────────────────────────┐
                │          Frontend           │
                │     React.js + Vite         │
                │   SPA + Axios Integration   │
                └────────────▲───────────────┘
                             │  REST API
                             ▼
                ┌────────────────────────────┐
                │           Backend           │
                │   Node.js + Express.js      │
                │   JWT Auth + Validation     │
                └────────────▲───────────────┘
                             │  SQL Query
                             ▼
                ┌────────────────────────────┐
                │         PostgreSQL          │
                │     banking_sales_db        │
                └────────────────────────────┘

🚀 1. Teknologi yang Digunakan
🖥️ Frontend
⚛️ React.js
⚡ Vite (Fast Dev Server + Bundler)
🔀 React Router
🌐 Axios
🎨 Custom CSS UI (Fintech Premium Design)
🧩 FontAwesome v6 Icons

🔧 Backend
🟩 Node.js
🚏 Express.js
🐘 PostgreSQL / node-postgres (pg)
🔐 JWT Authentication (Access + Refresh Token)
📏 Joi Validation
🛡️ Authorization Middleware

🎨 2. Fitur Aplikasi
🔐 Authentication
Validasi login (email & password)
JWT Access Token + Refresh Token
Auto-logout jika token invalid
Protected Route di frontend
Penyimpanan sesi aman (localStorage)

📊 Dashboard – Sales Intelligence
Statistik konversi
Ringkasan total nasabah
Grafik tren akuisisi
Distribusi probabilitas (donut chart)
Daftar prioritas tinggi (top-scoring leads)

📁 Lead Management
Daftar lead lengkap
Sorting (nama, usia, skor, status)
Filtering (skor, pekerjaan, usia, kategori)
Real-time search
Export CSV
Aksi cepat: Kirim Email dan catatan

🗂️ Lihat detail
⭐ Tandai prioritas
👤 Lead Detail – Single Customer View
Profil nasabah lengkap
Data pekerjaan, pendapatan, status ekonomi
Rekomendasi follow-up (AI / rule-based)
Riwayat follow-up
Tambah catatan follow-up
Timeline aktivitas

⭐ Priority Leads
Segmen khusus "High Potential"
Diurutkan berdasarkan skor probabilitas
Shortcut follow-up untuk meningkatkan konversi
Daftar nasabah yang sedang dalam proses follow-up
Prioritas berdasarkan rangking lead
Filter berdasarkan status & profil
Tampilan mirip halaman Leads untuk efisiensi

🌙 Dark & Light Mode
Toggle tema modern
Animasi lembut (transitions)
Tema tersimpan otomatis (localStorage)
Konsisten di seluruh halaman aplikasi
