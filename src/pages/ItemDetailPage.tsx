import { Link, useParams } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { ITEM_CATEGORY_LABELS } from '../constants/itemCategory';
import { ROUTES } from '../constants/routes';
import { useItems } from '../hooks/useItems';
import { formatDate } from '../utils/formatDate';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function ItemDetailPage() {
  const { id = '' } = useParams();
  const { getItemById } = useItems();
  const item = getItemById(id);

  if (!item) {
    return (
      <Container className="space-y-6">
        <EmptyState
          title="Item tidak ditemukan"
          description="Detail barang belum bisa dibuka karena data item ini tidak ada."
          action={
            <Link
              to={ROUTES.home}
              className="inline-flex rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Kembali ke Beranda
            </Link>
          }
        />
      </Container>
    );
  }

  const backRoute =
    item.category === 'found' ? ROUTES.foundItems : ROUTES.lostItems;
  const categoryLabel =
    item.category === 'found' ? 'Verified Found' : 'Lost Report';

  return (
    <Container className="space-y-6">
      <Link
        to={backRoute}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-900"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Kembali ke daftar</span>
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <article className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 p-3 shadow-soft">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-100/35">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-[28rem] w-full object-cover lg:h-[35rem]"
            />

            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
                {categoryLabel}
              </span>
            </div>
          </div>
        </article>

        <aside className="space-y-5 lg:pt-4">
          <div className="space-y-4">
            <h1 className="max-w-lg font-display text-4xl leading-tight text-brand-900">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-brand-500">
              <span className="rounded-full bg-brand-100/60 px-4 py-2">
                {ITEM_CATEGORY_LABELS[item.category]}
              </span>
              <span>REF: #{item.id.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white/88 px-5 py-4 shadow-soft">
            <span className="text-sm text-brand-700">
              Diposting pada {formatDate(item.postedAt)}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
              Deskripsi
            </p>
            <p className="max-w-lg text-base leading-8 text-brand-700">
              {item.description}
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-brand-100/80 bg-white/92 p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-100/70 text-brand-700">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-semibold text-brand-900">
                  {item.location}
                </p>
                <p className="text-sm leading-7 text-brand-500">
                  Penghubung: {item.contactName}
                </p>
              </div>
            </div>
          </div>

          <a
            href={createWhatsAppLink(
              item.contactWhatsApp,
              `Halo ${item.contactName}, saya ingin menanyakan tentang ${item.title}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Contact via WhatsApp
          </a>

          <p className="max-w-md text-center text-sm leading-7 text-brand-500 lg:text-left">
            Silakan hubungi penghubung untuk konfirmasi detail barang sebelum
            bertemu.
          </p>
        </aside>
      </section>
    </Container>
  );
}
