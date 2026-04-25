import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { PageHeader } from '../components/common/PageHeader';
import { ItemCard } from '../components/items/ItemCard';
import { ROUTES } from '../constants/routes';
import { useItems } from '../hooks/useItems';

export default function FoundItemsPage() {
  const { foundItems } = useItems();
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = foundItems.filter((item) => {
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
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Daftar"
        title="Barang Ditemukan"
        description="Lihat semua barang yang sudah ditemukan, telusuri lokasi singkatnya, lalu buka detail untuk menghubungi penghubung."
        action={
          <Link
            to={ROUTES.postFoundItem}
            className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Post Barang Ditemukan
          </Link>
        }
      />

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
            placeholder="Cari barang ditemukan berdasarkan nama, lokasi, atau deskripsi..."
            className="w-full bg-transparent text-sm text-brand-900 outline-none placeholder:text-brand-500"
          />
        </label>
      </section>

      {foundItems.length === 0 ? (
        <EmptyState
          title="Belum ada barang ditemukan"
          description="Setelah user membuat laporan temuan, item akan langsung muncul di halaman ini."
        />
      ) : filteredItems.length === 0 ? (
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
    </Container>
  );
}
