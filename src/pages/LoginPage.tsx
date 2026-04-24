import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_NAME, UNKLAB_EMAIL_DOMAIN } from '../constants/app';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('samuel.paat@unklab.ac.id');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim().toLowerCase().endsWith(UNKLAB_EMAIL_DOMAIN)) {
      setError(`Gunakan email kampus dengan domain ${UNKLAB_EMAIL_DOMAIN}.`);
      return;
    }

    login(email);
    setError('');
    navigate(ROUTES.account);
  };

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-soft sm:p-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
          Login UNKLAB
        </p>
        <h2 className="font-display text-3xl text-brand-900">{APP_NAME}</h2>
        <p className="text-sm leading-7 text-brand-700">
          Form ini masih mock login. Flow berikutnya diarahkan ke halaman akun
          agar profile bisa dilengkapi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">
            Email UNKLAB
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Placeholder login kampus"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
          />
        </label>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
