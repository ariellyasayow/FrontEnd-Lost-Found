import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { Container } from '../components/common/Container';
import { PageHeader } from '../components/common/PageHeader';
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
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
  };

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Akun"
        title="Lengkapi Profile"
        description="Field yang disiapkan mengikuti kebutuhan dasar aplikasi: nama, email UNKLAB, regis, dan WhatsApp."
        action={
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-brand-300 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:border-brand-500"
          >
            Logout
          </button>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-soft md:grid-cols-2"
      >
        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">Nama</span>
          <input
            required
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">
            Email UNKLAB
          </span>
          <input
            required
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">Regis</span>
          <input
            required
            name="regis"
            value={formValues.regis}
            onChange={handleChange}
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">WhatsApp</span>
          <input
            required
            name="whatsapp"
            value={formValues.whatsapp}
            onChange={handleChange}
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
          />
        </label>

        <div className="md:col-span-2 flex items-center justify-between gap-3">
          <p className="text-sm text-brand-500">
            Status profile:{' '}
            {user?.isProfileComplete ? 'sudah lengkap' : 'belum lengkap'}
          </p>
          <button
            type="submit"
            className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Simpan Perubahan
          </button>
        </div>

        {saved ? (
          <p className="md:col-span-2 text-sm text-emerald-700">
            Profile mock berhasil diperbarui.
          </p>
        ) : null}
      </form>
    </Container>
  );
}
