/* ============================================================
   THEME MANAGER
   - initTheme()  → dipanggil sekali saat app berjalan
   - toggleTheme() → dipanggil saat user klik tombol tema
   ============================================================ */

// Inisialisasi theme saat app pertama kali jalan
export function initTheme() {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("theme");

  // Default kita: dark (sesuai UI sekarang)
  const theme = saved || "dark";

  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }

  // Simpan kembali agar konsisten
  localStorage.setItem("theme", theme);
}

// Toggle antara dark <-> light
export function toggleTheme() {
  if (typeof window === "undefined") return;

  // Toggle class "light"
  const isLight = document.documentElement.classList.toggle("light");

  // Simpan state theme ke localStorage
  localStorage.setItem("theme", isLight ? "light" : "dark");

  // 🔥 Refresh halaman agar semua komponen & CSS sinkron
  window.location.reload();
}
