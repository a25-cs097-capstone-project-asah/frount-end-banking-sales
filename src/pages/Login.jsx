import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../theme";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identity: "",
    password: "",
  });

  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("light")
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.identity || !form.password) {
      setErrorMsg("Username dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      // === 1. Panggil backend sesuai dokumentasi API ===
      const res = await fetch("http://localhost:5000/authentications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.identity, // backend pakai username
          password: form.password, // backend pakai password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login gagal.");
        return;
      }

      // === 2. Simpan Access Token dan Refresh Token ===
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // === 2b. Simpan nama & role user untuk ditampilkan di sidebar ===
      // kalau backend mengembalikan user, pakai fullname/role dari sana
      const userFromApi = data.data.user || {};
      const userName = userFromApi.fullname || form.identity;
      const userRole = userFromApi.role || "Sales Manager";

      localStorage.setItem("userName", userName);
      localStorage.setItem("userRole", userRole);

      // === 3. Redirect ke dashboard ===
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bagian UI tidak berubah */}
      <button
        className="auth-theme-toggle"
        onClick={handleToggleTheme}
        aria-label="Toggle Theme"
      >
        <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
      </button>

      <div className="auth-page">
        <div className="auth-container">
          {/* Kiri */}
          <div className="auth-left">
            <div className="auth-branding">
              <i className="fas fa-chart-line" />
              <h1>Banking Sales Portal</h1>
              <p>Predictive Lead Scoring untuk Deposito Berjangka</p>
            </div>

            <div className="auth-features">
              <div className="feature-item">
                <i className="fas fa-bullseye" />
                <div>
                  <h3>Prediksi Akurat</h3>
                  <p>Model ML mendeteksi calon nasabah potensial</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-users" />
                <div>
                  <h3>Prioritas Lead</h3>
                  <p>Fokus pada nasabah probabilitas tertinggi</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-bar" />
                <div>
                  <h3>Dashboard Interaktif</h3>
                  <p>Visualisasi data untuk keputusan tepat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div className="auth-right">
            <div className="auth-form-container">
              <h2>Selamat Datang</h2>
              <p className="auth-subtitle">
                Masuk menggunakan Username dan Password
              </p>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-group">
                  <label htmlFor="identity">
                    <i className="fas fa-user" /> Username
                  </label>
                  <input
                    type="text"
                    id="identity"
                    name="identity"
                    required
                    placeholder="contoh: Driyan"
                    value={form.identity}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fas fa-lock" /> Password
                  </label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      placeholder="Masukkan password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      <i
                        className={`fas fa-eye${showPassword ? "-slash" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Error */}
                {errorMsg && <p className="error-text">{errorMsg}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
