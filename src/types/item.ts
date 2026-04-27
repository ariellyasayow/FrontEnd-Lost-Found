// src/types/item.ts
export type ItemCategory = "lost" | "found";

export type ItemStatus = "active" | "found" | "returned";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  imageUrl: string;
  location: string;
  postedAt: string;
  reportedByUserId: string;
  reporterName: string;
  contactName: string;
  contactWhatsApp: string;
}

export interface CreateItemInput {
  title: string;
  description: string;
  category: ItemCategory;
  location: string;
  imageUrl?: string;
  status?: ItemStatus;
  reportedByUserId: string;
  reporterName: string;
  contactName: string;
  contactWhatsApp: string;
}
