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

export default function PostFoundItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useItems();

  const handleSubmit = async (values: FormPostItemValues) => {
    if (!user) {
      throw new Error("Sesi Anda tidak ditemukan. Silakan masuk ulang.");
    }

    await addItem({
      ...values,
      category: "found",
      reportedByUserId: user.id,
      reporterName: user.profile.name || user.email,
      imageFile: values.imageFile,
    });

    navigate(ROUTES.foundItems, {
      state: { flash: "Barang ditemukan berhasil diposting." },
    });
  };

  return (
    <Container className="space-y-6">
      <PageHeader
        eyebrow="Laporan"
        title="Post Barang Ditemukan"
        description="Isi lokasi dan ciri barang yang ditemukan agar pemiliknya dapat mengenali laporan ini."
      />
      <PostTypeTabs />
      <FormPostItem
        category="found"
        submitLabel="Post barang ditemukan"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
