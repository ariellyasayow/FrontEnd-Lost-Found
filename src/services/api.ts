// src/services/api.ts

const BASE_URL = "http://localhost:8081";

export const tokenStorage = {
  get: () => localStorage.getItem("token"),
  set: (token: string) => localStorage.setItem("token", token),
  remove: () => localStorage.removeItem("token"),
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const e = await res.json();
      message = e.error ?? message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export type LoginResponse = { message: string; token: string };
export type RegisterResponse = { message: string };
export type ProfileResponse = {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  nim: string;
  no_whatsapp: string;
  nomor_registrasi: string;
};

export const authApi = {
  login: (email: string, password: string) =>
    request<LoginResponse>("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: {
    nama_depan: string;
    nama_belakang: string;
    email: string;
    password: string;
    nim: string;
    no_whatsapp: string;
    nomor_registrasi: string;
  }) =>
    request<RegisterResponse>("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getProfile: () => request<ProfileResponse>("/api/profile"),
  updateProfile: (data: {
    nama_depan: string;
    nama_belakang: string;
    no_whatsapp: string;
    nomor_registrasi: string;
  }) =>
    request<{ message: string }>("/api/update-profile", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  changePassword: (old_password: string, new_password: string) =>
    request<{ message: string }>("/api/change-password", {
      method: "POST",
      body: JSON.stringify({ old_password, new_password }),
    }),
};

// ─── Barang ───────────────────────────────────────────────────────────────────
export type BarangFromAPI = {
  id: number;
  user_id: number;
  nama_barang: string;
  deskripsi: string;
  status: string;
  tipe_laporan: string; // 'hilang' atau 'ditemukan' (tipe awal, tidak berubah)
  lokasi: string;
  tanggal_laporan: string;
  foto: string;
};

export type ProductListResponse = {
  status: number;
  message: string;
  data: BarangFromAPI[] | null;
};

export type PostBarangResponse = {
  status: number;
  message: string;
  data: { id: number; nama_barang: string; status: string; foto_path: string };
};

export const itemsApi = {
  getAll: () => request<ProductListResponse>("/api/products"),
  getMyItems: () => request<ProductListResponse>("/api/my-items"),
  postHilang: (formData: FormData) =>
    request<PostBarangResponse>("/api/barang/hilang", {
      method: "POST",
      body: formData,
    }),
  postDitemukan: (formData: FormData) =>
    request<PostBarangResponse>("/api/barang/ditemukan", {
      method: "POST",
      body: formData,
    }),
  updateStatus: (barang_id: number, status: string) =>
    request<{ message: string }>("/api/status-barang", {
      method: "POST",
      body: JSON.stringify({ barang_id, status }),
    }),
};
