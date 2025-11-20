// Inisialisasi theme saat app pertama kali jalan
export function initTheme() {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("theme");

  // default kita: dark (sesuai UI sekarang)
  const theme = saved || "dark";

  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }

  localStorage.setItem("theme", theme);
}

// Toggle antara dark <-> light
export function toggleTheme() {
  if (typeof window === "undefined") return;

  const isLight = document.documentElement.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}
