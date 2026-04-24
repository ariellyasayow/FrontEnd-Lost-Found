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

export default function PostFoundItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useItems();

  const handleSubmit = (values: FormPostItemValues) => {
    if (!user) {
      return;
    }

    const newItem = addItem({
      ...values,
      category: 'found',
      reportedByUserId: user.id,
      reporterName: user.profile.name || user.email,
    });

    navigate(buildItemDetailPath(newItem.id));
  };

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Post"
        title="Post Barang Ditemukan"
        description="Halaman post ditemukan dipisahkan dari barang hilang agar flow user tetap sederhana dan mudah dipahami."
      />

      <FormPostItem
        category="found"
        submitLabel="Simpan Barang Ditemukan"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
