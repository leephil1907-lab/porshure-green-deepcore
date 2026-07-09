import { useMemo } from "react";

export function useAuth() {
  return useMemo(
    () => ({
      user: { name: "Admin", role: "admin" },
      isAuthenticated: true,
      isAdmin: true,
      isLoading: false,
      logout: () => {},
      refresh: () => {},
    }),
    [],
  );
}
