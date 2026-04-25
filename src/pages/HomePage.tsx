import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { ItemCard } from '../components/items/ItemCard';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useItems } from '../hooks/useItems';

export default function HomePage() {
  const { user } = useAuth();
  const { lostItems, foundItems } = useItems();
  const [searchQuery, setSearchQuery] = useState('');

  const recentItems = [...lostItems, ...foundItems].sort(
    (left, right) =>
      new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime(),
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = recentItems.filter((item) => {
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
      <section className="rounded-[2.1rem] border border-white/80 bg-white/60 px-5 py-7 shadow-soft backdrop-blur sm:px-7 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="space-y-5">
            <h1 className="mx-auto max-w-3xl font-display text-3xl leading-[1.12] text-brand-900 sm:text-4xl sm:leading-[1.1] lg:text-[3.35rem] lg:leading-[1.08]">
              Recover what&apos;s yours. Return what isn&apos;t.
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-brand-700 sm:text-base">
              Ruang sederhana bagi komunitas UNKLAB untuk melaporkan barang
              hilang, membagikan barang ditemukan, dan membantu barang kembali
              ke pemiliknya.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={ROUTES.postLostItem}
              className="inline-flex min-h-[3.5rem] min-w-[13.5rem] items-center justify-center rounded-[1.15rem] bg-brand-700 px-6 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-900 sm:text-base"
            >
              Laporkan Barang Hilang
            </Link>
            <Link
              to={ROUTES.postFoundItem}
              className="inline-flex min-h-[3.5rem] min-w-[13.5rem] items-center justify-center rounded-[1.15rem] border border-brand-300 bg-brand-100/35 px-6 text-sm font-semibold text-brand-900 transition hover:border-brand-500 hover:bg-brand-100/55 sm:text-base"
            >
              Laporkan Barang Ditemukan
            </Link>
          </div>

          <div className="grid gap-3 text-left md:grid-cols-3">
            <div className="rounded-[1.35rem] bg-white/82 p-4 shadow-soft">
              <p className="text-sm text-brand-500">Barang Hilang</p>
              <p className="mt-2 font-display text-4xl text-brand-900">
                {lostItems.length}
              </p>
            </div>
            <div className="rounded-[1.35rem] bg-white/82 p-4 shadow-soft">
              <p className="text-sm text-brand-500">Barang Ditemukan</p>
              <p className="mt-2 font-display text-4xl text-brand-900">
                {foundItems.length}
              </p>
            </div>
            <div className="rounded-[1.35rem] bg-white/82 p-4 shadow-soft">
              <p className="text-sm text-brand-500">Akun</p>
              <p className="mt-2 text-base font-semibold text-brand-900">
                {user?.isProfileComplete
                  ? 'Profil siap dipakai'
                  : 'Lengkapi akun dulu'}
              </p>
              <Link
                to={ROUTES.account}
                className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                {user?.isProfileComplete ? 'Buka Akun' : 'Lengkapi Sekarang'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="rounded-[1.55rem] border border-white/80 bg-white/92 p-2.5 shadow-soft">
          <label className="flex flex-col gap-3 rounded-[1.15rem] bg-white px-4 py-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-brand-500"
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
                placeholder="Cari kunci, elektronik, kartu identitas, atau barang lainnya..."
                className="w-full bg-transparent text-sm text-brand-900 outline-none placeholder:text-brand-500"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-brand-700">
              <span className="rounded-full bg-brand-100/70 px-3.5 py-2">
                UNKLAB Campus
              </span>
              <span className="rounded-full border border-brand-100 px-3.5 py-2">
                Cari
              </span>
            </div>
          </label>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-brand-900">
              Laporan Terbaru
            </h2>
            <p className="mt-1 text-sm text-brand-700">
              Laporan terbaru yang bisa langsung kamu jelajahi dari beranda.
            </p>
          </div>

          <Link
            to={ROUTES.foundItems}
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Lihat Semua Aktivitas
          </Link>
        </div>

        {filteredItems.length === 0 ? (
          <EmptyState
            title="Barang tidak ditemukan"
            description="Coba gunakan kata kunci lain dari nama barang, lokasi, atau deskripsi laporan."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
