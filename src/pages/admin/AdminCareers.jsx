import React, { useEffect, useState } from 'react';
import { 
  Briefcase, Users, Plus, Edit, Trash2, Download, CheckCircle2, 
  Clock, MapPin, Building, Sparkles, X, Filter, ExternalLink, MessageSquare
} from 'lucide-react';
import { careersApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminCareers = () => {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applicants'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    department: 'Engineering',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    description: '',
    requirements: '5+ years experience\nProficiency in modern stacks\nClean architecture mindset',
    responsibilities: 'Design and deliver scalable systems\nMentor junior developers\nCollaborate across teams',
    benefits: 'Competitive salary\nHealth insurance\nRemote flexibility',
    isActive: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        careersApi.getActive(),
        careersApi.getApplications({ page: 1, pageSize: 50 }),
      ]);
      if (jobsRes.success) setJobs(jobsRes.data || []);
      if (appsRes.success) setApplications(appsRes.data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenJobModal = (job = null) => {
    setErrorMessage('');
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title || '',
        slug: job.slug || '',
        department: job.department || 'Engineering',
        location: job.location || 'Remote',
        type: job.type || 'Full-time',
        experienceLevel: job.experienceLevel || 'Mid-Level',
        description: job.description || '',
        requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || ''),
        benefits: Array.isArray(job.benefits) ? job.benefits.join('\n') : (job.benefits || ''),
        isActive: job.isActive ?? true,
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        slug: '',
        department: 'Engineering',
        location: 'Bangalore, India (Hybrid)',
        type: 'Full-time',
        experienceLevel: 'Senior Level',
        description: '',
        requirements: '5+ years modern software architecture\nDemonstrated leadership\nStrong communication',
        responsibilities: 'Build reliable distributed systems\nDrive architectural discussions\nMaintain high code quality',
        benefits: 'Comprehensive health coverage\nAnnual learning stipend\nFlexible work hours',
        isActive: true,
      });
    }
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingJob ? prev.slug : generatedSlug
    }));
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split('\n').map(s => s.trim()).filter(Boolean),
        responsibilities: formData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
        benefits: formData.benefits.split('\n').map(s => s.trim()).filter(Boolean),
      };

      if (editingJob) {
        await careersApi.updateJob(editingJob.id, payload);
      } else {
        await careersApi.createJob(payload);
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save job position');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job opening?')) {
      try {
        await careersApi.deleteJob(id);
        fetchData();
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  const handleUpdateAppStatus = async (appId, newStatus) => {
    try {
      await careersApi.updateStatus(appId, { status: parseInt(newStatus, 10) });
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update applicant status');
    }
  };

  const getStatusBadge = (status) => {
    // 0: Pending, 1: UnderReview, 2: Shortlisted, 3: Interviewing, 4: Offered, 5: Rejected
    switch (status) {
      case 0:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800">New Pending</span>;
      case 1:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 border border-blue-200 dark:border-blue-800">Under Review</span>;
      case 2:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-600 border border-purple-200 dark:border-purple-800">Shortlisted</span>;
      case 3:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border border-indigo-200 dark:border-indigo-800">Interviewing</span>;
      case 4:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800">Offer Sent</span>;
      case 5:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">Pending</span>;
    }
  };

  return (
    <>
      <SeoHelmet title="Admin – Careers & ATS Pipeline" />

      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Talent & Recruitment Pipeline
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish job openings, review candidate resumes, and track talent applications.
            </p>
          </div>
          {activeTab === 'jobs' && (
            <button
              onClick={() => handleOpenJobModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lilac-600 hover:bg-lilac-700 text-white font-medium text-xs shadow-lg shadow-lilac-600/20 transition-all self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Job Opening</span>
            </button>
          )}
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-lilac-600 text-white shadow-md shadow-lilac-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Positions ({jobs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'applicants'
                ? 'bg-lilac-600 text-white shadow-md shadow-lilac-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applicant Pipeline ({applications.length})</span>
          </button>
        </div>

        {/* TAB 1: Job Openings */}
        {activeTab === 'jobs' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Role Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Employment Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400">Loading openings...</td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400">No job openings listed yet.</td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {job.title}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {job.experienceLevel}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {job.department}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-lilac-500" />
                            <span>{job.location}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {job.type}
                        </td>
                        <td className="py-3 px-4">
                          {job.isActive ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Active Hiring
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                              Closed
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenJobModal(job)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-lilac-600 hover:bg-lilac-50 dark:hover:bg-lilac-950/40 transition-colors"
                              title="Edit Position"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Position"
                            >
                              <Trash2 className="w-4 h-4" />
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
        )}

        {/* TAB 2: Applicant Pipeline */}
        {activeTab === 'applicants' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Applied Role</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Resume / CV</th>
                    <th className="py-3 px-4">Stage / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">Loading candidates...</td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-slate-400">No candidate applications received yet.</td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {app.applicantName}
                            </p>
                            {app.portfolioUrl && (
                              <a
                                href={app.portfolioUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-lilac-600 hover:underline flex items-center gap-1 mt-0.5"
                              >
                                Portfolio <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          {app.jobOpening?.title || 'General Application'}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          <div>
                            <p>{app.email}</p>
                            <p className="text-[11px] text-slate-400">{app.phone}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {app.resumeFilePath ? (
                            <a
                              href={`/api/v1/careers/applications/resume?path=${encodeURIComponent(app.resumeFilePath)}`}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-lilac-50 dark:bg-lilac-950/40 text-lilac-700 dark:text-lilac-300 hover:bg-lilac-100 text-[11px] font-medium transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{app.resumeFileName || 'Resume.pdf'}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">No file</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                            className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-lilac-500 cursor-pointer"
                          >
                            <option value={0}>0 - Pending</option>
                            <option value={1}>1 - Under Review</option>
                            <option value={2}>2 - Shortlisted</option>
                            <option value={3}>3 - Interviewing</option>
                            <option value={4}>4 - Offer Sent</option>
                            <option value={5}>5 - Rejected</option>
                          </select>
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

      {/* Modal for Creating / Editing Job Position */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lilac-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {editingJob ? 'Edit Job Opening' : 'Create Job Opening'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveJob} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {errorMessage && (
                <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 border border-rose-200 dark:border-rose-800">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g., Senior Full-Stack Cloud Architect"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bangalore / Remote"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Job Overview Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Key Requirements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Key Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded border-slate-300 text-lilac-600 focus:ring-lilac-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Role is actively open for public applications</span>
                  </label>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-lilac-600 hover:bg-lilac-700 text-white font-medium text-xs shadow-lg shadow-lilac-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingJob ? 'Update Position' : 'Publish Position'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCareers;
