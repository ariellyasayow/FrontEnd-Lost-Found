export const ROUTES = {
  home: '/',
  login: '/login',
  account: '/akun',
  lostItems: '/barang/hilang',
  foundItems: '/barang/ditemukan',
  itemDetail: '/barang/:id',
  postLostItem: '/barang/hilang/post',
  postFoundItem: '/barang/ditemukan/post',
  myItems: '/barang-saya',
} as const;

export function buildItemDetailPath(id: string) {
  return `/barang/${id}`;
}
