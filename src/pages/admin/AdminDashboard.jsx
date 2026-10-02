import React, { useEffect, useState } from 'react';
import { 
  Inbox, Clock, RefreshCw, CheckCircle2, ArrowRight, Eye, 
  Search, Filter, ExternalLink, Calendar, Building, DollarSign, 
  Sparkles, Layers, Briefcase, FileText, Users, AlertCircle, 
  Copy, Check, ChevronRight, X, ArrowUpRight, ShieldCheck, Mail
} from 'lucide-react';
import { dashboardApi, contactApi, quoteApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'today', 'pending', 'followup', 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await dashboardApi.getStats();
      if (res && res.success) {
        setStats(res.data);
        setError(null);
      } else {
        setError(res?.message || 'Failed to load telemetry data');
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
      setError(err?.message || 'Could not connect to backend service');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleStageChange = async (submission, newStage) => {
    setActionLoading(true);
    try {
      await dashboardApi.updateStage(submission.type, submission.id, newStage);
      await fetchStats();
      if (selectedSubmission && selectedSubmission.id === submission.id) {
        setSelectedSubmission(prev => ({
          ...prev,
          stage: newStage,
          specificStatus: newStage === 'Completed' ? 'Quoted/Won' : (newStage === 'FollowUp' ? 'In Review' : 'New')
        }));
      }
    } catch (err) {
      alert(err.message || 'Failed to update submission stage');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter submissions
  const allSubmissions = Array.isArray(stats?.submissions) ? stats.submissions : [];
  const filteredSubmissions = allSubmissions.filter((item) => {
    if (!item) return false;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch = 
      (item.trackingCode || '').toLowerCase().includes(q) ||
      (item.clientName || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.organization || '').toLowerCase().includes(q) ||
      (item.titleOrService || '').toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeFilter === 'today') return !!item.isToday;
    if (activeFilter === 'pending') return item.stage === 'Pending';
    if (activeFilter === 'followup') return item.stage === 'FollowUp';
    if (activeFilter === 'completed') return item.stage === 'Completed';

    return true;
  });

  const todayMetrics = stats?.todayProgress || {
    receivedToday: 0,
    completedToday: 0,
    currentlyPending: 0,
    inFollowUpStage: 0,
    completionRate: 0
  };

  const weeklyTrend = Array.isArray(stats?.weeklyTrend) ? stats.weeklyTrend : [];
  const maxWeeklyCount = weeklyTrend.length > 0
    ? Math.max(...weeklyTrend.map(t => Math.max(t?.received || t?.Received || 0, t?.completed || t?.Completed || 0, 1)), 5)
    : 5;

  const totalCount = allSubmissions.length;
  const pendingCount = allSubmissions.filter(x => x?.stage === 'Pending').length;
  const followUpCount = allSubmissions.filter(x => x?.stage === 'FollowUp').length;
  const completedCount = allSubmissions.filter(x => x?.stage === 'Completed').length;

  if (loading && !stats) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-[#9B7EDE] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-base font-bold font-['Outfit'] text-slate-800 dark:text-slate-200">
          Loading Operational Telemetry...
        </h3>
        <p className="text-xs text-slate-500 mt-1">Connecting to live PostgreSQL intake pipeline...</p>
      </div>
    );
  }

  return (
    <>
      <SeoHelmet title="Admin Console – Daily Intake & Status Command Center" />

      <div className="space-y-7">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0c0a1a] p-6 rounded-3xl border border-slate-200 dark:border-purple-900/30 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Intake Stream
              </span>
              <span className="text-xs text-slate-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-900 dark:text-white">
              Daily Operations & Status Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time breakdown of codes, project quotes, and client requests received today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-slate-50 dark:bg-purple-950/20 text-slate-700 dark:text-purple-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-purple-900/40 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#9B7EDE]' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Sync Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* Optional Error Alert Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={handleRefresh}
              className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer text-xs"
            >
              Retry
            </button>
          </div>
        )}

        {/* 4 PRIMARY OPERATIONAL STATUS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* CARD 1: CODES RECEIVED TODAY */}
          <div 
            onClick={() => setActiveFilter('today')}
            className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
              activeFilter === 'today'
                ? 'bg-purple-50/90 dark:bg-purple-950/50 border-[#9B7EDE] ring-2 ring-[#9B7EDE]/30 shadow-lg'
                : 'bg-white dark:bg-[#0c0a1a] border-slate-200 dark:border-purple-900/30 hover:border-[#9B7EDE]/50 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-['Outfit']">
                Received Today
              </span>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-[#9B7EDE] flex items-center justify-center shadow-sm">
                <Inbox className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black font-['Outfit'] text-slate-900 dark:text-white">
                {todayMetrics.receivedToday}
              </span>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                Codes / RFQs
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-purple-900/20">
              <span className="text-slate-500">Intake Today</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {todayMetrics.receivedToday > 0 ? `${todayMetrics.receivedToday} new codes` : 'No new codes yet'}
              </span>
            </div>
          </div>

          {/* CARD 2: CURRENTLY PENDING */}
          <div 
            onClick={() => setActiveFilter('pending')}
            className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
              activeFilter === 'pending'
                ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                : 'bg-white dark:bg-[#0c0a1a] border-slate-200 dark:border-purple-900/30 hover:border-amber-400/50 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-['Outfit']">
                Currently Pending
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black font-['Outfit'] text-slate-900 dark:text-white">
                {todayMetrics.currentlyPending}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                Awaiting Review
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-purple-900/20">
              <span className="text-slate-500">Action Required</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                Immediate response needed
              </span>
            </div>
          </div>

          {/* CARD 3: IN FOLLOW-UP STAGE */}
          <div 
            onClick={() => setActiveFilter('followup')}
            className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
              activeFilter === 'followup'
                ? 'bg-blue-50/90 dark:bg-blue-950/30 border-blue-500 ring-2 ring-blue-500/30 shadow-lg'
                : 'bg-white dark:bg-[#0c0a1a] border-slate-200 dark:border-purple-900/30 hover:border-blue-400/50 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Outfit']">
                In Follow-Up Stage
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                <RefreshCw className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black font-['Outfit'] text-slate-900 dark:text-white">
                {todayMetrics.inFollowUpStage}
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                In Discussion
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-purple-900/20">
              <span className="text-slate-500">Pipeline Stage</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Active client contact
              </span>
            </div>
          </div>

          {/* CARD 4: COMPLETED TODAY */}
          <div 
            onClick={() => setActiveFilter('completed')}
            className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
              activeFilter === 'completed'
                ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                : 'bg-white dark:bg-[#0c0a1a] border-slate-200 dark:border-purple-900/30 hover:border-emerald-400/50 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-['Outfit']">
                Completed
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black font-['Outfit'] text-slate-900 dark:text-white">
                {completedCount}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Resolved / Won
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-purple-900/20">
              <span className="text-slate-500">Completion Rate</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {todayMetrics.completionRate}%
              </span>
            </div>
          </div>
        </div>

        {/* VISUAL CHARTS & PIPELINE BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 7-DAY VOLUME TREND CHART (SVG) */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0c0a1a] p-6 rounded-3xl border border-slate-200 dark:border-purple-900/30 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                  7-Day Inbound Volume vs. Resolution Velocity
                </h3>
                <p className="text-xs text-slate-500">
                  Daily comparison of incoming requests versus completed proposals.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#9B7EDE]" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Received</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Completed</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Bar Chart */}
            <div className="h-52 w-full flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2 border-b border-slate-100 dark:border-purple-900/20">
              {weeklyTrend.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-xs text-slate-400">
                  <span>No intake data recorded in this period</span>
                </div>
              ) : (
                weeklyTrend.map((dayItem, idx) => {
                  const dayReceived = dayItem?.received ?? dayItem?.Received ?? 0;
                  const dayCompleted = dayItem?.completed ?? dayItem?.Completed ?? 0;
                  const receivedHeight = Math.max(Math.round((dayReceived / maxWeeklyCount) * 160), 8);
                  const completedHeight = Math.max(Math.round((dayCompleted / maxWeeklyCount) * 160), 4);
                  const isCurrentDay = idx === weeklyTrend.length - 1;
                  const dayLabel = dayItem?.day || dayItem?.Day || '';
                  const rawDate = dayItem?.date || dayItem?.Date || '';
                  const dayOfMonth = rawDate.includes(' ') ? rawDate.split(' ')[1] : rawDate;

                  return (
                    <div key={rawDate || idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      {/* Hover tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        {rawDate}: {dayReceived} received, {dayCompleted} completed
                      </div>

                      <div className="w-full max-w-[42px] flex items-end justify-center gap-1.5 h-full">
                        {/* Received Bar */}
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isCurrentDay ? 'bg-gradient-to-t from-[#4B2E83] to-[#9B7EDE] shadow-md shadow-purple-500/20' : 'bg-purple-400 dark:bg-purple-900/80 hover:bg-[#9B7EDE]'
                          }`}
                          style={{ height: `${receivedHeight}px` }}
                        />
                        {/* Completed Bar */}
                        <div 
                          className="w-full rounded-t-lg bg-emerald-500 dark:bg-emerald-600 transition-all duration-300 hover:bg-emerald-400"
                          style={{ height: `${completedHeight}px` }}
                        />
                      </div>

                      <div className="mt-2 text-center">
                        <span className={`block text-[11px] font-bold ${isCurrentDay ? 'text-[#9B7EDE]' : 'text-slate-600 dark:text-slate-400'}`}>
                          {dayLabel}
                        </span>
                        <span className="block text-[9px] text-slate-400">
                          {dayOfMonth}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* STATUS PIPELINE DISTRIBUTION */}
          <div className="bg-white dark:bg-[#0c0a1a] p-6 rounded-3xl border border-slate-200 dark:border-purple-900/30 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                Intake Stage Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current operational split across all tracked codes.
              </p>

              {/* Progress Breakdown Bar */}
              <div className="mt-6 space-y-3">
                <div className="h-3 w-full bg-slate-100 dark:bg-purple-950/40 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${totalCount > 0 ? (pendingCount / totalCount) * 100 : 33}%` }} 
                    className="bg-amber-400 transition-all duration-500" 
                    title={`Pending: ${pendingCount}`}
                  />
                  <div 
                    style={{ width: `${totalCount > 0 ? (followUpCount / totalCount) * 100 : 33}%` }} 
                    className="bg-blue-500 transition-all duration-500" 
                    title={`Follow-Up: ${followUpCount}`}
                  />
                  <div 
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 34}%` }} 
                    className="bg-emerald-500 transition-all duration-500" 
                    title={`Completed: ${completedCount}`}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Pending Action</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {pendingCount} ({totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0}%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Follow-Up Stage</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {followUpCount} ({totalCount > 0 ? Math.round((followUpCount / totalCount) * 100) : 0}%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Completed / Won</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {completedCount} ({totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily SLA Resolution Metric */}
            <div className="mt-6 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-purple-900 dark:text-purple-200 font-['Outfit']">
                    First-Contact Target SLA
                  </span>
                  <span className="block text-[11px] text-purple-700 dark:text-purple-300 mt-0.5">
                    Target: &lt; 2 Hours for New RFQs
                  </span>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#9B7EDE]" />
              </div>
            </div>
          </div>
        </div>

        {/* STATUS-WISE DETAILS TABLE & WORKFLOW TRACKER */}
        <div className="bg-white dark:bg-[#0c0a1a] rounded-3xl border border-slate-200 dark:border-purple-900/30 shadow-sm overflow-hidden">
          {/* Controls Bar: Filters & Search */}
          <div className="p-6 border-b border-slate-100 dark:border-purple-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white">
                Tracked Codes & Inbound Pipeline
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect submissions, advance workflow stages, and review client requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-purple-950/40 border border-slate-200 dark:border-purple-900/40 text-xs overflow-x-auto">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-white dark:bg-[#4B2E83] text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setActiveFilter('today')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeFilter === 'today'
                      ? 'bg-white dark:bg-[#4B2E83] text-purple-700 dark:text-purple-200 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Today ({todayMetrics.receivedToday})
                </button>
                <button
                  onClick={() => setActiveFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeFilter === 'pending'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveFilter('followup')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeFilter === 'followup'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Follow-Up ({followUpCount})
                </button>
                <button
                  onClick={() => setActiveFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeFilter === 'completed'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Completed ({completedCount})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search code, client, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-slate-50 dark:bg-purple-950/20 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#9B7EDE]"
                />
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-purple-950/30 text-slate-500 font-semibold border-b border-slate-100 dark:border-purple-900/20">
                <tr>
                  <th className="py-3.5 px-5">Tracking Code</th>
                  <th className="py-3.5 px-5">Client / Organization</th>
                  <th className="py-3.5 px-5">Service / Subject</th>
                  <th className="py-3.5 px-5">Time Received</th>
                  <th className="py-3.5 px-5">Current Stage</th>
                  <th className="py-3.5 px-5">Priority</th>
                  <th className="py-3.5 px-5 text-right">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-14 text-center text-slate-400">
                      No submissions found matching filter: <strong className="text-slate-600 dark:text-slate-300">{activeFilter}</strong>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((item, rowIdx) => (
                    <tr 
                      key={item.trackingCode || item.id || rowIdx} 
                      className={`hover:bg-slate-50/70 dark:hover:bg-purple-950/30 transition-colors ${
                        item.isToday ? 'bg-purple-50/30 dark:bg-purple-950/10' : ''
                      }`}
                    >
                      {/* Tracking Code */}
                      <td className="py-3.5 px-5 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-1 rounded-lg border border-purple-200 dark:border-purple-800 text-[11px]">
                            {item.trackingCode || 'N/A'}
                          </span>
                          {item.trackingCode && (
                            <button
                              onClick={() => handleCopyCode(item.trackingCode)}
                              title="Copy Tracking Code"
                              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                              {copiedCode === item.trackingCode ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Client / Organization */}
                      <td className="py-3.5 px-5">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {item.clientName || 'Direct Client'}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {item.organization || 'Direct'} {item.email ? `• ${item.email}` : ''}
                          </p>
                        </div>
                      </td>

                      {/* Service / Subject */}
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border border-slate-200 dark:border-purple-900/30">
                          {item.titleOrService || 'General Inquiry'}
                        </span>
                      </td>

                      {/* Time Received */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5">
                          {item.isToday && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600">
                              TODAY
                            </span>
                          )}
                          <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>

                      {/* Current Stage */}
                      <td className="py-3.5 px-5">
                        {item.stage === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <Clock className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                        {item.stage === 'FollowUp' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            <RefreshCw className="w-3 h-3" /> In Follow-Up
                          </span>
                        )}
                        {item.stage === 'Completed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-5">
                        <span className={`text-[11px] font-bold ${
                          item.priority === 'Urgent'
                            ? 'text-rose-600 dark:text-rose-400'
                            : item.priority === 'High'
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-slate-500'
                        }`}>
                          {item.priority}
                        </span>
                      </td>

                      {/* Workflow Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick stage toggle */}
                          {item.stage === 'Pending' && (
                            <button
                              onClick={() => handleStageChange(item, 'FollowUp')}
                              disabled={actionLoading}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Advance to Follow-Up"
                            >
                              Move to Follow-Up
                            </button>
                          )}

                          {item.stage === 'FollowUp' && (
                            <button
                              onClick={() => handleStageChange(item, 'Completed')}
                              disabled={actionLoading}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Mark Completed"
                            >
                              Mark Completed
                            </button>
                          )}

                          {item.stage === 'Completed' && (
                            <button
                              onClick={() => handleStageChange(item, 'FollowUp')}
                              disabled={actionLoading}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-purple-950/40 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Re-open into Follow-Up"
                            >
                              Re-open
                            </button>
                          )}

                          {/* View details */}
                          <button
                            onClick={() => setSelectedSubmission(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#9B7EDE] hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SUBMISSION INSPECTION MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0c0a1a] rounded-3xl border border-slate-200 dark:border-purple-900/40 shadow-2xl w-full max-w-xl p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-purple-900/20">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {selectedSubmission.trackingCode}
                </span>
                <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
                  Submission Details
                </span>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-purple-950/20 border border-slate-100 dark:border-purple-900/20">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Client Name</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedSubmission.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Organization</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedSubmission.organization}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                  <a href={`mailto:${selectedSubmission.email}`} className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
                    {selectedSubmission.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedSubmission.phone || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Target Practice / Discipline</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-purple-950/20 text-slate-800 dark:text-slate-200 font-semibold">
                  {selectedSubmission.titleOrService}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Estimated Budget / Scope Details</span>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-purple-950/20 text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                  {selectedSubmission.budgetOrScope}
                </div>
              </div>

              {/* Stage Transition Controls */}
              <div className="pt-4 border-t border-slate-100 dark:border-purple-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Update Stage:</span>
                  <div className="inline-flex rounded-xl border border-slate-200 dark:border-purple-900/40 p-0.5 bg-slate-50 dark:bg-purple-950/40">
                    <button
                      onClick={() => handleStageChange(selectedSubmission, 'Pending')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        selectedSubmission.stage === 'Pending'
                          ? 'bg-amber-500 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStageChange(selectedSubmission, 'FollowUp')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        selectedSubmission.stage === 'FollowUp'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Follow-Up
                    </button>
                    <button
                      onClick={() => handleStageChange(selectedSubmission, 'Completed')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        selectedSubmission.stage === 'Completed'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                <a
                  href={`mailto:${selectedSubmission.email}?subject=Regarding your LilacTechSys inquiry [${selectedSubmission.trackingCode}]`}
                  className="px-4 py-2 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 transition-all text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
