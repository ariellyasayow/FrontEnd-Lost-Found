// src/data/mockItems.ts
import { ITEM_STATUS } from "../constants/itemStatus";
import type { Item } from "../types";

export const mockItems: Item[] = [
  {
    id: "item-001",
    title: "Dompet Hitam Kulit",
    description:
      "Dompet hitam berisi kartu identitas dan beberapa kartu bank. Terakhir terlihat dekat Gedung Administrasi.",
    category: "lost",
    status: ITEM_STATUS.ACTIVE,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    location: "Gedung Administrasi",
    postedAt: "2026-04-21T09:15:00.000Z",
    reportedByUserId: "user-demo-unklab",
    reporterName: "Samuel Paat",
    contactName: "Samuel Paat",
    contactWhatsApp: "081234567890",
  },
  {
    id: "item-002",
    title: "Tumbler Stainless Biru",
    description:
      "Botol minum berwarna biru navy dengan stiker UNKLAB. Ditemukan setelah kelas pagi selesai.",
    category: "found",
    status: ITEM_STATUS.ACTIVE,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    location: "Lobby Pioneer Chapel",
    postedAt: "2026-04-22T03:40:00.000Z",
    reportedByUserId: "user-002",
    reporterName: "Clara Walukow",
    contactName: "Clara Walukow",
    contactWhatsApp: "081355667788",
  },
  {
    id: "item-003",
    title: "Kartu Mahasiswa Atas Nama Angelia",
    description:
      "Kartu mahasiswa ditemukan di dekat perpustakaan. Kondisi masih baik dan siap dikonfirmasi pemiliknya.",
    category: "found",
    status: ITEM_STATUS.RETURNED,
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    location: "Perpustakaan",
    postedAt: "2026-04-19T10:30:00.000Z",
    reportedByUserId: "user-demo-unklab",
    reporterName: "Samuel Paat",
    contactName: "Samuel Paat",
    contactWhatsApp: "081234567890",
  },
  {
    id: "item-004",
    title: "Earbuds Putih dengan Case",
    description:
      "Earbuds warna putih dengan case bening. Hilang kemungkinan saat berpindah dari kafetaria ke ruang kuliah.",
    category: "lost",
    status: ITEM_STATUS.FOUND,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    location: "Kafetaria UNKLAB",
    postedAt: "2026-04-18T13:05:00.000Z",
    reportedByUserId: "user-004",
    reporterName: "Michael Rumondor",
    contactName: "Michael Rumondor",
    contactWhatsApp: "082199887766",
  },
];
