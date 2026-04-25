import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_NAME, UNKLAB_EMAIL_DOMAIN } from '../constants/app';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('ariellya@unklab.ac.id');
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
    <div className="mx-auto max-w-md w-full rounded-[2.5rem] border border-brand-100 bg-white p-8 shadow-soft sm:p-12">
      <div className="space-y-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500">
          Campus Authentication
        </p>
        <h2 className="font-display text-4xl text-brand-900">{APP_NAME}</h2>
        <p className="text-sm leading-relaxed text-brand-500">
          Masuk dengan akun UNKLAB untuk mulai mencari atau melaporkan barang.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
              Email UNKLAB
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              placeholder="nama@unklab.ac.id"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-brand-100 bg-canvas px-4 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </label>
        </div>

        {error ? (
          <div className="rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-600">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-xl bg-brand-700 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-900 active:scale-[0.98]"
        >
          Masuk ke Aplikasi
        </button>
      </form>
      
      <p className="mt-8 text-center text-[10px] leading-relaxed text-brand-300">
        Lost & Found UNKLAB &copy; 2026 <br/> Secure Student Environment
      </p>
    </div>
  );
}