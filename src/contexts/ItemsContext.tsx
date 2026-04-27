// src/contexts/ItemsContext.tsx
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";

import { ITEM_STATUS } from "../constants/itemStatus";
import { useAuth } from "../hooks/useAuth";
import { itemsApi, tokenStorage } from "../services/api";
import type { CreateItemInput, Item, ItemStatus } from "../types";

type ItemsContextValue = {
  items: Item[];
  lostItems: Item[];
  foundItems: Item[];
  myItems: Item[];
  isLoadingItems: boolean;
  getItemById: (id: string) => Item | undefined;
  addItem: (input: CreateItemInput & { imageFile?: File }) => Promise<Item>;
  updateItemStatus: (id: string, status: ItemStatus) => Promise<void>;
  refreshItems: () => Promise<void>;
};

export const ItemsContext = createContext<ItemsContextValue | undefined>(
  undefined,
);

// ── Mapping status dari backend ke frontend ────────────────────────────────
// Backend:  'hilang' | 'ditemukan' | 'selesai'
// Frontend: 'active' | 'found'     | 'returned'
function mapStatus(beStatus: string): ItemStatus {
  if (beStatus === "ditemukan") return ITEM_STATUS.FOUND;
  if (beStatus === "selesai") return ITEM_STATUS.RETURNED;
  return ITEM_STATUS.ACTIVE; // 'hilang' → active
}

function mapStatusToBackend(feStatus: ItemStatus): string {
  if (feStatus === ITEM_STATUS.FOUND) return "ditemukan";
  if (feStatus === ITEM_STATUS.RETURNED) return "selesai";
  return "hilang";
}

// ── Mapping data barang dari API ke tipe Item frontend ─────────────────────
function mapApiItemToItem(b: import("../services/api").BarangFromAPI): Item {
  // Foto dari backend adalah path relatif, jadikan URL ke backend
  const imageUrl = b.foto
    ? `http://localhost:8081/${b.foto.replace(/\\/g, "/")}`
    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80";

  // Backend belum return category secara eksplisit di /api/products,
  // kita derive dari field status
  const category: "lost" | "found" = b.status === "hilang" ? "lost" : "found";

  return {
    id: String(b.id),
    title: b.nama_barang,
    description: b.deskripsi,
    category,
    status: mapStatus(b.status),
    imageUrl,
    location: b.lokasi,
    postedAt: b.tanggal_laporan,
    // Backend belum return user info di list → pakai placeholder
    reportedByUserId: "",
    reporterName: "",
    contactName: "",
    contactWhatsApp: "",
  };
}

export function ItemsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const { user } = useAuth();

  // ── Fetch semua barang dari backend ─────────────────────────────────────
  const refreshItems = useCallback(async () => {
    setIsLoadingItems(true);
    try {
      const res = await itemsApi.getAll();
      const mapped = (res.data ?? []).map(mapApiItemToItem);
      setItems(mapped);
    } catch (err) {
      console.error("Gagal fetch barang:", err);
    } finally {
      setIsLoadingItems(false);
    }
  }, []);

  // Fetch saat pertama kali ada user (sudah login)
  useEffect(() => {
    if (tokenStorage.get()) {
      refreshItems();
    }
  }, [refreshItems]);

  const lostItems = items.filter((item) => item.category === "lost");
  const foundItems = items.filter((item) => item.category === "found");
  // myItems: cocokkan berdasarkan user.id (setelah BE return user_id di list, bisa dipakai)
  const myItems = user
    ? items.filter(
        (item) =>
          item.reportedByUserId === user.id || item.reportedByUserId === "",
      )
    : [];

  const getItemById = (id: string) => items.find((item) => item.id === id);

  // ── Add item (POST ke backend dengan FormData) ───────────────────────────
  const addItem = async (
    input: CreateItemInput & { imageFile?: File },
  ): Promise<Item> => {
    const formData = new FormData();
    formData.append("nama_barang", input.title);
    formData.append("deskripsi", input.description);
    formData.append("lokasi", input.location);
    formData.append(
      "tanggal_laporan",
      new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    );
    formData.append("kategori_id", "1"); // default, bisa diubah nanti

    if (input.imageFile) {
      formData.append("foto", input.imageFile);
    }

    if (input.category === "lost") {
      await itemsApi.postHilang(formData);
    } else {
      await itemsApi.postDitemukan(formData);
    }

    // Refresh list agar data terbaru tampil
    await refreshItems();

    // Kembalikan item sementara (optimistic) untuk navigasi ke detail
    const optimisticItem: Item = {
      id: `temp-${Date.now()}`,
      title: input.title,
      description: input.description,
      category: input.category,
      status: ITEM_STATUS.ACTIVE,
      imageUrl:
        input.imageUrl ??
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      location: input.location,
      postedAt: new Date().toISOString(),
      reportedByUserId: input.reportedByUserId,
      reporterName: input.reporterName,
      contactName: input.contactName,
      contactWhatsApp: input.contactWhatsApp,
    };

    return optimisticItem;
  };

  // ── Update status barang ─────────────────────────────────────────────────
  const updateItemStatus = async (id: string, status: ItemStatus) => {
    // Update optimistis di UI dulu
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    try {
      await itemsApi.updateStatus(Number(id), mapStatusToBackend(status));
    } catch (err) {
      console.error("Gagal update status:", err);
      // Rollback: refresh dari server
      await refreshItems();
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        lostItems,
        foundItems,
        myItems,
        isLoadingItems,
        getItemById,
        addItem,
        updateItemStatus,
        refreshItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
