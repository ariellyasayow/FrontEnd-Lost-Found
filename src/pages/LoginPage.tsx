// src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { UNKLAB_EMAIL_DOMAIN } from "../constants/app";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import type { RegisterData } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register fields
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [nim, setNim] = useState("");
  const [noWa, setNoWa] = useState("");
  const [nomorRegistrasi, setNomorRegistrasi] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  // ── SIGN IN ───────────────────────────────────────────────────────────────
  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim().toLowerCase().endsWith(UNKLAB_EMAIL_DOMAIN)) {
      setError(`Gunakan email kampus dengan domain ${UNKLAB_EMAIL_DOMAIN}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      navigate(ROUTES.home);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login gagal";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── REGISTER ──────────────────────────────────────────────────────────────
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setRegisterSuccess("");

    if (!email.trim().toLowerCase().endsWith(UNKLAB_EMAIL_DOMAIN)) {
      setError(`Gunakan email kampus dengan domain ${UNKLAB_EMAIL_DOMAIN}.`);
      return;
    }

    const data: RegisterData = {
      nama_depan: namaDepan,
      nama_belakang: namaBelakang,
      email: email.trim().toLowerCase(),
      password,
      nim,
      no_whatsapp: noWa,
      nomor_registrasi: nomorRegistrasi,
    };

    setIsSubmitting(true);
    try {
      await register(data);
      setRegisterSuccess("Registrasi berhasil! Silakan masuk.");
      // Geser ke panel Sign In
      setIsSignUp(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registrasi gagal";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setRegisterSuccess("");
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-brand-900 shadow-2xl">
      <div
        className="flex w-[200%] transition-transform duration-500 ease-in-out"
        style={{ transform: isSignUp ? "translateX(-50%)" : "translateX(0%)" }}
      >
        {/* ── Panel Sign In ── */}
        <div className="w-1/2 p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100/20">
              <svg
                className="h-7 w-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Masuk
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-brand-100/70">
              Masuk untuk mengakses Lost &amp; Found
            </p>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Kampus (@unklab.ac.id)"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />

            {!isSignUp && error && (
              <p className="text-center text-xs text-rose-300">{error}</p>
            )}
            {registerSuccess && (
              <p className="text-center text-xs text-emerald-300">
                {registerSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-full bg-white py-3.5 text-sm font-bold tracking-widest text-brand-900 transition-all hover:bg-brand-100 active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? "Memproses..." : "masuk"}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-brand-100/60">
            <p>
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-bold text-white outline-none transition-colors hover:text-brand-300"
              >
                Daftar
              </button>
            </p>
          </div>
        </div>

        {/* ── Panel Sign Up ── */}
        <div className="w-1/2 p-8 sm:p-10">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100/20">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Daftar
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-brand-100/70">
              Gunakan email @unklab.ac.id
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <input
              required
              type="text"
              value={namaDepan}
              onChange={(e) => setNamaDepan(e.target.value)}
              placeholder="Nama Depan"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              type="text"
              value={namaBelakang}
              onChange={(e) => setNamaBelakang(e.target.value)}
              placeholder="Nama Belakang"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Kampus"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="NIM"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              type="text"
              value={noWa}
              onChange={(e) => setNoWa(e.target.value)}
              placeholder="No. WhatsApp"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />
            <input
              type="text"
              value={nomorRegistrasi}
              onChange={(e) => setNomorRegistrasi(e.target.value)}
              placeholder="Nomor Registrasi (Regis)"
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white focus:bg-white/5"
            />

            {isSignUp && error && (
              <p className="text-center text-xs text-rose-300">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-white py-3.5 text-sm font-bold tracking-widest text-brand-900 transition-all hover:bg-brand-100 active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? "Mendaftarkan..." : "Daftar"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-brand-100/60">
            <p>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-bold text-white outline-none transition-colors hover:text-brand-300"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
