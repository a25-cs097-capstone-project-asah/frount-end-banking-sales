import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../theme";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLight, setIsLight] = useState(false);

  // cek mode saat pertama kali load
  useEffect(() => {
    const hasLight = document.documentElement.classList.contains("light");
    setIsLight(hasLight);
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: validasi / call API login
    // Untuk demo: kalau ada email & password, anggap sukses
    if (form.email && form.password) {
      // Simpan nama & role (nanti bisa dari response API)
      localStorage.setItem("userName", "Ahmad Rizki");
      localStorage.setItem("userRole", "Sales Manager");

      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* TOGGLE TEMA UNTUK LOGIN */}
      <button
        className="auth-theme-toggle"
        onClick={handleToggleTheme}
        aria-label="Toggle Theme"
      >
        <i className={isLight ? "fas fa-sun" : "fas fa-moon"} />
      </button>

      <div className="auth-page">
        <div className="auth-container">
          {/* Kiri: branding & fitur */}
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
                  <p>Model ML untuk identifikasi calon nasabah potensial</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-users" />
                <div>
                  <h3>Prioritas Lead</h3>
                  <p>Fokus pada nasabah dengan probabilitas tertinggi</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-bar" />
                <div>
                  <h3>Dashboard Interaktif</h3>
                  <p>Visualisasi data real-time untuk keputusan tepat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: form login */}
          <div className="auth-right">
            <div className="auth-form-container">
              <h2>Selamat Datang Kembali</h2>
              <p className="auth-subtitle">
                Masuk ke akun Anda untuk melanjutkan
              </p>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope" /> Email atau ID Karyawan
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="nama@perusahaan.com atau BNK-XXXX"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

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

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" id="remember" />
                    <span>Ingat saya</span>
                    <button type="button" className="btn-link">
                      Lupa password?
                    </button>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  <i className="fas fa-sign-in-alt" /> Masuk
                </button>

                <div className="auth-divider">
                  <span>atau</span>
                </div>

                <div className="social-login">
                  <button type="button" className="btn btn-social btn-google">
                    <i className="fab fa-google" /> Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-social btn-microsoft"
                  >
                    <i className="fab fa-microsoft" /> Microsoft
                  </button>
                </div>

                <p className="auth-switch">
                  Belum punya akun?{" "}
                  <Link to="/register" className="link">
                    Daftar sekarang
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
