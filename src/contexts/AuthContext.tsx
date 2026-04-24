import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

import type { User, UserProfile } from '../types';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function createEmptyProfile(email: string): UserProfile {
  return {
    name: '',
    email,
    regis: '',
    whatsapp: '',
  };
}

function isProfileComplete(profile: UserProfile) {
  return Object.values(profile).every((value) => value.trim().length > 0);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const profile = createEmptyProfile(normalizedEmail);

    setUser({
      id: 'user-demo-unklab',
      email: normalizedEmail,
      isProfileComplete: false,
      profile,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profile: UserProfile) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        email: profile.email,
        isProfileComplete: isProfileComplete(profile),
        profile,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
