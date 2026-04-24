import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { PageHeader } from '../components/common/PageHeader';
import { ItemCard } from '../components/items/ItemCard';
import { ITEM_STATUS } from '../constants/itemStatus';
import { ROUTES } from '../constants/routes';
import { useItems } from '../hooks/useItems';

export default function MyItemsPage() {
  const { myItems, updateItemStatus } = useItems();

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Barang Saya"
        title="Kelola laporan milik sendiri"
        description="Halaman ini disiapkan untuk item yang dilaporkan oleh user aktif. Dari sini status barang hilang bisa diubah menjadi sudah ditemukan."
        action={
          <div className="flex gap-3">
            <Link
              to={ROUTES.postLostItem}
              className="rounded-full border border-brand-300 px-4 py-2 text-sm font-semibold text-brand-900"
            >
              Post Hilang
            </Link>
            <Link
              to={ROUTES.postFoundItem}
              className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Post Ditemukan
            </Link>
          </div>
        }
      />

      {myItems.length === 0 ? (
        <EmptyState
          title="Belum ada item milik Anda"
          description="Setelah user membuat posting baru, item akan langsung muncul di halaman ini."
        />
      ) : (
        <div className="space-y-6">
          {myItems.map((item) => {
            const canMarkAsFound =
              item.category === 'lost' && item.status === ITEM_STATUS.ACTIVE;

            return (
              <div
                key={item.id}
                className="grid gap-4 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-soft lg:grid-cols-[0.8fr_0.2fr]"
              >
                <ItemCard item={item} />

                <div className="space-y-3 rounded-2xl bg-brand-100/50 p-4">
                  <p className="text-sm font-semibold text-brand-900">
                    Aksi Cepat
                  </p>
                  <p className="text-sm leading-7 text-brand-700">
                    Hanya item hilang milik sendiri yang bisa diubah statusnya
                    menjadi sudah ditemukan.
                  </p>
                  {canMarkAsFound ? (
                    <button
                      type="button"
                      onClick={() =>
                        updateItemStatus(item.id, ITEM_STATUS.FOUND)
                      }
                      className="rounded-full bg-brand-900 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Tandai Sudah Ditemukan
                    </button>
                  ) : (
                    <p className="text-sm text-brand-500">
                      Tidak ada aksi tambahan untuk item ini.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
