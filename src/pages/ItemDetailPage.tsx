import { Link, useParams } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { PageHeader } from '../components/common/PageHeader';
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
        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-soft">
          <h1 className="font-display text-3xl text-brand-900">
            Item tidak ditemukan
          </h1>
          <p className="mt-3 text-sm leading-7 text-brand-700">
            Route detail sudah aktif, tetapi item dengan ID tersebut belum ada
            di mock data.
          </p>
          <Link
            to={ROUTES.home}
            className="mt-5 inline-flex rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white"
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
    <Container className="space-y-6">
      <PageHeader
        eyebrow={ITEM_CATEGORY_LABELS[item.category]}
        title={item.title}
        description="Detail item disiapkan untuk menampilkan informasi inti, kontak penghubung, dan aksi sederhana milik pelapor."
        action={<StatusBadge status={item.status} />}
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-soft">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-80 w-full object-cover"
          />
          <div className="space-y-4 p-6">
            <div className="grid gap-3 text-sm leading-7 text-brand-700 sm:grid-cols-2">
              <p>
                <span className="font-semibold text-brand-900">Lokasi:</span>{' '}
                {item.location}
              </p>
              <p>
                <span className="font-semibold text-brand-900">
                  Tanggal posting:
                </span>{' '}
                {formatDate(item.postedAt)}
              </p>
              <p>
                <span className="font-semibold text-brand-900">Pelapor:</span>{' '}
                {item.reporterName}
              </p>
              <p>
                <span className="font-semibold text-brand-900">
                  Penghubung:
                </span>{' '}
                {item.contactName}
              </p>
            </div>

            <p className="text-sm leading-8 text-brand-700">{item.description}</p>
          </div>
        </article>

        <aside className="space-y-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-soft">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand-500">
              Kontak WhatsApp
            </p>
            <a
              href={createWhatsAppLink(
                item.contactWhatsApp,
                `Halo ${item.contactName}, saya ingin menanyakan tentang ${item.title}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Hubungi via WhatsApp
            </a>
          </div>

          {canMarkAsFound ? (
            <div className="space-y-3 rounded-2xl bg-brand-100/60 p-4">
              <p className="text-sm font-semibold text-brand-900">
                Aksi Pelapor
              </p>
              <p className="text-sm leading-7 text-brand-700">
                Karena ini item milik Anda, status barang hilang bisa diubah
                menjadi sudah ditemukan dari halaman detail ini.
              </p>
              <button
                type="button"
                onClick={() => updateItemStatus(item.id, ITEM_STATUS.FOUND)}
                className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Tandai Sudah Ditemukan
              </button>
            </div>
          ) : null}

          <div className="space-y-2 text-sm leading-7 text-brand-700">
            <p>Route update status juga disiapkan dari halaman Barang Saya.</p>
            <p>Belum ada backend, jadi perubahan status masih memakai context.</p>
          </div>
        </aside>
      </section>
    </Container>
  );
}
