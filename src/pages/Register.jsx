import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../theme";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // cek mode saat pertama load
  useEffect(() => {
    const hasLight = document.documentElement.classList.contains("light");
    setIsLight(hasLight);
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsLight((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: validasi + kirim data ke backend
    // kalau sukses daftar:
    navigate("/dashboard");
  };

  return (
    <>
      {/* TOGGLE TEMA DI HALAMAN REGISTER */}
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

          {/* Kanan: form register */}
          <div className="auth-right">
            <div className="auth-form-container">
              <h2>Buat Akun Baru</h2>
              <p className="auth-subtitle">
                Daftar untuk mengakses portal prediksi lead scoring
              </p>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      <i className="fas fa-user" /> Nama Depan
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="Masukkan nama depan"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">
                      <i className="fas fa-user" /> Nama Belakang
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Masukkan nama belakang"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope" /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="nama@perusahaan.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone" /> Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">
                    <i className="fas fa-building" /> Departemen
                  </label>
                  <select id="department" name="department" required>
                    <option value="">Pilih Departemen</option>
                    <option value="sales">Sales &amp; Marketing</option>
                    <option value="manager">Sales Manager</option>
                    <option value="analyst">Data Analyst</option>
                    <option value="director">Director</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="employeeId">
                    <i className="fas fa-id-card" /> ID Karyawan
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    required
                    placeholder="BNK-XXXX"
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
                      placeholder="Minimal 8 karakter"
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
                  <div className="password-strength" id="passwordStrength">
                    {/* indikator kekuatan password (opsional) */}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-lock" /> Konfirmasi Password
                  </label>
                  <div className="password-input">
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      placeholder="Ulangi password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      <i
                        className={`fas fa-eye${showConfirm ? "-slash" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" id="terms" required />
                    <span>
                      Saya setuju dengan{" "}
                      <button type="button" className="btn-link">
                        Syarat &amp; Ketentuan
                      </button>{" "}
                      dan{" "}
                      <button type="button" className="btn-link">
                        Kebijakan Privasi
                      </button>
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  <i className="fas fa-user-plus" /> Daftar Sekarang
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
                  Sudah punya akun?{" "}
                  <Link to="/login" className="link">
                    Login di sini
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

export default Register;
