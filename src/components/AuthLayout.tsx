import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, User } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0D1C16] text-white">
      <div className="h-16 border-b border-[rgba(74,168,130,0.12)] flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={18} color="#4AA882" />
          <span className="font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <User size={16} color="#7A9A8E" />
              <span className="text-sm text-[#7A9A8E]">{user.name}</span>
            </div>
          )}
          <button onClick={logout} className="flex items-center gap-1 text-sm text-[#7A9A8E] hover:text-white">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
