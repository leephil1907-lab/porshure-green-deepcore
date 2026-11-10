import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import {
  LayoutDashboard, Mail, MailOpen, Reply, Archive,
  Trash2, RefreshCw, LogOut, Inbox, CheckCircle,
  AlertCircle, ChevronLeft, User,
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, isLoading, logout } = useAuth();
  const { data: siteContent, refetch: refetchContent } = trpc.content.get.useQuery();
  const [contentForm, setContentForm] = useState({ heroHeadline: 'Organized with clarity', heroSubtitle: 'Premium document preparation, formatting, and submission services. From paperwork to peace of mind — fast, confidential, and professional.', contactPhone: '', whatsappPhone: '', contactEmail: 'porshuregreen@gmail.com', footerDescription: 'Secure document support, organized with clarity. Professional preparation, formatting, and submission services you can trust.', announcement: '' });
  useEffect(() => { if (siteContent) setContentForm((current) => ({ ...current, ...siteContent })); }, [siteContent]);
  const saveContent = trpc.content.update.useMutation({ onSuccess: () => refetchContent() });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const { data: inquiries, isLoading: inquiriesLoading, refetch } = trpc.inquiry.list.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
  });

  const { data: stats } = trpc.inquiry.stats.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
  });

  const updateStatus = trpc.inquiry.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteInquiry = trpc.inquiry.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1C16] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#4AA882] border-t-transparent rounded-full animate-spin" />
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

  return (
    <div className="min-h-screen bg-[#0D1C16] text-white">
      <header className="h-16 border-b border-[rgba(74,168,130,0.12)] bg-[rgba(13,28,22,0.95)] backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-[#7A9A8E] hover:text-white transition-colors">
            <ChevronLeft size={18} />
            <span className="text-[13px]">Back to Site</span>
          </a>
          <div className="w-px h-6 bg-[rgba(255,255,255,0.1)]" />
          <div className="flex items-center gap-2.5">
            <LayoutDashboard size={18} color="#4AA882" />
            <span className="font-semibold text-[15px]">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User size={14} color="#7A9A8E" />
            <span className="text-[13px] text-[#7A9A8E]">{user?.email || 'Administrator'}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[rgba(74,168,130,0.15)] text-[10px] font-semibold uppercase tracking-wider text-[#4AA882]">Admin</span>
          <button onClick={logout} className="flex items-center gap-1.5 text-[12px] text-[#7A9A8E] hover:text-white transition-colors">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <section className="mb-10 rounded-2xl border border-[rgba(74,168,130,0.16)] bg-[rgba(255,255,255,0.035)] p-6 md:p-8">
          <div className="mb-6"><p className="mb-1 text-[10px] font-semibold uppercase tracking-[.2em] text-[#4AA882]">Content management</p><h2 className="text-xl font-semibold text-white">Website content</h2><p className="mt-1 text-sm text-[#7A9A8E]">Edit the homepage copy and contact details shown on the public website.</p></div>
          <form onSubmit={(event) => { event.preventDefault(); saveContent.mutate(contentForm); }} className="grid gap-5 md:grid-cols-2">
            {([['heroHeadline','Homepage headline'],['heroSubtitle','Homepage introduction'],['contactPhone','Telephone number'],['whatsappPhone','WhatsApp number'],['contactEmail','Contact email'],['footerDescription','Footer description'],['announcement','Announcement banner']] as const).map(([key,label]) => <label key={key} className="flex flex-col gap-2 text-xs font-medium text-[#A7BDB2]">{label}{key === 'heroSubtitle' || key === 'footerDescription' || key === 'announcement' ? <textarea value={contentForm[key]} onChange={(event) => setContentForm((current) => ({ ...current, [key]: event.target.value }))} rows={key === 'announcement' ? 2 : 3} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#4AA882]" /> : <input value={contentForm[key]} onChange={(event) => setContentForm((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#4AA882]" />}</label>)}
            <div className="flex items-center justify-between gap-3 md:col-span-2"><p className="text-xs text-[#7A9A8E]">Leave phone fields blank to hide those contact actions.</p><button type="submit" disabled={saveContent.isPending} className="rounded-full bg-[#3DDC84] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#14231D] transition hover:-translate-y-0.5 disabled:opacity-50">{saveContent.isPending ? 'Saving…' : 'Save website changes'}</button></div>
            {saveContent.error && <p role="alert" className="text-sm text-red-300 md:col-span-2">{saveContent.error.message}</p>}{saveContent.isSuccess && <p className="text-sm text-[#8FE4B4] md:col-span-2">Website content saved.</p>}
          </form>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats?.total ?? 0, icon: Inbox, color: '#4AA882' },
            { label: 'New', value: stats?.new ?? 0, icon: AlertCircle, color: '#3B8FD9' },
            { label: 'Read', value: stats?.read ?? 0, icon: MailOpen, color: '#D4943A' },
            { label: 'Replied', value: stats?.replied ?? 0, icon: CheckCircle, color: '#4AA882' },
            { label: 'Archived', value: stats?.archived ?? 0, icon: Archive, color: '#8A9A94' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(74,168,130,0.1)]">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={16} color={stat.color} />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#7A9A8E]">{stat.label}</span>
                </div>
                <span className="text-[28px] font-bold text-white">{stat.value}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold text-white flex items-center gap-2">
            <Mail size={18} color="#4AA882" />
            Inquiries
          </h2>
          <button onClick={() => refetch()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(74,168,130,0.1)] border border-[rgba(74,168,130,0.2)] text-[12px] font-medium text-[#4AA882] hover:bg-[rgba(74,168,130,0.2)] transition-colors">
            <RefreshCw size={14} className={inquiriesLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        <div className="rounded-xl border border-[rgba(74,168,130,0.1)] overflow-hidden">
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
                  <tr className="bg-[rgba(255,255,255,0.03)] border-b border-[rgba(74,168,130,0.1)]">
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Name</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Email</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Service</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Message</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Status</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Date</th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#7A9A8E]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => {
                    const StatusIcon = statusConfig[inquiry.status]?.icon || Mail;
                    const statusColor = statusConfig[inquiry.status]?.color || '#7A9A8E';
                    return (
                      <tr key={inquiry.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                        <td className="px-5 py-4 text-[13px] font-medium text-white">{inquiry.fullName}</td>
                        <td className="px-5 py-4 text-[13px] text-[#7A9A8E]">{inquiry.email}</td>
                        <td className="px-5 py-4 text-[13px] text-[#7A9A8E]">{inquiry.serviceNeeded || '-'}</td>
                        <td className="px-5 py-4 text-[13px] text-[#7A9A8E] max-w-[200px] truncate">{inquiry.message}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: `${statusColor}15`, color: statusColor }}>
                            <StatusIcon size={12} />
                            {statusConfig[inquiry.status]?.label || inquiry.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[12px] text-[#5A7A6E]">
                          {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            {inquiry.status === 'new' && (
                              <button onClick={() => updateStatus.mutate({ id: inquiry.id, status: 'read' })}
                                className="p-1.5 rounded-lg hover:bg-[rgba(212,148,58,0.15)] transition-colors" title="Mark as Read">
                                <MailOpen size={14} color="#D4943A" />
                              </button>
                            )}
                            {inquiry.status !== 'replied' && (
                              <button onClick={() => updateStatus.mutate({ id: inquiry.id, status: 'replied' })}
                                className="p-1.5 rounded-lg hover:bg-[rgba(74,168,130,0.15)] transition-colors" title="Mark as Replied">
                                <Reply size={14} color="#4AA882" />
                              </button>
                            )}
                            {inquiry.status !== 'archived' && (
                              <button onClick={() => updateStatus.mutate({ id: inquiry.id, status: 'archived' })}
                                className="p-1.5 rounded-lg hover:bg-[rgba(138,154,148,0.15)] transition-colors" title="Archive">
                                <Archive size={14} color="#8A9A94" />
                              </button>
                            )}
                            <button onClick={() => { if (confirm('Delete this inquiry?')) deleteInquiry.mutate({ id: inquiry.id }); }}
                              className="p-1.5 rounded-lg hover:bg-[rgba(231,76,60,0.15)] transition-colors" title="Delete">
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
      </div>
    </div>
  );
}
