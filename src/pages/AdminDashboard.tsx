import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import InvoiceMaker from '@/sections/InvoiceMaker';
import { trpc } from '@/providers/trpc';
import '@/admin-theme.css';
import {
  LayoutDashboard, Mail, MailOpen, Reply, Archive, Trash2, RefreshCw, LogOut, Inbox,
  CheckCircle, AlertCircle, ChevronLeft, User, ReceiptText, LayoutPanelLeft, Moon, Sun,
  Megaphone, Eye, EyeOff, Gauge, ExternalLink, MessageCircle, Sparkles,
  SlidersHorizontal, Save, RotateCcw, ArrowRight, ShieldCheck,
} from 'lucide-react';

type Theme = 'dark' | 'light';
const THEME_KEY = 'porshure-admin-theme';

type ContentForm = {
  heroHeadline: string;
  heroSubtitle: string;
  contactPhone: string;
  whatsappPhone: string;
  contactEmail: string;
  footerDescription: string;
  announcement: string;
  announcementEnabled: boolean;
  acceptingRequests: boolean;
  showReviewWall: boolean;
  showProofStrip: boolean;
  responseTime: string;
};

const emptyContent: ContentForm = {
  heroHeadline: 'Professional Document Preparation, Formatting & Submission—Without the Stress.',
  heroSubtitle: 'Porshure Green helps individuals, professionals, students, and businesses worldwide prepare polished, accurate, submission-ready documents with careful handling and dependable support.',
  contactPhone: '+1 (814) 791-5478',
  whatsappPhone: '+1 (814) 791-5478',
  contactEmail: 'porshuregreen@gmail.com',
  footerDescription: 'Professional document preparation, formatting and submission support for individuals, professionals and businesses worldwide.',
  announcement: '',
  announcementEnabled: false,
  acceptingRequests: true,
  showReviewWall: true,
  showProofStrip: true,
  responseTime: 'Reply usually within a few hours',
};

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-[#4AA882]' : 'bg-[#41544A]'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  );
}

function useAdminTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem(THEME_KEY) as Theme) || 'dark';
  });
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')) };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, isLoading, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useAdminTheme();

  const { data: siteContent, refetch: refetchContent } = trpc.content.get.useQuery();
  const [contentForm, setContentForm] = useState<ContentForm>(emptyContent);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (siteContent) {
      setContentForm((current) => ({ ...current, ...siteContent }));
    }
  }, [siteContent]);
  const saveContent = trpc.content.update.useMutation({
    onSuccess: () => { setDirty(false); refetchContent(); },
  });

  const [tab, setTab] = useState<'overview' | 'controls' | 'inquiries' | 'invoice'>('overview');
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/health')
      .then((response) => response.json())
      .then((body) => { if (alive) setApiOk(Boolean(body?.ok)); })
      .catch(() => { if (alive) setApiOk(false); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login');
  }, [isLoading, isAuthenticated, navigate]);

  const { data: inquiries, isLoading: inquiriesLoading, refetch } = trpc.inquiry.list.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
  });
  const { data: stats } = trpc.inquiry.stats.useQuery(undefined, { enabled: isAdmin, retry: false });
  const updateStatus = trpc.inquiry.updateStatus.useMutation({ onSuccess: () => refetch() });
  const deleteInquiry = trpc.inquiry.delete.useMutation({ onSuccess: () => refetch() });

  const recent = useMemo(() => (inquiries ?? []).slice(0, 5), [inquiries]);

  if (isLoading) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center bg-[#0D1C16]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4AA882] border-t-transparent" />
      </div>
    );
  }
  if (!isAdmin) return null;

  const statusConfig: Record<string, { icon: typeof Mail; color: string; label: string }> = {
    new: { icon: AlertCircle, color: '#3B8FD9', label: 'New' },
    read: { icon: MailOpen, color: '#D4943A', label: 'Read' },
    replied: { icon: Reply, color: '#4AA882', label: 'Replied' },
    archived: { icon: Archive, color: '#8A9A94', label: 'Archived' },
  };

  const setField = <K extends keyof ContentForm>(key: K, value: ContentForm[K]) => {
    setContentForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const switches: { key: keyof ContentForm; label: string; hint: string; on: string; off: string }[] = [
    { key: 'acceptingRequests', label: 'Accepting new requests', hint: 'The pulsing badge in the homepage hero.', on: 'Badge visible', off: 'Badge hidden' },
    { key: 'announcementEnabled', label: 'Announcement bar', hint: 'The thin strip above the navigation.', on: 'Bar visible', off: 'Bar hidden' },
    { key: 'showReviewWall', label: 'Client review cards', hint: 'The “Real clients. Real screenshots.” grid.', on: 'Shown', off: 'Hidden' },
    { key: 'showProofStrip', label: 'Conversation screenshots', hint: 'The “The receipts” strip of chat proof.', on: 'Shown', off: 'Hidden' },
  ];

  const whatsappDigits = (contentForm.whatsappPhone || '').replace(/\D/g, '');

  return (
    <div className="admin-shell min-h-screen bg-[#0D1C16] text-white" data-theme={theme}>
      <header className="admin-topbar sticky top-0 z-50 flex min-h-16 items-center justify-between gap-2 border-b border-[rgba(74,168,130,0.12)] bg-[rgba(13,28,22,0.95)] px-3 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#7A9A8E] transition-colors hover:text-white">
            <ChevronLeft size={18} />
            <span className="hidden text-[13px] sm:inline">Back to site</span>
          </Link>
          <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]" />
          <div className="flex items-center gap-2.5">
            <LayoutDashboard size={18} color="#4AA882" />
            <span className="hidden text-[15px] font-semibold sm:inline">Control panel</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="group inline-flex items-center gap-2 rounded-full border border-[rgba(74,168,130,0.24)] bg-[rgba(74,168,130,0.1)] px-3 py-2 text-[11.5px] font-semibold text-[#4AA882] transition hover:bg-[rgba(74,168,130,0.2)]"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <div className="flex items-center gap-2">
            <User size={14} color="#7A9A8E" />
            <span className="admin-user-email text-[13px] text-[#7A9A8E]">{user?.email || 'Administrator'}</span>
          </div>
          <span className="rounded-full bg-[rgba(74,168,130,0.15)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4AA882]">Admin</span>
          <button onClick={logout} className="flex items-center gap-1.5 text-[12px] text-[#7A9A8E] transition-colors hover:text-white">
            <LogOut size={14} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="admin-content mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        <div role="tablist" aria-label="Admin sections" className="sticky top-16 z-40 mb-6 flex gap-1 overflow-x-auto rounded-xl border border-[rgba(74,168,130,0.16)] bg-[rgba(13,28,22,0.96)] p-1.5 backdrop-blur">
          {([
            { id: 'overview', label: 'Overview', icon: Gauge, badge: 0 },
            { id: 'controls', label: 'Site controls', icon: SlidersHorizontal, badge: 0 },
            { id: 'inquiries', label: 'Inquiries', icon: Inbox, badge: stats?.new ?? 0 },
            { id: 'invoice', label: 'Invoice maker', icon: ReceiptText, badge: 0 },
          ] as const).map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`relative inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-semibold transition-colors ${tab === item.id ? 'text-white' : 'text-[#7A9A8E] hover:text-white'}`}
            >
              <item.icon size={15} />
              {item.label}
              {item.badge > 0 && <span className="rounded-full bg-[#3B8FD9] px-1.5 py-0.5 text-[10px] font-bold text-white">{item.badge}</span>}
              {tab === item.id && (
                <motion.span layoutId="admin-tab-pill" className="absolute inset-0 -z-10 rounded-lg bg-[rgba(74,168,130,0.18)] ring-1 ring-[rgba(74,168,130,0.35)]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: 'easeOut' }}>

            {/* ------------------------------ OVERVIEW ------------------------------ */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#4AA882]">Control panel</p>
                    <h1 className="mt-1 text-2xl font-semibold text-white">Welcome back.</h1>
                    <p className="mt-1 text-sm text-[#7A9A8E]">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · everything on the public site is switched from this page.
                    </p>
                  </div>
                  <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[rgba(74,168,130,0.14)] px-4 py-2.5 text-[12px] font-semibold text-[#4AA882] transition hover:bg-[rgba(74,168,130,0.24)]">
                    <ExternalLink size={14} /> Open public site
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { label: 'Inquiries', value: stats?.total ?? 0, icon: Inbox, color: '#4AA882' },
                    { label: 'New', value: stats?.new ?? 0, icon: AlertCircle, color: '#3B8FD9' },
                    { label: 'Replied', value: stats?.replied ?? 0, icon: CheckCircle, color: '#4AA882' },
                    { label: 'Archived', value: stats?.archived ?? 0, icon: Archive, color: '#8A9A94' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-[rgba(74,168,130,0.1)] bg-[rgba(255,255,255,0.03)] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <stat.icon size={16} color={stat.color} />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#7A9A8E]">{stat.label}</span>
                      </div>
                      <span className="text-[26px] font-bold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
                  <section className="rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="flex items-center gap-2 text-[14px] font-semibold text-white"><ShieldCheck size={15} color="#4AA882" /> Live site status</h2>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(74,168,130,0.12)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4AA882]">
                        <span className={`h-1.5 w-1.5 rounded-full ${apiOk ? 'bg-[#4AA882]' : apiOk === false ? 'bg-[#E74C3C]' : 'bg-[#D4943A]'}`} />
                        {apiOk === null ? 'Checking' : apiOk ? 'API online' : 'API unreachable'}
                      </span>
                    </div>
                    <ul className="divide-y divide-[rgba(255,255,255,0.06)]">
                      {switches.map((item) => {
                        const on = Boolean(contentForm[item.key]);
                        return (
                          <li key={String(item.key)} className="flex items-center justify-between gap-3 py-2.5">
                            <span className="min-w-0">
                              <span className="block text-[12.5px] font-medium text-white">{item.label}</span>
                              <span className="block text-[11px] text-[#7A9A8E]">{on ? item.on : item.off}</span>
                            </span>
                            <Switch checked={on} label={item.label} onChange={(value) => setField(item.key, value as never)} />
                          </li>
                        );
                      })}
                      <li className="flex items-center justify-between gap-3 py-2.5">
                        <span className="min-w-0">
                          <span className="block text-[12.5px] font-medium text-white">Announcement text</span>
                          <span className="block truncate text-[11px] text-[#7A9A8E]">{contentForm.announcement || 'Nothing written yet'}</span>
                        </span>
                        <button type="button" onClick={() => setTab('controls')} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#4AA882] hover:underline">
                          Edit <ArrowRight size={12} />
                        </button>
                      </li>
                    </ul>
                    {dirty && (
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[rgba(212,148,58,0.35)] bg-[rgba(212,148,58,0.1)] px-3 py-2">
                        <span className="text-[11.5px] text-[#D4943A]">Unsaved switch changes</span>
                        <button type="button" onClick={() => saveContent.mutate(contentForm)} disabled={saveContent.isPending} className="rounded-full bg-[#43845F] px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#14231D] disabled:opacity-50">
                          {saveContent.isPending ? 'Publishing…' : 'Publish now'}
                        </button>
                      </div>
                    )}
                    {saveContent.isSuccess && !dirty && <p className="mt-3 text-[11.5px] text-[#8FE4B4]">Site updated — the public pages are already showing it.</p>}
                  </section>

                  <section className="space-y-4">
                    <div className="rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.03)] p-5">
                      <h2 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-white"><Sparkles size={15} color="#4AA882" /> Appearance</h2>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[12.5px] font-medium text-white">{theme === 'dark' ? 'Dark workspace' : 'Light workspace'}</p>
                          <p className="text-[11px] text-[#7A9A8E]">Only affects this dashboard, saved per browser.</p>
                        </div>
                        <Switch checked={theme === 'light'} label="Light theme" onChange={() => toggleTheme()} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.03)] p-5">
                      <h2 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-white"><Megaphone size={15} color="#4AA882" /> Quick actions</h2>
                      <div className="grid gap-2">
                        <button type="button" onClick={() => setTab('controls')} className="flex items-center gap-2.5 rounded-lg border border-[rgba(74,168,130,0.16)] px-3 py-2.5 text-left text-[12px] font-medium text-white transition hover:bg-[rgba(74,168,130,0.1)]">
                          <SlidersHorizontal size={14} color="#4AA882" /> Edit site copy & switches
                        </button>
                        <button type="button" onClick={() => setTab('invoice')} className="flex items-center gap-2.5 rounded-lg border border-[rgba(74,168,130,0.16)] px-3 py-2.5 text-left text-[12px] font-medium text-white transition hover:bg-[rgba(74,168,130,0.1)]">
                          <ReceiptText size={14} color="#4AA882" /> Create an invoice
                        </button>
                        <a href={`https://wa.me/${whatsappDigits || '18147915478'}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-lg border border-[rgba(74,168,130,0.16)] px-3 py-2.5 text-left text-[12px] font-medium text-white transition hover:bg-[rgba(74,168,130,0.1)]">
                          <MessageCircle size={14} color="#4AA882" /> Open WhatsApp line
                        </a>
                        <button type="button" onClick={() => { refetch(); refetchContent(); }} className="flex items-center gap-2.5 rounded-lg border border-[rgba(74,168,130,0.16)] px-3 py-2.5 text-left text-[12px] font-medium text-white transition hover:bg-[rgba(74,168,130,0.1)]">
                          <RefreshCw size={14} color="#4AA882" /> Refresh dashboard data
                        </button>
                      </div>
                    </div>
                  </section>
                </div>

                <section className="rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-[14px] font-semibold text-white"><Mail size={15} color="#4AA882" /> Latest inquiries</h2>
                    <button type="button" onClick={() => setTab('inquiries')} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#4AA882] hover:underline">
                      View all <ArrowRight size={12} />
                    </button>
                  </div>
                  {recent.length === 0 ? (
                    <p className="py-6 text-center text-[12.5px] text-[#7A9A8E]">No inquiries yet — they will appear here the moment someone submits the contact form.</p>
                  ) : (
                    <ul className="divide-y divide-[rgba(255,255,255,0.06)]">
                      {recent.map((inquiry) => (
                        <li key={inquiry.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                          <div className="min-w-0">
                            <p className="truncate text-[12.5px] font-medium text-white">{inquiry.fullName}</p>
                            <p className="truncate text-[11px] text-[#7A9A8E]">{inquiry.serviceNeeded || 'General enquiry'} · {inquiry.email}</p>
                          </div>
                          <span className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold" style={{ backgroundColor: `${statusConfig[inquiry.status]?.color || '#7A9A8E'}18`, color: statusConfig[inquiry.status]?.color || '#7A9A8E' }}>
                            {statusConfig[inquiry.status]?.label || inquiry.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            )}

            {/* ------------------------------ SITE CONTROLS ------------------------------ */}
            {tab === 'controls' && (
              <div className="space-y-6">
                <section className="rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.035)] p-6 md:p-8">
                  <div className="mb-6">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[.2em] text-[#4AA882]">Site controls</p>
                    <h2 className="text-xl font-semibold text-white">What the public sees</h2>
                    <p className="mt-1 text-sm text-[#7A9A8E]">Flip a switch and press publish — the live site updates on the next page load.</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {switches.map((item) => {
                      const on = Boolean(contentForm[item.key]);
                      return (
                        <div key={String(item.key)} className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(74,168,130,0.14)] bg-[rgba(255,255,255,0.02)] px-4 py-3.5">
                          <div className="min-w-0">
                            <p className="flex items-center gap-2 text-[12.5px] font-semibold text-white">
                              {on ? <Eye size={13} color="#4AA882" /> : <EyeOff size={13} color="#7A9A8E" />} {item.label}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#7A9A8E]">{item.hint}</p>
                          </div>
                          <Switch checked={on} label={item.label} onChange={(value) => setField(item.key, value as never)} />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-[rgba(74,168,130,0.14)] bg-[rgba(74,168,130,0.06)] px-4 py-3">
                    <Megaphone size={15} color="#4AA882" />
                    <p className="min-w-0 flex-1 truncate text-[12px] text-[#A7BDB2]">
                      {contentForm.announcementEnabled && contentForm.announcement ? contentForm.announcement : 'Announcement bar is off — nothing is shown above the navigation.'}
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.035)] p-6 md:p-8">
                  <div className="mb-6">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[.2em] text-[#4AA882]">Content</p>
                    <h2 className="text-xl font-semibold text-white">Words & contact details</h2>
                    <p className="mt-1 text-sm text-[#7A9A8E]">These values are read by the homepage, navigation, footer and contact page.</p>
                  </div>

                  <form
                    onSubmit={(event) => { event.preventDefault(); saveContent.mutate(contentForm); }}
                    className="grid gap-5 md:grid-cols-2"
                  >
                    {([
                      ['heroHeadline', 'Homepage headline', 'input'],
                      ['heroSubtitle', 'Homepage introduction', 'textarea'],
                      ['announcement', 'Announcement banner', 'textarea'],
                      ['responseTime', 'Reply-time line (desk note)', 'input'],
                      ['contactPhone', 'Telephone number', 'input'],
                      ['whatsappPhone', 'WhatsApp number', 'input'],
                      ['contactEmail', 'Contact email', 'input'],
                      ['footerDescription', 'Footer description', 'textarea'],
                    ] as const).map(([key, label, kind]) => (
                      <label key={key} className="flex flex-col gap-2 text-xs font-medium text-[#A7BDB2]">
                        {label}
                        {kind === 'textarea' ? (
                          <textarea
                            value={String(contentForm[key])}
                            onChange={(event) => setField(key, event.target.value as never)}
                            rows={key === 'announcement' ? 2 : 3}
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#4AA882]"
                          />
                        ) : (
                          <input
                            value={String(contentForm[key])}
                            onChange={(event) => setField(key, event.target.value as never)}
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#4AA882]"
                          />
                        )}
                      </label>
                    ))}

                    <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
                      <p className="text-xs text-[#7A9A8E]">Leave phone fields blank to hide those contact actions.</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => { if (siteContent) setContentForm({ ...emptyContent, ...siteContent }); setDirty(false); }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(74,168,130,0.3)] px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#4AA882] transition hover:bg-[rgba(74,168,130,0.12)]"
                        >
                          <RotateCcw size={13} /> Reset
                        </button>
                        <button
                          type="submit"
                          disabled={saveContent.isPending}
                          className="inline-flex items-center gap-2 rounded-full bg-[#43845F] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#14231D] transition hover:-translate-y-0.5 disabled:opacity-50"
                        >
                          <Save size={14} /> {saveContent.isPending ? 'Saving…' : 'Save website changes'}
                        </button>
                      </div>
                    </div>
                    {saveContent.error && <p role="alert" className="text-sm text-red-300 md:col-span-2">{saveContent.error.message}</p>}
                    {saveContent.isSuccess && <p className="text-sm text-[#8FE4B4] md:col-span-2">Website content saved.</p>}
                    {dirty && <p className="text-[11.5px] text-[#D4943A] md:col-span-2">You have unpublished changes.</p>}
                  </form>
                </section>
              </div>
            )}

            {/* ------------------------------ INQUIRIES ------------------------------ */}
            {tab === 'inquiries' && (
              <>
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                  {[
                    { label: 'Total', value: stats?.total ?? 0, icon: Inbox, color: '#4AA882' },
                    { label: 'New', value: stats?.new ?? 0, icon: AlertCircle, color: '#3B8FD9' },
                    { label: 'Read', value: stats?.read ?? 0, icon: MailOpen, color: '#D4943A' },
                    { label: 'Replied', value: stats?.replied ?? 0, icon: CheckCircle, color: '#4AA882' },
                    { label: 'Archived', value: stats?.archived ?? 0, icon: Archive, color: '#8A9A94' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-[rgba(74,168,130,0.1)] bg-[rgba(255,255,255,0.03)] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <stat.icon size={16} color={stat.color} />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#7A9A8E]">{stat.label}</span>
                      </div>
                      <span className="text-[28px] font-bold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-[18px] font-semibold text-white"><Mail size={18} color="#4AA882" /> Inquiries</h2>
                  <button onClick={() => refetch()} className="flex items-center gap-2 rounded-lg border border-[rgba(74,168,130,0.2)] bg-[rgba(74,168,130,0.1)] px-4 py-2 text-[12px] font-medium text-[#4AA882] transition-colors hover:bg-[rgba(74,168,130,0.2)]">
                    <RefreshCw size={14} className={inquiriesLoading ? 'animate-spin' : ''} /> Refresh
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-[rgba(74,168,130,0.1)]">
                  {inquiriesLoading ? (
                    <div className="p-12 text-center text-[#7A9A8E]">Loading inquiries...</div>
                  ) : !inquiries || inquiries.length === 0 ? (
                    <div className="p-12 text-center">
                      <Inbox size={48} color="rgba(255,255,255,0.1)" className="mx-auto mb-4" />
                      <p className="text-[#7A9A8E]">No inquiries yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[rgba(74,168,130,0.1)] bg-[rgba(255,255,255,0.03)]">
                            {['Name', 'Email', 'Service', 'Message', 'Status', 'Date', 'Actions'].map((head) => (
                              <th key={head} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">{head}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.map((inquiry) => {
                            const StatusIcon = statusConfig[inquiry.status]?.icon || Mail;
                            const statusColor = statusConfig[inquiry.status]?.color || '#7A9A8E';
                            return (
                              <tr key={inquiry.id} className="border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-[rgba(255,255,255,0.02)]">
                                <td className="px-5 py-4 text-[13px] font-medium text-white">{inquiry.fullName}</td>
                                <td className="px-5 py-4 text-[13px] text-[#7A9A8E]">{inquiry.email}</td>
                                <td className="px-5 py-4 text-[13px] text-[#7A9A8E]">{inquiry.serviceNeeded || '-'}</td>
                                <td className="max-w-[200px] truncate px-5 py-4 text-[13px] text-[#7A9A8E]">{inquiry.message}</td>
                                <td className="px-5 py-4">
                                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ backgroundColor: `${statusColor}15`, color: statusColor }}>
                                    <StatusIcon size={12} /> {statusConfig[inquiry.status]?.label || inquiry.status}
                                  </span>
                                </td>
                                <td className="px-5 py-4 text-[12px] text-[#5A7A6E]">{inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : '-'}</td>
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-1.5">
                                    {inquiry.status === 'new' && (
                                      <button onClick={() => updateStatus.mutate({ id: inquiry.id, status: 'read' })} className="rounded-lg p-1.5 transition-colors hover:bg-[rgba(212,148,58,0.15)]" title="Mark as Read" aria-label={`Mark enquiry from ${inquiry.fullName} as read`}>
                                        <MailOpen size={14} color="#D4943A" />
                                      </button>
                                    )}
                                    {inquiry.status !== 'replied' && (
                                      <>
                                        <a href={`mailto:${inquiry.email}?subject=${encodeURIComponent('Re: Your Porshure Green enquiry')}&body=${encodeURIComponent(`Hello ${inquiry.fullName},\n\nThank you for contacting Porshure Green.\n\n\nKind regards,\nPorshure Green\n`)}`} className="rounded-lg p-1.5 transition-colors hover:bg-[rgba(74,168,130,0.15)]" title="Reply by email" aria-label={`Reply to ${inquiry.fullName} by email`}>
                                          <Reply size={14} color="#4AA882" />
                                        </a>
                                        <button onClick={() => updateStatus.mutate({ id: inquiry.id, status: 'replied' })} className="rounded-lg p-1.5 transition-colors hover:bg-[rgba(74,168,130,0.15)]" title="Mark as Replied" aria-label={`Mark enquiry from ${inquiry.fullName} as replied`}>
                                          <CheckCircle size={14} color="#4AA882" />
                                        </button>
                                      </>
                                    )}
                                    {inquiry.status !== 'archived' && (
                                      <button onClick={() => updateStatus.mutate({ id: inquiry.id, status: 'archived' })} className="rounded-lg p-1.5 transition-colors hover:bg-[rgba(138,154,148,0.15)]" title="Archive" aria-label={`Archive enquiry from ${inquiry.fullName}`}>
                                        <Archive size={14} color="#8A9A94" />
                                      </button>
                                    )}
                                    <button onClick={() => { if (confirm('Delete this inquiry?')) deleteInquiry.mutate({ id: inquiry.id }); }} className="rounded-lg p-1.5 transition-colors hover:bg-[rgba(231,76,60,0.15)]" title="Delete" aria-label={`Delete enquiry from ${inquiry.fullName}`}>
                                      <Trash2 size={14} color="#E74C3C" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Preview website', detail: 'Open the live homepage', icon: LayoutPanelLeft, to: '/' },
                    { label: 'Edit site controls', detail: 'Copy, switches and contact details', icon: SlidersHorizontal, tab: 'controls' as const },
                    { label: 'Create an invoice', detail: 'Export a branded PDF or DOC', icon: ReceiptText, tab: 'invoice' as const },
                  ].map((action) => (
                    action.to ? (
                      <Link key={action.label} to={action.to} className="group flex items-center gap-3 rounded-xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.03)] p-4 transition hover:border-[rgba(74,168,130,0.4)] hover:bg-[rgba(74,168,130,0.08)]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(74,168,130,0.15)] text-[#4AA882]"><action.icon size={16} /></span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold text-white">{action.label}</span>
                          <span className="block text-[11px] text-[#7A9A8E]">{action.detail}</span>
                        </span>
                      </Link>
                    ) : (
                      <button key={action.label} type="button" onClick={() => setTab(action.tab!)} className="group flex items-center gap-3 rounded-xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.03)] p-4 text-left transition hover:border-[rgba(74,168,130,0.4)] hover:bg-[rgba(74,168,130,0.08)]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(74,168,130,0.15)] text-[#4AA882]"><action.icon size={16} /></span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold text-white">{action.label}</span>
                          <span className="block text-[11px] text-[#7A9A8E]">{action.detail}</span>
                        </span>
                      </button>
                    )
                  ))}
                </div>
              </>
            )}

            {tab === 'invoice' && <InvoiceMaker />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
