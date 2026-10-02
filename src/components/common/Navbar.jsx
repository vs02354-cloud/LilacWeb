import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles, Layers, ShieldCheck, UserCheck, LogIn, LayoutDashboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group" id="navbar-brand">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B7EDE] to-[#4B2E83] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-xl font-['Outfit'] tracking-tighter">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Lilac<span className="text-[#9B7EDE]">TechSys</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-purple-300/70 tracking-widest uppercase -mt-1 hidden sm:block">
                Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative ${
                  isActive(link.path)
                    ? 'text-purple-600 dark:text-purple-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50/50 dark:hover:bg-purple-950/30'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#9B7EDE] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />

            {/* Admin Login / Dashboard Quick Button */}
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                id="navbar-admin-btn"
                title="Admin Dashboard"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-xs font-bold transition-all shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4 text-[#9B7EDE]" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                id="navbar-login-btn"
                title="Admin Portal Login"
                aria-label="Admin Login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white/80 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-300 dark:hover:border-purple-800 shadow-sm backdrop-blur-md transition-all text-xs font-bold hover:scale-[1.03] active:scale-[0.98]"
              >
                <LogIn className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Login</span>
              </Link>
            )}

            {/* Request a Quote Button */}
            <Link
              to="/quote"
              id="navbar-quote-btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              id="mobile-navbar-login-btn"
              title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
              aria-label={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white/80 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 hover:text-purple-600"
            >
              {isAuthenticated ? (
                <LayoutDashboard className="w-5 h-5 text-[#9B7EDE]" />
              ) : (
                <LogIn className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white/80 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-nav border-b border-slate-200 dark:border-purple-900/40 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-purple-100/70 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-200 dark:border-purple-900/40 flex flex-col gap-2">
              <Link
                to="/quote"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white font-semibold text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/admin/dashboard"
                  className="w-full py-2.5 px-4 rounded-xl border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-center font-medium"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="w-full py-2.5 px-4 text-xs text-center text-slate-500 dark:text-slate-400 hover:underline"
                >
                  Admin Portal Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
