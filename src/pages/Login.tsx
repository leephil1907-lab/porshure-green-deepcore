import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { Lock, Mail, ArrowRight, Leaf, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("porshuregreen@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.login.login.useMutation({
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
        window.location.href = "/admin";
      }
    },
    onError: (err) => {
      setError(err.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #0D1C16 0%, #122920 40%, #0D1C16 100%)' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <img src="/images/logo.png" alt="Porshure Green" className="w-12 h-12 object-contain" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[18px] text-white leading-tight">Porshure Green</span>
              <span className="text-[9px] uppercase tracking-[3px] text-[#4AA882] leading-tight">Documents</span>
            </div>
          </div>
          <h1 className="text-[24px] font-bold text-white mb-2">Admin Login</h1>
          <p className="text-[14px] font-light text-[#7A9A8E]">Sign in to manage inquiries</p>
        </div>

        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(74,168,130,0.12)] rounded-2xl p-8">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.2)] text-[13px] text-[#E74C3C]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-[#7A9A8E] mb-2">Email</label>
              <div className="relative">
                <Mail size={16} color="#7A9A8E" className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[14px] text-white placeholder:text-[#5A7A6E] focus:outline-none focus:border-[#4AA882] focus:ring-2 focus:ring-[rgba(74,168,130,0.15)] transition-all"
                  placeholder="admin@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-[#7A9A8E] mb-2">Password</label>
              <div className="relative">
                <Lock size={16} color="#7A9A8E" className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[14px] text-white placeholder:text-[#5A7A6E] focus:outline-none focus:border-[#4AA882] focus:ring-2 focus:ring-[rgba(74,168,130,0.15)] transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A9A8E] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 rounded-xl text-[14px] font-semibold bg-[#4AA882] hover:bg-[#3D8F6D] text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
            <a href="/" className="text-[13px] text-[#7A9A8E] hover:text-[#4AA882] transition-colors flex items-center justify-center gap-1.5">
              <Leaf size={14} />
              Back to website
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-[12px] text-[#4A6A5E]">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
