import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles, 
  DollarSign, Clock, Layers, ShieldCheck, AlertCircle 
} from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { quoteApi } from '../services/api';

const RequestQuote = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceRequired: preselectedService || 'Web Development',
    budgetRange: '$10k - $25k',
    timeline: '1-3 Months',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    { title: 'Web Development', desc: 'Custom enterprise web portals, SaaS platforms, and PWAs' },
    { title: 'Mobile App Development', desc: 'iOS, Android, and cross-platform Flutter/React Native' },
    { title: 'Custom Software Engineering', desc: 'Bespoke automation, ERP integrations, and high-scale APIs' },
    { title: 'Cloud & DevOps', desc: 'Kubernetes, multi-cloud failover, CI/CD pipelines, and AWS/Azure' },
    { title: 'UI/UX Design & Strategy', desc: 'Figma design systems, accessibility audits, and interactive prototypes' },
    { title: 'Cybersecurity & Compliance', desc: 'Zero-trust perimeter architecture, SOC 2, and penetration testing' },
    { title: 'IT Consulting & Advisory', desc: 'CTO-level roadmap planning, architecture audits, and tech modernization' },
    { title: 'Maintenance & 24/7 Support', desc: 'SLA-backed uptime guarantees, continuous patching, and site reliability' },
  ];

  const budgetOptions = [
    { range: '$5k - $10k', label: 'Pilot / MVP Phase', note: 'Ideal for initial proof-of-concept and scoped prototypes' },
    { range: '$10k - $25k', label: 'Mid-Scale Application', note: 'Production web or mobile app with core integrations' },
    { range: '$25k - $50k', label: 'Enterprise Platform', note: 'Comprehensive multi-tenant SaaS with cloud orchestration' },
    { range: '$50k+', label: 'Global Infrastructure Overhaul', note: 'Large-scale distributed systems and multi-team initiatives' },
  ];

  const timelineOptions = [
    { time: 'Within 1 Month', label: 'Urgent Sprint', note: 'Rapid deployment with allocated dedicated squad' },
    { time: '1-3 Months', label: 'Standard Delivery', note: 'Standard phased delivery with bi-weekly milestone releases' },
    { time: '3-6 Months', label: 'Long-Term Program', note: 'End-to-end modernization with phased migrations' },
    { time: 'Flexible', label: 'Discovery & Planning First', note: 'Exploring architecture before fixing strict launch dates' },
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9B7EDE', '#4B2E83', '#6366F1', '#38BDF8'],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await quoteApi.submit(formData);
      if (res.success) {
        setSubmitted(true);
        triggerConfetti();
      } else {
        setErrorMessage(res.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error transmitting quote request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHelmet
        title="Request a Custom Project Quote"
        description="Configure your digital project specifications and get a comprehensive scope, timeline, and pricing breakdown from LilacTechSys."
      />

      <section className="pt-32 pb-24 md:pt-40 md:pb-28 bg-radial-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300/50 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9B7EDE]" />
              <span>Multi-Step Solution Estimator</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']">
              Request a Custom <span className="text-lilac-gradient">Project Quote</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Tell us about your technical goals. We will prepare an architectural roadmap, milestone timeline, and fixed proposal.
            </p>
          </div>

          {/* Step Progress Bar */}
          {!submitted && (
            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                {['Service', 'Budget', 'Timeline', 'Details'].map((name, idx) => (
                  <div key={name} className="flex flex-col items-center">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step > idx + 1
                          ? 'bg-emerald-500 text-white'
                          : step === idx + 1
                          ? 'bg-[#9B7EDE] text-white shadow-md shadow-purple-500/30'
                          : 'bg-slate-200 dark:bg-purple-950/40 text-slate-500'
                      }`}
                    >
                      {step > idx + 1 ? '✓' : idx + 1}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1.5 bg-slate-200 dark:bg-purple-950/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-purple-900/40 shadow-xl relative overflow-hidden">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                  Quote Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-purple-600 dark:text-purple-300">{formData.fullName}</span>! Our principal architects are reviewing your specifications for <span className="font-semibold text-purple-600 dark:text-purple-300">{formData.serviceRequired}</span> and will deliver a detailed proposal to <span className="font-semibold text-purple-600 dark:text-purple-300">{formData.email}</span> within 24 hours.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <Link
                    to="/"
                    className="px-6 py-2.5 rounded-xl bg-[#9B7EDE] text-white text-xs sm:text-sm font-semibold hover:bg-[#8B6DD0] transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* STEP 1: SERVICE */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                        Step 1: Which core service practice do you need?
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Select the primary service discipline for your project.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {servicesList.map((s) => (
                        <div
                          key={s.title}
                          onClick={() => setFormData({ ...formData, serviceRequired: s.title })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            formData.serviceRequired === s.title
                              ? 'border-[#9B7EDE] bg-purple-50/80 dark:bg-purple-950/50 shadow-sm ring-1 ring-[#9B7EDE]'
                              : 'border-slate-200 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
                              {s.title}
                            </span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                formData.serviceRequired === s.title
                                  ? 'border-[#9B7EDE] bg-[#9B7EDE]'
                                  : 'border-slate-300'
                              }`}
                            >
                              {formData.serviceRequired === s.title && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-2.5 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md"
                      >
                        <span>Continue to Budget</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: BUDGET */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                        Step 2: What is your estimated investment budget?
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">This allows us to calibrate architecture complexity and team allocation.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {budgetOptions.map((b) => (
                        <div
                          key={b.range}
                          onClick={() => setFormData({ ...formData, budgetRange: b.range })}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            formData.budgetRange === b.range
                              ? 'border-[#9B7EDE] bg-purple-50/80 dark:bg-purple-950/50 shadow-sm ring-1 ring-[#9B7EDE]'
                              : 'border-slate-200 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-extrabold text-[#9B7EDE] font-['Outfit']">
                              {b.range}
                            </span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                formData.budgetRange === b.range
                                  ? 'border-[#9B7EDE] bg-[#9B7EDE]'
                                  : 'border-slate-300'
                              }`}
                            >
                              {formData.budgetRange === b.range && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2">
                            {b.label}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {b.note}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md"
                      >
                        <span>Continue to Timeline</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: TIMELINE */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                        Step 3: What is your targeted project timeline?
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Let us know how quickly you plan to initiate and ship.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {timelineOptions.map((t) => (
                        <div
                          key={t.time}
                          onClick={() => setFormData({ ...formData, timeline: t.time })}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            formData.timeline === t.time
                              ? 'border-[#9B7EDE] bg-purple-50/80 dark:bg-purple-950/50 shadow-sm ring-1 ring-[#9B7EDE]'
                              : 'border-slate-200 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                              {t.time}
                            </span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                formData.timeline === t.time
                                  ? 'border-[#9B7EDE] bg-[#9B7EDE]'
                                  : 'border-slate-300'
                              }`}
                            >
                              {formData.timeline === t.time && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-[#9B7EDE] mt-1">
                            {t.label}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {t.note}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-6 py-2.5 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md"
                      >
                        <span>Final Step: Contact Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT & DETAILS */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
                        Step 4: Contact details & project specifications
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">We will send your custom architectural breakdown to this address.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs flex flex-wrap gap-4 text-purple-900 dark:text-purple-200">
                      <span><strong>Service:</strong> {formData.serviceRequired}</span>
                      <span><strong>Budget:</strong> {formData.budgetRange}</span>
                      <span><strong>Timeline:</strong> {formData.timeline}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Sarah Jenkins"
                          id="quote-fullname-input"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@company.com"
                          id="quote-email-input"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Aura Financial Group"
                          id="quote-company-input"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          id="quote-phone-input"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Brief Project Description & Architecture Goals *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Describe your current systems, required features, user scale, or known bottlenecks..."
                        id="quote-description-input"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        id="quote-final-submit-btn"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'Transmitting Request...' : 'Submit Quote Request'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestQuote;
