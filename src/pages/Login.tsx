import { Button } from "@/components/ui/button";
import { LogIn, Leaf } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
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
          <h1 className="text-[24px] font-bold text-white mb-2">Admin Access</h1>
          <p className="text-[14px] font-light text-[#7A9A8E]">Sign in to manage inquiries and view dashboard</p>
        </div>

        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(74,168,130,0.12)] rounded-2xl p-8">
          <Button
            className="w-full h-12 rounded-xl text-[14px] font-semibold bg-[#4AA882] hover:bg-[#3D8F6D] text-white transition-all duration-300"
            size="lg"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            <LogIn size={18} className="mr-2" />
            Sign in with Kimi
          </Button>

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
