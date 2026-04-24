import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { PageHeader } from '../components/common/PageHeader';
import { ItemCard } from '../components/items/ItemCard';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useItems } from '../hooks/useItems';

export default function HomePage() {
  const { user } = useAuth();
  const { lostItems, foundItems } = useItems();

  const spotlightItems = [...lostItems.slice(0, 1), ...foundItems.slice(0, 2)];

  return (
    <Container className="space-y-8">
      <PageHeader
        eyebrow="Beranda"
        title="Sistem sederhana untuk membantu barang kembali ke pemiliknya"
        description="Fondasi frontend ini menyiapkan alur user biasa: login, lengkapi profile, lihat laporan, buat posting baru, dan kelola barang milik sendiri."
        action={
          <Link
            to={ROUTES.account}
            className="rounded-full border border-brand-300 px-5 py-3 text-sm font-semibold text-brand-900 transition hover:border-brand-500"
          >
            {user?.isProfileComplete ? 'Lihat Akun' : 'Lengkapi Akun'}
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft">
          <p className="text-sm text-brand-500">Barang Hilang</p>
          <p className="mt-2 font-display text-4xl text-brand-900">
            {lostItems.length}
          </p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft">
          <p className="text-sm text-brand-500">Barang Ditemukan</p>
          <p className="mt-2 font-display text-4xl text-brand-900">
            {foundItems.length}
          </p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft">
          <p className="text-sm text-brand-500">Quick Actions</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              to={ROUTES.postLostItem}
              className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Post Hilang
            </Link>
            <Link
              to={ROUTES.postFoundItem}
              className="rounded-full border border-brand-300 px-4 py-2 text-sm font-semibold text-brand-900"
            >
              Post Ditemukan
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-brand-900">
            Sorotan Laporan
          </h2>
          <Link
            to={ROUTES.lostItems}
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Lihat semua
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {spotlightItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </Container>
  );
}
