// src/contexts/AppProviders.tsx
import type { PropsWithChildren } from "react";

import { AuthProvider } from "./AuthContext";
import { ItemsProvider } from "./ItemsContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ItemsProvider>{children}</ItemsProvider>
    </AuthProvider>
  );
}
