// src/contexts/ItemsContext.tsx
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";

import { ITEM_STATUS } from "../constants/itemStatus";
import { inferReportItemCategory } from "../constants/reportCategory";
import { useAuth } from "../hooks/useAuth";
import { itemsApi, tokenStorage } from "../services/api";
import type { CreateItemInput, Item, ItemStatus } from "../types";
import {
  getRememberedReportItemCategory,
  rememberReportItemCategory,
} from "../utils/reportCategoryStorage";

type ItemsContextValue = {
  items: Item[];
  lostItems: Item[];
  foundItems: Item[];
  myItems: Item[];
  isLoadingItems: boolean;
  isLoadingMyItems: boolean;
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
  // Foto dari backend adalah path relatif, jadikan URL langsung ke static file
  // Backend sekarang serve folder uploads/ via /uploads/namafile
  const fotoPath = b.foto ? b.foto.replace(/\\/g, "/") : "";
  const imageUrl = fotoPath
    ? `http://localhost:8081/${fotoPath}`
    : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80";

  const category: "lost" | "found" = b.status === "hilang" ? "lost" : "found";
  const itemType =
    getRememberedReportItemCategory({
      title: b.nama_barang,
      description: b.deskripsi,
      location: b.lokasi,
    }) ??
    inferReportItemCategory({
      title: b.nama_barang,
      description: b.deskripsi,
    });

  return {
    id: String(b.id),
    title: b.nama_barang,
    description: b.deskripsi,
    category,
    itemType,
    status: mapStatus(b.status),
    imageUrl,
    location: b.lokasi,
    postedAt: b.tanggal_laporan,
    // Simpan user_id dari backend ke reportedByUserId untuk filter myItems
    reportedByUserId: String(b.user_id),
    reporterName: "",
    contactName: "",
    contactWhatsApp: "",
  };
}

export function ItemsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>([]);
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isLoadingMyItems, setIsLoadingMyItems] = useState(false);
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

  // ── Fetch barang milik user yang login ──────────────────────────────────
  const refreshMyItems = useCallback(async () => {
    if (!tokenStorage.get()) return;
    setIsLoadingMyItems(true);
    try {
      const res = await itemsApi.getMyItems();
      const mapped = (res.data ?? []).map(mapApiItemToItem);
      setMyItems(mapped);
    } catch (err) {
      console.error("Gagal fetch my items:", err);
    } finally {
      setIsLoadingMyItems(false);
    }
  }, []);

  // Fetch saat pertama kali ada token (sudah login)
  useEffect(() => {
    if (tokenStorage.get()) {
      refreshItems();
      refreshMyItems();
    }
  }, [refreshItems, refreshMyItems]);

  const lostItems = items.filter((item) => item.category === "lost");
  const foundItems = items.filter((item) => item.category === "found");
  // myItems sekarang diambil dari endpoint /api/my-items yang sudah filter by user_id di backend

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

    rememberReportItemCategory({
      title: input.title,
      description: input.description,
      location: input.location,
      itemType: input.itemType,
    });

    // Refresh list agar data terbaru tampil
    await refreshItems();
    await refreshMyItems();

    // Kembalikan item sementara (optimistic) untuk navigasi ke detail
    const optimisticItem: Item = {
      id: `temp-${Date.now()}`,
      title: input.title,
      description: input.description,
      category: input.category,
      itemType: input.itemType,
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
    setMyItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    try {
      await itemsApi.updateStatus(Number(id), mapStatusToBackend(status));
    } catch (err) {
      console.error("Gagal update status:", err);
      // Rollback: refresh dari server
      await refreshItems();
      await refreshMyItems();
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
        isLoadingMyItems,
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
