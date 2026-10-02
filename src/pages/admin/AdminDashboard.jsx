import React, { useEffect, useState } from 'react';
import { 
  Users, Layers, Briefcase, FileText, MessageSquare, 
  DollarSign, CheckCircle2, Clock, ArrowRight, Eye, RefreshCw 
} from 'lucide-react';
import { dashboardApi, contactApi, quoteApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await dashboardApi.getStats();
      if (res.success) setStats(res.data);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await contactApi.markRead(id);
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuoteStatus = async (id, newStatus) => {
    try {
      await quoteApi.updateStatus(id, { status: newStatus });
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !stats) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#9B7EDE] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Loading console telemetry...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Active Services', value: stats?.totalServices || 0, icon: Layers, color: 'text-purple-600 bg-purple-100 dark:bg-purple-950/60' },
    { label: 'Case Studies', value: stats?.totalProjects || 0, icon: Briefcase, color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-950/60' },
    { label: 'Blog Articles', value: stats?.totalBlogPosts || 0, icon: FileText, color: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-950/60' },
    { label: 'Job Openings', value: stats?.totalActiveJobs || 0, icon: Users, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60' },
    { label: 'Pending Quotes', value: stats?.pendingQuotes || 0, icon: DollarSign, color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/60' },
    { label: 'Unread Inquiries', value: stats?.pendingContactMessages || 0, icon: MessageSquare, color: 'text-rose-600 bg-rose-100 dark:bg-rose-950/60' },
  ];

  return (
    <>
      <SeoHelmet title="Admin Console Overview" />

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Operations Telemetry
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Live statistics, client inquiries, quote requests, and recruitment applications.
            </p>
          </div>
          <button
            onClick={fetchStats}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-slate-200 dark:border-purple-900/40 text-xs font-semibold flex items-center gap-1.5 hover:bg-white dark:hover:bg-purple-950/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-purple-900/30 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {c.label}
                  </span>
                  <div className={`p-1.5 rounded-lg ${c.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  {c.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Quotes Section */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-purple-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white">
                Recent Solution Quote Requests
              </h3>
              <p className="text-xs text-slate-500">Incoming multi-step project estimators.</p>
            </div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-300 font-semibold">
              {stats?.recentQuotes?.length || 0} recent
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3 rounded-l-lg">Client & Email</th>
                  <th className="p-3">Required Practice</th>
                  <th className="p-3">Budget Range</th>
                  <th className="p-3">Timeline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-lg text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20">
                {!stats?.recentQuotes || stats.recentQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">
                      No quote requests submitted yet.
                    </td>
                  </tr>
                ) : (
                  stats.recentQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/20">
                      <td className="p-3">
                        <div className="font-bold text-slate-900 dark:text-white">{q.fullName}</div>
                        <div className="text-slate-400 text-[11px]">{q.email} • {q.company || 'Private'}</div>
                      </td>
                      <td className="p-3 font-semibold text-purple-600 dark:text-purple-300">
                        {q.serviceRequired}
                      </td>
                      <td className="p-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                        {q.budgetRange}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">
                        {q.timeline}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          q.status === 1 ? 'bg-amber-100 text-amber-800' :
                          q.status === 2 ? 'bg-blue-100 text-blue-800' :
                          q.status === 4 ? 'bg-purple-100 text-purple-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {q.status === 1 ? 'New' : q.status === 2 ? 'In Review' : q.status === 4 ? 'Quoted' : 'Active'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <select
                          value={q.status}
                          onChange={(e) => handleQuoteStatus(q.id, parseInt(e.target.value))}
                          className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[11px] focus:outline-none focus:border-[#9B7EDE]"
                        >
                          <option value={1}>Set New</option>
                          <option value={2}>Set In Review</option>
                          <option value={3}>Set Contacted</option>
                          <option value={4}>Set Quoted</option>
                          <option value={5}>Set Accepted</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inquiries & Job Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-purple-900/30 space-y-4">
            <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Recent Contact Inquiries
            </h3>
            <div className="space-y-3">
              {!stats?.recentInquiries || stats.recentInquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No contact messages received yet.</p>
              ) : (
                stats.recentInquiries.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-colors ${
                      m.isRead
                        ? 'bg-slate-50/50 dark:bg-purple-950/20 border-slate-200 dark:border-purple-900/20'
                        : 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {m.fullName} ({m.email})
                      </span>
                      {!m.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(m.id)}
                          className="text-[10px] text-purple-600 dark:text-purple-300 font-bold hover:underline"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{m.subject}</div>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {m.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Job Applications */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-purple-900/30 space-y-4">
            <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Recent Job Applications
            </h3>
            <div className="space-y-3">
              {!stats?.recentApplications || stats.recentApplications.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No job applications submitted yet.</p>
              ) : (
                stats.recentApplications.map((a) => (
                  <div
                    key={a.id}
                    className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-purple-950/20 border border-slate-200 dark:border-purple-900/20 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {a.applicantName}
                      </span>
                      <span className="text-[11px] font-mono text-[#9B7EDE]">
                        {a.jobTitle}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px]">{a.email} • {a.phone}</div>
                    {a.resumeFilePath && (
                      <div className="pt-1">
                        <a
                          href={`/api/v1/careers/applications/resume?path=${encodeURIComponent(a.resumeFilePath)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-300 hover:underline"
                        >
                          <span>📄 Download Candidate Resume</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
