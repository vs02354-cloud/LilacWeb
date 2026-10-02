import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const predefinedMessage = encodeURIComponent(
    'Hello LilacTechSys team! I am interested in discussing an enterprise software/cloud project.'
  );
  const whatsappUrl = `https://wa.me/18005452283?text=${predefinedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            className="mb-4 w-72 sm:w-80 rounded-2xl glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-900/50 shadow-2xl p-4 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  WA
                </div>
                <div>
                  <h6 className="text-xs font-semibold text-slate-900 dark:text-white">
                    Lilac Solutions Desk
                  </h6>
                  <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Close chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl my-2">
              👋 Hi there! Have an upcoming project or need architectural consulting? Connect with our senior engineers directly via WhatsApp.
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-direct-link"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Start WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open instant chat"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
      >
        <span className="relative">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          )}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </span>
        </span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
