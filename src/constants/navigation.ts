import { ROUTES } from './routes';

export const primaryNavLinks = [
  {
    label: 'Beranda',
    to: ROUTES.home,
  },
  {
    label: 'Barang Hilang',
    to: ROUTES.lostItems,
  },
  {
    label: 'Barang Ditemukan',
    to: ROUTES.foundItems,
  },
  {
    label: 'Barang Saya',
    to: ROUTES.myItems,
  },
];

export const mobileNavLinks = [
  {
    label: 'Beranda',
    to: ROUTES.home,
  },
  {
    label: 'Hilang',
    to: ROUTES.lostItems,
  },
  {
    label: 'Ditemukan',
    to: ROUTES.foundItems,
  },
  {
    label: 'Saya',
    to: ROUTES.myItems,
  },
  {
    label: 'Akun',
    to: ROUTES.account,
  },
];
