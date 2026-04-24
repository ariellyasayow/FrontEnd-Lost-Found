import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { PageHeader } from '../components/common/PageHeader';
import { ItemCard } from '../components/items/ItemCard';
import { ROUTES } from '../constants/routes';
import { useItems } from '../hooks/useItems';

export default function FoundItemsPage() {
  const { foundItems } = useItems();

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Daftar"
        title="Barang Ditemukan"
        description="Halaman ini menampilkan daftar barang yang ditemukan lengkap dengan tanggal posting dan penghubung."
        action={
          <Link
            to={ROUTES.postFoundItem}
            className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Post Barang Ditemukan
          </Link>
        }
      />

      {foundItems.length === 0 ? (
        <EmptyState
          title="Belum ada barang ditemukan"
          description="Skeleton route sudah siap. Nanti data bisa dihubungkan ke API atau penyimpanan lokal."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {foundItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Container>
  );
}
