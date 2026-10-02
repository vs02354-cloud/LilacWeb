import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lilac_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lilac_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('lilac_cookie_consent', 'essential_only');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl glass-card bg-white/95 dark:bg-slate-900/95 shadow-2xl border border-slate-200 dark:border-purple-900/40 backdrop-blur-lg"
          id="cookie-consent-banner"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#9B7EDE] shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="space-y-2 flex-1">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-white font-['Outfit']">
                Cookie & Privacy Choices
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                LilacTechSys uses cookies to personalize technical resources, evaluate traffic telemetry, and ensure secure platform operations.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleAccept}
                  id="cookie-accept-btn"
                  className="px-3.5 py-1.5 rounded-lg bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  id="cookie-decline-btn"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
                >
                  Essential Only
                </button>
              </div>
            </div>

            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss cookie notice"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 -mt-1 -mr-1 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
