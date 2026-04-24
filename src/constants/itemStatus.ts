import type { ItemStatus } from '../types';

export const ITEM_STATUS = {
  ACTIVE: 'active',
  FOUND: 'found',
  RETURNED: 'returned',
} as const;

export const ITEM_STATUS_OPTIONS = Object.values(ITEM_STATUS) as ItemStatus[];

export const ITEM_STATUS_META: Record<
  ItemStatus,
  { label: string; tone: string }
> = {
  active: {
    label: 'Aktif',
    tone: 'bg-brand-100 text-brand-900',
  },
  found: {
    label: 'Sudah Ditemukan',
    tone: 'bg-emerald-100 text-emerald-700',
  },
  returned: {
    label: 'Sudah Dikembalikan',
    tone: 'bg-sky-100 text-sky-700',
  },
};
