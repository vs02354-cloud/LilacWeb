import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, GithubIcon } from './SocialIcons';
import { newsletterApi } from '../../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ state: 'loading', message: '' });
    try {
      const res = await newsletterApi.subscribe({ email });
      setStatus({ state: 'success', message: res.message || 'Subscribed successfully!' });
      setEmail('');
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Failed to subscribe.' });
    }
  };

  const services = [
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Mobile App Development', slug: 'mobile-app-development' },
    { name: 'Custom Software', slug: 'custom-software' },
    { name: 'Cloud & DevOps', slug: 'cloud-and-devops' },
    { name: 'UI/UX Design', slug: 'ui-ux-design' },
    { name: 'Cybersecurity & Compliance', slug: 'cybersecurity' },
    { name: 'IT Consulting & Advisory', slug: 'it-consulting' },
    { name: 'Maintenance & 24/7 Support', slug: 'maintenance-and-support' },
  ];

  const quickLinks = [
    { name: 'About Company', path: '/about' },
    { name: 'Portfolio & Case Studies', path: '/portfolio' },
    { name: 'Insights & Blog', path: '/blog' },
    { name: 'Careers & Hiring', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Request a Quote', path: '/quote' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-purple-950/40 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4B2E83]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#9B7EDE]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B7EDE] to-[#4B2E83] flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <span className="font-extrabold text-xl font-['Outfit']">L</span>
              </div>
              <span className="text-2xl font-bold font-['Outfit'] text-white tracking-tight">
                Lilac<span className="text-[#9B7EDE]">TechSys</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Smart IT Solutions. Seamless Digital Growth. We architect, engineer, and scale enterprise cloud platforms, bespoke applications, and resilient digital architectures.
            </p>

            <div className="pt-2 space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#9B7EDE] shrink-0" />
                <span>Tech Park Blvd, Suite 400, Silicon Corridor</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9B7EDE] shrink-0" />
                <a href="mailto:solutions@lilactechsys.com" className="hover:text-white transition-colors">
                  solutions@lilactechsys.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9B7EDE] shrink-0" />
                <span>+1 (800) 545-2283 / +91 (80) 4122-8900</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LilacTechSys on LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#9B7EDE] hover:text-white flex items-center justify-center transition-colors text-slate-400"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LilacTechSys on Twitter"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#9B7EDE] hover:text-white flex items-center justify-center transition-colors text-slate-400"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LilacTechSys on GitHub"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#9B7EDE] hover:text-white flex items-center justify-center transition-colors text-slate-400"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-['Outfit']">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-1 group"
                  >
                    <span>{service.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-purple-400 hover:underline text-xs font-semibold">
                  View All 8 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-['Outfit']">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-purple-300 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-['Outfit']">
              Tech Radar Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Bi-weekly engineering memos on cloud resilience, zero-trust security, and modern web architectures.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter corporate email"
                  id="newsletter-email-input"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#9B7EDE] focus:ring-1 focus:ring-[#9B7EDE] transition-all"
                  required
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  disabled={status.state === 'loading'}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {status.state === 'success' && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{status.message}</span>
                </p>
              )}
              {status.state === 'error' && (
                <p className="text-xs text-rose-400 mt-1">{status.message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LilacTechSys Solutions Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin/login" className="hover:text-purple-400 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
