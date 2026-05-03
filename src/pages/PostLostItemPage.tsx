import { useNavigate } from "react-router-dom";

import { Container } from "../components/common/Container";
import { PageHeader } from "../components/common/PageHeader";
import {
  FormPostItem,
  type FormPostItemValues,
} from "../components/forms/FormPostItem";
import { PostTypeTabs } from "../components/items/PostTypeTabs";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { useItems } from "../hooks/useItems";

export default function PostLostItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useItems();

  const handleSubmit = async (values: FormPostItemValues) => {
    if (!user) {
      throw new Error("Sesi Anda tidak ditemukan. Silakan masuk ulang.");
    }

    await addItem({
      ...values,
      category: "lost",
      reportedByUserId: user.id,
      reporterName: user.profile.name || user.email,
      imageFile: values.imageFile,
    });

    navigate(ROUTES.lostItems, {
      state: { flash: "Barang hilang berhasil diposting." },
    });
  };

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Laporan"
        title="Post Barang Hilang"
        description="Isi informasi barang hilang dengan jelas agar komunitas UNKLAB lebih mudah membantu mencarinya."
      />
      <PostTypeTabs />
      <FormPostItem
        category="lost"
        submitLabel="Post barang hilang"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
