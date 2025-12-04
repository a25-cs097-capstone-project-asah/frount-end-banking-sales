🏦 Banking Sales Portal – Fullstack Application

Banking Sales Portal adalah aplikasi Fullstack (Frontend + Backend) berbasis Predictive Lead Scoring yang dirancang untuk membantu tim sales perbankan dalam mengelola nasabah, menentukan prioritas follow-up, serta memonitor performa akuisisi dengan dukungan Machine Learning.

Aplikasi terdiri dari:

Backend API → Node.js + Express + PostgreSQL

Frontend Web → React + Vite

Sistem ini mendukung:

Autentikasi JWT

Dashboard interaktif

Manajemen lead & follow-up

Dark/Light mode

Riwayat aktivitas sales

📌 Arsitektur Sistem
                ┌─────────────────────┐
                │     Frontend        │
                │ React + Vite        │
                │                     │
                └─────────▲───────────┘
                          │ API Request (Axios)
                          ▼
                ┌─────────────────────┐
                │      Backend        │
                │ Node.js + Express   │
                │ JWT Authentication   │
                └─────────▲───────────┘
                          │ Query
                          ▼
                ┌─────────────────────┐
                │     PostgreSQL      │
                │  banking_sales_db   │
                └─────────────────────┘

🚀 1. Teknologi yang Digunakan
🖥️ Frontend

React.js

Vite

React Router

Axios

FontAwesome

Custom CSS

🔧 Backend

Node.js / Express

PostgreSQL

JWT Authentication

Joi Validation

Middleware Authorization

pg (node-postgres)

🎨 2. Fitur Aplikasi
🔐 Authentication

Login dengan validasi

Penyimpanan JWT (access & refresh token)

Protected Routes di frontend

📊 Dashboard

Statistik total nasabah

Statistik konversi

Grafis tren konversi

Distribusi skor probabilitas

Daftar lead prioritas tinggi

📁 Lead Management

Daftar lead

Sorting

Filtering (skor, pekerjaan, usia, status)

Search real-time

Export CSV

Aksi cepat (email/telepon)

👤 Lead Detail

Informasi lengkap nasabah

Profil pekerjaan dan ekonomi

Rekomendasi tindak lanjut

Riwayat catatan follow-up

Tambah catatan baru

⭐ Priority Leads

Lead kategori “High”

Akses cepat untuk follow-up konsisten

📞 Follow Up Center

Daftar nasabah berstatus “Follow-Up”

Filter terkait profil nasabah

Tampilan mirip halaman Leads

🌙 Dark & Light Mode

Tersedia toggle tema

Disimpan otomatis di localStorage
