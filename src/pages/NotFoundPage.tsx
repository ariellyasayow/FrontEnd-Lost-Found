import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <Container className="flex min-h-screen items-center justify-center py-10">
      <div className="max-w-xl rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl text-brand-900">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-sm leading-7 text-brand-700">
          Route fallback sudah aktif. Kamu bisa kembali ke halaman utama aplikasi
          atau ke halaman login sesuai status user.
        </p>
        <Link
          to={isAuthenticated ? ROUTES.home : ROUTES.login}
          className="mt-6 inline-flex rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white"
        >
          {isAuthenticated ? 'Kembali ke Beranda' : 'Ke Login'}
        </Link>
      </div>
    </Container>
  );
}
