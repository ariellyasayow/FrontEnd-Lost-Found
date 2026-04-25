import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { Container } from '../components/common/Container';
import { useAuth } from '../hooks/useAuth';
import type { UserProfile } from '../types';

const emptyProfile: UserProfile = {
  name: '',
  email: '',
  regis: '',
  whatsapp: '',
};

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const [formValues, setFormValues] = useState<UserProfile>(
    user?.profile ?? emptyProfile,
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormValues(user?.profile ?? emptyProfile);
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(formValues);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container className="flex justify-center py-10 sm:py-16">
      <div className="w-full max-w-4xl relative">
        
        {/* Dekorasi Background Glow agar "Menarik" dan tidak terlalu sepi */}
        <div className="absolute -inset-1 rounded-[3rem] bg-campus-fade blur-2xl opacity-60 -z-10"></div>

        {/* Card Utama */}
        <div className="rounded-[2rem] border border-white/70 bg-white shadow-soft">
          
          {/* Header Card */}
          <div className="border-b border-brand-100/60 px-8 py-8 sm:px-12">
            <h1 className="font-display text-3xl font-bold text-brand-900">
              Pengaturan Akun
            </h1>
            <p className="mt-2 text-sm text-brand-500">
              Kelola informasi profil dan kontak Anda untuk keperluan Lost & Found.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-10 sm:px-12">
            <div className="flex flex-col-reverse gap-12 md:flex-row md:items-start md:justify-between">
              
              {/* Kiri: Area Form Input */}
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
                    placeholder="Contoh: 10502xxxx"
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
                    Email ini terikat dengan login UNKLAB Anda dan tidak dapat diubah.
                  </p>
                </label>
              </div>

              {/* Kanan: Area Avatar (Meniru kotak foto di referensi) */}
              <div className="flex shrink-0 flex-col items-center gap-4 md:w-64">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-brand-100/40 shadow-inner">
                  <span className="font-display text-6xl text-brand-700">
                    {formValues.name.charAt(0).toUpperCase() || '?'}
                  </span>
                  
                  {/* Indikator Status Profil Mengambang */}
                  <div className={`absolute -bottom-3 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-md ${
                    user?.isProfileComplete 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {user?.isProfileComplete ? 'Profil Lengkap' : 'Belum Lengkap'}
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-display text-lg text-brand-900 truncate w-48">
                    {formValues.name || 'User UNKLAB'}
                  </p>
                  <p className="text-xs text-brand-500">Mahasiswa</p>
                </div>
              </div>
            </div>

            {/* Area Bawah: Aksi Save & Logout */}
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
                <button
                  type="submit"
                  className="rounded-xl bg-brand-900 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </Container>
  );
}