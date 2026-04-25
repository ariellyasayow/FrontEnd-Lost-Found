import { Link, useParams } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { StatusBadge } from '../components/common/StatusBadge';
import { ITEM_CATEGORY_LABELS } from '../constants/itemCategory';
import { ITEM_STATUS } from '../constants/itemStatus';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useItems } from '../hooks/useItems';
import { formatDate } from '../utils/formatDate';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function ItemDetailPage() {
  const { id = '' } = useParams();
  const { user } = useAuth();
  const { getItemById, updateItemStatus } = useItems();
  const item = getItemById(id);

  if (!item) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center rounded-[2rem] bg-white p-16 text-center shadow-soft">
          <svg className="mb-4 h-16 w-16 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="font-display text-3xl text-brand-900">
            Barang Tidak Ditemukan
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-500">
            Barang yang Anda cari mungkin sudah dihapus atau URL yang Anda masukkan salah.
          </p>
          <Link
            to={ROUTES.home}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-900"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </Container>
    );
  }

  const isOwner = user?.id === item.reportedByUserId;
  const canMarkAsFound =
    isOwner &&
    item.category === 'lost' &&
    item.status === ITEM_STATUS.ACTIVE;

  return (
    <Container className="space-y-8 pb-12 pt-6">
      {/* Tombol Back */}
      <Link 
        to={-1 as any} // Navigasi kembali ke halaman sebelumnya
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </Link>

      <section className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Kolom Kiri: Foto Utama */}
        <article className="relative overflow-hidden rounded-[2.5rem] bg-brand-100/30 shadow-soft">
          <div className="absolute left-6 top-6 z-10">
             <StatusBadge status={item.status} />
          </div>
          {/* Gambar placeholder jika imageUrl kosong, pastikan item.imageUrl mengarah ke gambar nyata di mock */}
          <img
            src={item.imageUrl || 'https://via.placeholder.com/600x800?text=No+Image'}
            alt={item.title}
            className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:aspect-auto lg:h-[600px]"
          />
        </article>

        {/* Kolom Kanan: Detail Informasi */}
        <aside className="flex flex-col space-y-8">
          <div className="space-y-4">
            {/* Header Info */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
                {ITEM_CATEGORY_LABELS[item.category]} • ID: #{item.id.slice(0, 6)}
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight text-brand-900 sm:text-5xl">
                {item.title}
              </h1>
            </div>

            <p className="text-sm font-medium text-brand-700">
              Dilaporkan pada {formatDate(item.postedAt)}
            </p>
          </div>

          <div className="h-px w-full bg-brand-100" /> {/* Divider */}

          {/* Deskripsi */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-500">Deskripsi</h3>
            <p className="text-base leading-relaxed text-brand-900">
              {item.description}
            </p>
          </div>

          {/* Kotak Info Lokasi & Kontak */}
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100/50 text-brand-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-brand-900">Lokasi</p>
                <p className="text-sm text-brand-700">{item.location}</p>
              </div>
            </div>
            
            <div className="my-4 h-px w-full bg-brand-100/50" />
            
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100/50 text-brand-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-brand-900">
                  {item.category === 'found' ? 'Penemu / Penghubung' : 'Pelapor / Pemilik'}
                </p>
                <p className="text-sm text-brand-700">{item.contactName}</p>
              </div>
            </div>
          </div>

          {/* Area Tombol Aksi */}
          <div className="flex flex-col gap-3 pt-4">
            {/* Tombol Utama: WhatsApp */}
            <a
              href={createWhatsAppLink(
                item.contactWhatsApp,
                `Halo ${item.contactName}, saya melihat postingan Anda di Lost & Found UNKLAB mengenai ${item.title}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-4 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hubungi via WhatsApp
            </a>

            {/* Aksi Spesifik Owner (Mark as Found) */}
            {canMarkAsFound && (
              <button
                type="button"
                onClick={() => updateItemStatus(item.id, ITEM_STATUS.FOUND)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-900 bg-transparent py-3.5 text-sm font-semibold text-brand-900 transition-all hover:bg-brand-900 hover:text-white active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tandai Sudah Ditemukan
              </button>
            )}
            
            {canMarkAsFound && (
              <p className="mt-1 text-center text-xs text-brand-500">
                Hanya Anda yang bisa melihat tombol ini karena ini laporan Anda.
              </p>
            )}
          </div>
        </aside>
      </section>
    </Container>
  );
}