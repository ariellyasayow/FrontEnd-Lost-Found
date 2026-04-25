import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { PageHeader } from '../components/common/PageHeader';
import { ItemCard } from '../components/items/ItemCard';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useItems } from '../hooks/useItems';

export default function HomePage() {
  const { user } = useAuth();
  const { lostItems, foundItems } = useItems();
  const [searchQuery, setSearchQuery] = useState('');

  const spotlightItems = [...lostItems, ...foundItems];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredSpotlightItems = spotlightItems.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.location,
      item.contactName,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

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

      <section className="rounded-[1.75rem] border border-white/80 bg-white/88 p-3 shadow-soft">
        <label className="flex items-center gap-3 rounded-[1.2rem] bg-canvas/80 px-4 py-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-brand-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari barang berdasarkan nama, lokasi, atau deskripsi..."
            className="w-full bg-transparent text-sm text-brand-900 outline-none placeholder:text-brand-500"
          />
        </label>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-brand-900">
              Sorotan Laporan
            </h2>
            <p className="mt-1 text-sm text-brand-700">
              Laporan terbaru yang bisa langsung kamu jelajahi dari beranda.
            </p>
          </div>
          <Link
            to={ROUTES.lostItems}
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Lihat semua
          </Link>
        </div>

        {filteredSpotlightItems.length === 0 ? (
          <EmptyState
            title="Barang tidak ditemukan"
            description="Coba gunakan kata kunci lain dari nama barang, lokasi, atau deskripsi laporan."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSpotlightItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
