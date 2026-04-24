import { useNavigate } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { PageHeader } from '../components/common/PageHeader';
import {
  FormPostItem,
  type FormPostItemValues,
} from '../components/forms/FormPostItem';
import { buildItemDetailPath } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useItems } from '../hooks/useItems';

export default function PostLostItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useItems();

  const handleSubmit = (values: FormPostItemValues) => {
    if (!user) {
      return;
    }

    const newItem = addItem({
      ...values,
      category: 'lost',
      reportedByUserId: user.id,
      reporterName: user.profile.name || user.email,
    });

    navigate(buildItemDetailPath(newItem.id));
  };

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Post"
        title="Post Barang Hilang"
        description="Form dasar sudah dipisahkan dari post barang ditemukan dan siap dikembangkan tanpa logika backend."
      />

      <FormPostItem
        category="lost"
        submitLabel="Simpan Barang Hilang"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
