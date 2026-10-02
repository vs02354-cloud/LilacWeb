import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, 
  UploadCloud, FileText, X, AlertCircle, Sparkles, Building 
} from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { careersApi } from '../services/api';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeJob, setActiveJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Application Modal state
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    coverLetter: '',
    portfolioUrl: '',
    resumeFile: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await careersApi.getActive();
        if (res.success) setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch careers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = ['All', ...new Set(jobs.map((j) => j.department))];

  const filteredJobs = selectedDepartment === 'All'
    ? jobs
    : jobs.filter((j) => j.department === selectedDepartment);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF document (.pdf).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Resume size must not exceed 5MB.');
        return;
      }
      setFormData({ ...formData, resumeFile: file });
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!formData.resumeFile) {
      setSubmitStatus({ state: 'error', message: 'Please attach your PDF resume.' });
      return;
    }

    setSubmitting(true);
    setSubmitStatus({ state: 'idle', message: '' });

    try {
      const data = new FormData();
      data.append('ApplicantName', formData.applicantName);
      data.append('Email', formData.email);
      data.append('Phone', formData.phone);
      data.append('CoverLetter', formData.coverLetter || '');
      data.append('PortfolioUrl', formData.portfolioUrl || '');
      data.append('ResumeFile', formData.resumeFile);

      const res = await careersApi.apply(activeJob.id, data);
      if (res.success) {
        setSubmitStatus({
          state: 'success',
          message: 'Your application has been received! Our talent acquisition team will review your profile within 48 hours.',
        });
        setFormData({
          applicantName: '',
          email: '',
          phone: '',
          coverLetter: '',
          portfolioUrl: '',
          resumeFile: null,
        });
      } else {
        setSubmitStatus({ state: 'error', message: res.message || 'Submission failed' });
      }
    } catch (err) {
      setSubmitStatus({ state: 'error', message: err.message || 'Error uploading application' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHelmet
        title="Careers & Engineering Opportunities"
        description="Join LilacTechSys. Work on high-scale enterprise cloud solutions, distributed .NET microservices, and human-centered design systems."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-radial-hero text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300/50 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9B7EDE]" />
            <span>Join Our Global Engineering Team</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']"
          >
            Build Meaningful Systems. <br />
            <span className="text-lilac-gradient">Elevate Your Career.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            We operate with autonomy, high technical standards, transparent compensation, and a remote-first culture built on trust and psychological safety.
          </motion.p>
        </div>
      </section>

      {/* Perks & Benefits Bar */}
      <section className="py-12 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Remote-First Culture', desc: 'Work from anywhere with home office equipment allowance' },
              { label: '$2,500 Learning Stipend', desc: 'Annual budget for tech conferences and professional certifications' },
              { label: 'Comprehensive Healthcare', desc: 'Full medical, dental, and wellness insurance coverage' },
              { label: 'Flexible Work Cadence', desc: 'Autonomous time management with focus time and zero micromanagement' },
            ].map((perk) => (
              <div key={perk.label} className="space-y-1">
                <div className="text-sm font-bold text-[#9B7EDE] font-['Outfit']">{perk.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{perk.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Department Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10">
            {departments.map((dep) => (
              <button
                key={dep}
                onClick={() => setSelectedDepartment(dep)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDepartment === dep
                    ? 'bg-[#9B7EDE] text-white shadow-sm'
                    : 'bg-white dark:bg-purple-950/30 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-purple-900/40 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                }`}
              >
                {dep}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-4 border-[#9B7EDE] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Loading open positions...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base text-slate-500">No active positions currently listed in this department.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200 dark:border-purple-900/40 hover:border-[#9B7EDE] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                        {job.department}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#9B7EDE]" />
                        <span>{job.location}</span>
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#9B7EDE]" />
                        <span>{job.type} • {job.experienceLevel}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveJob(job);
                        setIsApplying(true);
                        setSubmitStatus({ state: 'idle', message: '' });
                      }}
                      id={`apply-job-${job.slug}`}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-purple-500/30 transition-all flex items-center gap-2"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {isApplying && activeJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 dark:border-purple-900/50 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setIsApplying(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-semibold text-[#9B7EDE] uppercase tracking-wider">
                  Applying for Position
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
                  {activeJob.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activeJob.department} • {activeJob.location}
                </p>
              </div>

              {submitStatus.state === 'success' ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-300 font-['Outfit']">
                    Application Submitted!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    {submitStatus.message}
                  </p>
                  <button
                    onClick={() => setIsApplying(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Portfolio / GitHub / LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://github.com/yourhandle"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                    />
                  </div>

                  {/* Resume Upload (PDF only, max 5MB) */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Resume Document (PDF Only, Max 5MB) *
                    </label>
                    <div className="border-2 border-dashed border-purple-300 dark:border-purple-800/80 rounded-2xl p-4 text-center bg-purple-50/50 dark:bg-purple-950/20">
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        id="resume-file-upload"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="resume-file-upload"
                        className="cursor-pointer flex flex-col items-center gap-1.5"
                      >
                        <UploadCloud className="w-7 h-7 text-[#9B7EDE]" />
                        <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                          {formData.resumeFile ? formData.resumeFile.name : 'Click to select PDF resume'}
                        </span>
                        <span className="text-[11px] text-slate-400">PDF up to 5MB</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Cover Note or Highlights (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Share a brief overview of your key architectural achievements..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#9B7EDE]"
                    />
                  </div>

                  {submitStatus.state === 'error' && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitStatus.message}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white text-xs font-semibold shadow-md disabled:opacity-50"
                    >
                      {submitting ? 'Uploading Application...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Careers;
