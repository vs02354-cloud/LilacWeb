import React, { useEffect, useState } from 'react';
import { 
  FileText, Mail, Send, CheckCircle2, Clock, 
  Search, Eye, ExternalLink, Calendar, Building, DollarSign, X
} from 'lucide-react';
import { contactApi, quoteApi, newsletterApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminSubmissions = () => {
  const [activeTab, setActiveTab] = useState('quotes'); // 'quotes', 'inquiries', 'newsletter'
  const [quotes, setQuotes] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [quoteRes, contactRes, subRes] = await Promise.all([
        quoteApi.getAll({ page: 1, pageSize: 50 }),
        contactApi.getAll({ page: 1, pageSize: 50 }),
        newsletterApi.getSubscribers(),
      ]);

      if (quoteRes.success) setQuotes(quoteRes.data.items || []);
      if (contactRes.success) setInquiries(contactRes.data.items || []);
      if (subRes.success) setSubscribers(subRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateQuoteStatus = async (quoteId, status) => {
    try {
      await quoteApi.updateStatus(quoteId, { status: parseInt(status, 10) });
      fetchData();
      if (selectedQuote && selectedQuote.id === quoteId) {
        setSelectedQuote(prev => ({ ...prev, status: parseInt(status, 10) }));
      }
    } catch (err) {
      alert(err.message || 'Failed to update quote status');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactApi.markRead(id);
      fetchData();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => ({ ...prev, isRead: true }));
      }
    } catch (err) {
      alert(err.message || 'Failed to mark inquiry as read');
    }
  };

  const getQuoteStatusBadge = (status) => {
    // 0: Pending, 1: InReview, 2: Quoted, 3: Accepted, 4: Declined
    switch (status) {
      case 0:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800">Pending Review</span>;
      case 1:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 border border-blue-200 dark:border-blue-800">In Review</span>;
      case 2:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-600 border border-purple-200 dark:border-purple-800">Estimate Sent</span>;
      case 3:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800">Won / Accepted</span>;
      case 4:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800">Declined</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">Pending</span>;
    }
  };

  return (
    <>
      <SeoHelmet title="Admin – Inquiries & Project Quotes" />

      <div className="space-y-6">
        {/* Header bar */}
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
            Lead Capture & Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage inbound RFQs, contact messages, and newsletter subscribers.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-lilac-600 text-white shadow-md shadow-lilac-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Project Quotes ({quotes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-lilac-600 text-white shadow-md shadow-lilac-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Inquiries ({inquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'newsletter'
                ? 'bg-lilac-600 text-white shadow-md shadow-lilac-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>
        </div>

        {/* TAB 1: Quote Requests */}
        {activeTab === 'quotes' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Client / Company</th>
                    <th className="py-3 px-4">Services Selected</th>
                    <th className="py-3 px-4">Budget Range</th>
                    <th className="py-3 px-4">Timeline</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400">Loading quotes...</td>
                    </tr>
                  ) : quotes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400">No project quotes received yet.</td>
                    </tr>
                  ) : (
                    quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {q.fullName}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {q.companyName || 'Individual'} • {q.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-lilac-50 dark:bg-lilac-950/40 text-lilac-700 dark:text-lilac-300">
                            {q.servicesNeeded || 'Full Stack'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {q.estimatedBudget || '$10k - $25k'}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {q.targetTimeline || '1-3 Months'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                            className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-lilac-500 cursor-pointer"
                          >
                            <option value={0}>0 - Pending</option>
                            <option value={1}>1 - In Review</option>
                            <option value={2}>2 - Estimate Sent</option>
                            <option value={3}>3 - Won / Accepted</option>
                            <option value={4}>4 - Declined</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedQuote(q)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-lilac-600 hover:bg-lilac-50 dark:hover:bg-lilac-950/40 transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Contact Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Sender</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Message Snippet</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">Loading messages...</td>
                    </tr>
                  ) : inquiries.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">No contact inquiries yet.</td>
                    </tr>
                  ) : (
                    inquiries.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {m.fullName}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {m.email} {m.phone ? `• ${m.phone}` : ''}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                          {m.subject || 'General Inquiry'}
                        </td>
                        <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                          {m.message}
                        </td>
                        <td className="py-3 px-4">
                          {m.isRead ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Read
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lilac-600 bg-lilac-50 dark:bg-lilac-950/40 px-2 py-0.5 rounded-full border border-lilac-200 dark:border-lilac-800">
                              New
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedInquiry(m);
                              if (!m.isRead) handleMarkAsRead(m.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-lilac-600 hover:bg-lilac-50 dark:hover:bg-lilac-950/40 transition-colors"
                            title="View Full Message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Subscribers */}
        {activeTab === 'newsletter' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Subscriber Email</th>
                    <th className="py-3 px-4">Subscribed Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-10 text-slate-400">Loading subscribers...</td>
                    </tr>
                  ) : subscribers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-10 text-slate-400">No newsletter subscribers yet.</td>
                    </tr>
                  ) : (
                    subscribers.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {sub.email}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active Subscriber
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Quote Inspection Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Project Quote Request Details
              </h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block">Client:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedQuote.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Company:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedQuote.companyName || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <a href={`mailto:${selectedQuote.email}`} className="text-lilac-600 hover:underline">{selectedQuote.email}</a>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone:</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedQuote.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Estimated Budget:</span>
                  <span className="font-bold text-emerald-600">{selectedQuote.estimatedBudget || '$10,000+'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Target Timeline:</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedQuote.targetTimeline || 'Immediate'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Services Requested:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200">
                  {selectedQuote.servicesNeeded || 'Custom Solutions'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Scope & Technical Specifications:</span>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedQuote.projectScope || 'No additional scope provided.'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Update Stage:</span>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateQuoteStatus(selectedQuote.id, e.target.value)}
                    className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium cursor-pointer"
                  >
                    <option value={0}>0 - Pending</option>
                    <option value={1}>1 - In Review</option>
                    <option value={2}>2 - Estimate Sent</option>
                    <option value={3}>3 - Won / Accepted</option>
                    <option value={4}>4 - Declined</option>
                  </select>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2 rounded-xl bg-lilac-600 text-white font-medium hover:bg-lilac-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Message Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Contact Inquiry Message
              </h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <p><span className="text-slate-400">From:</span> <strong className="text-slate-900 dark:text-white">{selectedInquiry.fullName}</strong> ({selectedInquiry.email})</p>
                {selectedInquiry.phone && <p><span className="text-slate-400">Phone:</span> {selectedInquiry.phone}</p>}
                <p><span className="text-slate-400">Subject:</span> {selectedInquiry.subject || 'General Inquiry'}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Message:</span>
                <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject || 'Inquiry to LilacTechSys')}`}
                  className="px-4 py-2 rounded-xl bg-lilac-600 text-white font-medium hover:bg-lilac-700 transition-colors"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSubmissions;
