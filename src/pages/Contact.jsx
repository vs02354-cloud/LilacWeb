import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { contactApi } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ state: 'idle', message: '' });

    try {
      const res = await contactApi.submit(formData);
      if (res.success) {
        setStatus({
          state: 'success',
          message: res.message || 'Thank you for reaching out! Our solutions team will review your inquiry and respond within 24 hours.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus({ state: 'error', message: res.message || 'Submission failed.' });
      }
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Network error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const offices = [
    {
      city: 'Silicon Valley (HQ)',
      address: 'Tech Park Blvd, Suite 400, Silicon Corridor, CA 94025',
      phone: '+1 (800) 545-2283',
      email: 'us@lilactechsys.com',
      hours: 'Mon - Fri, 8:00 AM - 6:00 PM PST',
    },
    {
      city: 'Bangalore Tech Center',
      address: 'Indiranagar IT Hub, 100ft Road, Bangalore, KA 560038',
      phone: '+91 (80) 4122-8900',
      email: 'apac@lilactechsys.com',
      hours: 'Mon - Fri, 9:00 AM - 7:00 PM IST',
    },
    {
      city: 'London European Hub',
      address: 'Fintech Square, Canary Wharf, London E14 5AB',
      phone: '+44 20 7946 0991',
      email: 'emea@lilactechsys.com',
      hours: 'Mon - Fri, 9:00 AM - 5:30 PM GMT',
    },
  ];

  return (
    <>
      <SeoHelmet
        title="Contact Us & Global Offices"
        description="Connect with the LilacTechSys solutions engineering desk. Dedicated 24-hour response SLA on all enterprise inquiries."
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
            <span>Guaranteed 24-Hour Response SLA</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']"
          >
            Connect With Our <br />
            <span className="text-lilac-gradient">Solutions Architects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Have an upcoming project, migration, or infrastructure audit? Tell us about your goals and our engineering team will get back to you promptly.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-purple-900/40">
              <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
                Fill in the details below. We sign mutual NDAs before reviewing proprietary architectures.
              </p>

              {status.state === 'success' && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                    {status.message}
                  </p>
                </div>
              )}

              {status.state === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. David Thorne"
                      id="contact-fullname-input"
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
                      placeholder="david@company.com"
                      id="contact-email-input"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      id="contact-phone-input"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Subject / Project Scope *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Cloud Infrastructure Migration"
                      id="contact-subject-input"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Project Description & Requirements *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your current architecture, tech stack preferences, and timeline..."
                    id="contact-message-input"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  id="contact-submit-btn"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white font-semibold text-sm shadow-md hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitting Securely...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Right: Office Locations & Interactive Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-purple-900/40 space-y-2"
                  >
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#9B7EDE]" />
                      <span>{office.city}</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {office.address}
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1 border-t border-slate-100 dark:border-purple-900/30">
                      <span className="font-medium text-purple-600 dark:text-purple-300">{office.phone}</span>
                      <span>{office.hours}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Embedded Google Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-purple-900/40 h-64">
                <iframe
                  title="LilacTechSys Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.18664426569106!3d37.42777449247656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb6f59b66bb2d%3A0x6b801a2f64606771!2sPalo%20Alto%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
