// src/pages/AccountPage.tsx
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { Container } from "../components/common/Container";
import { useAuth } from "../hooks/useAuth";
import { authApi } from "../services/api";
import type { UserProfile } from "../types";

const emptyProfile: UserProfile = {
  name: "",
  email: "",
  regis: "",
  whatsapp: "",
};

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const [formValues, setFormValues] = useState<UserProfile>(
    user?.profile ?? emptyProfile,
  );
  const [saved, setSaved] = useState(false);

  // State untuk Change Password
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    setFormValues(user?.profile ?? emptyProfile);
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setSaved(false);
  };

  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      await updateProfile(formValues);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Gagal menyimpan perubahan";
      setSaveError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (newPassword !== confirmPassword) {
      setPwError("Password baru dan konfirmasi tidak cocok.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password baru minimal 6 karakter.");
      return;
    }

    setPwLoading(true);
    try {
      const res = await authApi.changePassword(oldPassword, newPassword);
      setPwSuccess(res.message || "Password berhasil diubah!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowChangePassword(false);
        setPwSuccess("");
      }, 2500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Gagal mengubah password";
      setPwError(msg);
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <Container className="flex justify-center py-10 sm:py-16">
      <div className="w-full max-w-4xl relative">
        <div className="absolute -inset-1 rounded-[3rem] bg-campus-fade blur-2xl opacity-60 -z-10"></div>

        <div className="rounded-[2rem] border border-white/70 bg-white shadow-soft">
          {/* Header */}
          <div className="border-b border-brand-100/60 px-8 py-8 sm:px-12">
            <h1 className="font-display text-3xl font-bold text-brand-900">
              Pengaturan Akun
            </h1>
            <p className="mt-2 text-sm text-brand-500">
              Kelola informasi profil dan kontak Anda untuk keperluan Lost &
              Found.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-10 sm:px-12">
            <div className="flex flex-col-reverse gap-12 md:flex-row md:items-start md:justify-between">
              {/* Kiri: Form */}
              <div className="flex-1 space-y-6">
                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                    Nama Lengkap
                  </span>
                  <input
                    required
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Nama sesuai identitas"
                    className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3 text-sm font-medium text-brand-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                    Nomor Registrasi (Regis)
                  </span>
                  <input
                    required
                    name="regis"
                    value={formValues.regis}
                    onChange={handleChange}
                    placeholder="Contoh: S22310xxx"
                    className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3 text-sm font-medium text-brand-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                    WhatsApp (Aktif)
                  </span>
                  <input
                    required
                    name="whatsapp"
                    value={formValues.whatsapp}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3 text-sm font-medium text-brand-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                    Email Kampus (Read-only)
                  </span>
                  <input
                    readOnly
                    name="email"
                    type="email"
                    value={formValues.email}
                    className="w-full cursor-not-allowed rounded-xl border border-transparent bg-brand-100/30 px-4 py-3 text-sm font-medium text-brand-500 outline-none"
                  />
                  <p className="text-xs text-brand-300 mt-1">
                    Email ini terikat dengan login UNKLAB Anda dan tidak dapat
                    diubah.
                  </p>
                </label>
              </div>

              {/* Kanan: Avatar */}
              <div className="flex shrink-0 flex-col items-center gap-4 md:w-64">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-brand-100/40 shadow-inner">
                  <span className="font-display text-6xl text-brand-700">
                    {formValues.name.charAt(0).toUpperCase() || "?"}
                  </span>
                  <div
                    className={`absolute -bottom-3 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-md ${
                      user?.isProfileComplete
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {user?.isProfileComplete
                      ? "Profil Lengkap"
                      : "Belum Lengkap"}
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-display text-lg text-brand-900 truncate w-48">
                    {formValues.name || "Pengguna UNKLAB"}
                  </p>
                  <p className="text-xs text-brand-500">Mahasiswa</p>
                </div>
              </div>
            </div>

            {/* Aksi */}
            <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-brand-100/60 pt-8 sm:flex-row">
              <button
                type="button"
                onClick={logout}
                className="text-sm font-bold tracking-wide text-brand-500 transition-colors hover:text-rose-600"
              >
                Logout / Keluar
              </button>

              <div className="flex items-center gap-4">
                {saved && (
                  <span className="animate-pulse text-sm font-bold text-brand-500">
                    Tersimpan!
                  </span>
                )}
                {saveError && (
                  <span className="text-sm font-bold text-rose-500">
                    {saveError}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-brand-900 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </form>

          {/* ── Change Password Section ─────────────────────────── */}
          <div className="border-t border-brand-100/60 px-8 py-8 sm:px-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-brand-900">
                  Ubah Password
                </h2>
                <p className="mt-1 text-sm text-brand-500">
                  Ganti password akun UNKLAB Anda.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowChangePassword(!showChangePassword);
                  setPwError("");
                  setPwSuccess("");
                }}
                className="rounded-xl border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-900 transition-all hover:bg-brand-100"
              >
                {showChangePassword ? "Batal" : "Ubah Password"}
              </button>
            </div>

            {showChangePassword && (
              <form
                onSubmit={handleChangePassword}
                className="mt-6 space-y-4 max-w-md"
              >
                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                    Password Lama
                  </span>
                  <input
                    required
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan password saat ini"
                    className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3 text-sm font-medium text-brand-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                    Password Baru
                  </span>
                  <input
                    required
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3 text-sm font-medium text-brand-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                    Konfirmasi Password Baru
                  </span>
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3 text-sm font-medium text-brand-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </label>

                {pwError && (
                  <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 border border-rose-200">
                    {pwError}
                  </p>
                )}
                {pwSuccess && (
                  <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600 border border-emerald-200">
                    {pwSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pwLoading}
                  className="rounded-xl bg-brand-900 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:bg-brand-700 active:scale-95 disabled:opacity-60"
                >
                  {pwLoading ? "Menyimpan..." : "Simpan Password Baru"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
