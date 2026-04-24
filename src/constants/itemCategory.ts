import type { ItemCategory } from '../types';

export const ITEM_CATEGORY = {
  LOST: 'lost',
  FOUND: 'found',
} as const;

export const ITEM_CATEGORY_LABELS: Record<ItemCategory, string> = {
  lost: 'Barang Hilang',
  found: 'Barang Ditemukan',
};
