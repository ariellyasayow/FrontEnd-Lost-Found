import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { PageHeader } from '../components/common/PageHeader';
import { ItemCard } from '../components/items/ItemCard';
import { ROUTES } from '../constants/routes';
import { useItems } from '../hooks/useItems';

export default function LostItemsPage() {
  const { lostItems } = useItems();

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Daftar"
        title="Barang Hilang"
        description="Halaman ini menyiapkan daftar barang hilang yang bisa dikembangkan dengan filter, pencarian, atau koneksi API di tahap berikutnya."
        action={
          <Link
            to={ROUTES.postLostItem}
            className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Post Barang Hilang
          </Link>
        }
      />

      {lostItems.length === 0 ? (
        <EmptyState
          title="Belum ada laporan barang hilang"
          description="Route dan kerangka list sudah siap. Data bisa dihubungkan ke sumber nyata nanti."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lostItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Container>
  );
}
