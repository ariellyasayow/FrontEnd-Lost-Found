// src/pages/PostLostItemPage.tsx
import { useNavigate } from "react-router-dom";

import { Container } from "../components/common/Container";
import { PageHeader } from "../components/common/PageHeader";
import {
  FormPostItem,
  type FormPostItemValues,
} from "../components/forms/FormPostItem";
import { buildItemDetailPath, ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { useItems } from "../hooks/useItems";

export default function PostLostItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useItems();

  const handleSubmit = async (values: FormPostItemValues) => {
    if (!user) return;

    try {
      const newItem = await addItem({
        ...values,
        category: "lost",
        reportedByUserId: user.id,
        reporterName: user.profile.name || user.email,
        imageFile: values.imageFile,
      });
      navigate(buildItemDetailPath(newItem.id));
    } catch (err) {
      console.error("Gagal post barang hilang:", err);
      // Tetap navigasi ke home jika gagal
      navigate(ROUTES.home);
    }
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

// ─────────────────────────────────────────────────────────────────────────────
// src/pages/PostFoundItemPage.tsx
// (Simpan sebagai file terpisah di proyek Anda)
// ─────────────────────────────────────────────────────────────────────────────
// import { useNavigate } from 'react-router-dom';
// import { Container } from '../components/common/Container';
// import { PageHeader } from '../components/common/PageHeader';
// import { FormPostItem, type FormPostItemValues } from '../components/forms/FormPostItem';
// import { buildItemDetailPath, ROUTES } from '../constants/routes';
// import { useAuth } from '../hooks/useAuth';
// import { useItems } from '../hooks/useItems';
//
// export default function PostFoundItemPage() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addItem } = useItems();
//
//   const handleSubmit = async (values: FormPostItemValues) => {
//     if (!user) return;
//     try {
//       const newItem = await addItem({
//         ...values,
//         category: 'found',
//         reportedByUserId: user.id,
//         reporterName: user.profile.name || user.email,
//         imageFile: values.imageFile,
//       });
//       navigate(buildItemDetailPath(newItem.id));
//     } catch (err) {
//       console.error('Gagal post barang ditemukan:', err);
//       navigate(ROUTES.home);
//     }
//   };
//
//   return (
//     <Container className="space-y-6">
//       <PageHeader eyebrow="Post" title="Post Barang Ditemukan" description="..." />
//       <FormPostItem category="found" submitLabel="Simpan Barang Ditemukan" onSubmit={handleSubmit} />
//     </Container>
//   );
// }
