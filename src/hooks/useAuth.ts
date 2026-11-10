import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";

export function useAuth() {
  const utils = trpc.useUtils();

  const { data: admin, isLoading } = trpc.login.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logoutMutation = trpc.login.logout.useMutation({
    onSuccess: () => {
        utils.invalidate();
      window.location.href = "/login";
    },
  });

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    logoutMutation.mutate();
  }, [logoutMutation]);

  return useMemo(
    () => ({
      user: admin || null,
      isAuthenticated: !!admin,
      isAdmin: admin?.role === "admin",
      isLoading,
      logout,
    }),
    [admin, isLoading, logout],
  );
}
