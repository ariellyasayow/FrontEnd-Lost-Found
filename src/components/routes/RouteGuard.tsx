// src/components/routes/RouteGuard.tsx
import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

type RouteGuardProps = {
  children?: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
};

export function RouteGuard({
  children,
  requireAuth = true,
  redirectTo = ROUTES.home,
}: RouteGuardProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-900 border-t-transparent" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
