// src/contexts/AuthContext.tsx
import type { PropsWithChildren } from "react";
import { createContext, useEffect, useState } from "react";

import { authApi, tokenStorage } from "../services/api";
import type { User, UserProfile } from "../types";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
};

export type RegisterData = {
  nama_depan: string;
  nama_belakang: string;
  email: string;
  password: string;
  nim: string;
  no_whatsapp: string;
  nomor_registrasi: string;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

// Helper: cek apakah profile sudah lengkap
function checkProfileComplete(profile: UserProfile): boolean {
  return Object.values(profile).every((v) => v.trim().length > 0);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  // isLoading true saat pertama kali app dibuka (cek token di localStorage)
  const [isLoading, setIsLoading] = useState(true);

  // ── Saat app pertama kali dibuka, cek apakah ada token tersimpan ──────────
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Ada token → ambil profile dari backend untuk restore session
    authApi
      .getProfile()
      .then((profile) => {
        const userProfile: UserProfile = {
          name: `${profile.nama_depan} ${profile.nama_belakang}`.trim(),
          email: profile.email,
          regis: profile.nomor_registrasi,
          whatsapp: profile.no_whatsapp,
        };

        setUser({
          id: String(profile.id),
          email: profile.email,
          isProfileComplete: checkProfileComplete(userProfile),
          profile: userProfile,
        });
      })
      .catch(() => {
        // Token kadaluarsa / tidak valid → hapus
        tokenStorage.remove();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);

    // Simpan token ke localStorage
    tokenStorage.set(res.token);

    // Ambil data profile lengkap dari backend
    const profile = await authApi.getProfile();

    const userProfile: UserProfile = {
      name: `${profile.nama_depan} ${profile.nama_belakang}`.trim(),
      email: profile.email,
      regis: profile.nomor_registrasi,
      whatsapp: profile.no_whatsapp,
    };

    setUser({
      id: String(profile.id),
      email: profile.email,
      isProfileComplete: checkProfileComplete(userProfile),
      profile: userProfile,
    });
  };

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (data: RegisterData) => {
    // Backend hanya return { message } — setelah register user harus login sendiri
    await authApi.register(data);
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    tokenStorage.remove();
    setUser(null);
  };

  // ── Update profile (kirim ke backend, lalu update state lokal) ────────────
  const updateProfile = async (profile: UserProfile) => {
    // Pisah nama jadi nama_depan dan nama_belakang
    const namaParts = profile.name.trim().split(" ");
    const namaDepan = namaParts[0] ?? "";
    const namaBelakang = namaParts.slice(1).join(" ");

    await authApi.updateProfile({
      nama_depan: namaDepan,
      nama_belakang: namaBelakang,
      no_whatsapp: profile.whatsapp,
      nomor_registrasi: profile.regis,
    });

    setUser((current) => {
      if (!current) return current;
      return {
        ...current,
        isProfileComplete: checkProfileComplete(profile),
        profile,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
