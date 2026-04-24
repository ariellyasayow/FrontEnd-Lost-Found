import { ROUTES } from './routes';

export const primaryNavLinks = [
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
    label: 'Barang Saya',
    to: ROUTES.myItems,
  },
  {
    label: 'Akun',
    to: ROUTES.account,
  },
];

export const mobileNavLinks = primaryNavLinks.slice(0, 4);
