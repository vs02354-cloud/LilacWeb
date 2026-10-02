import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle-btn"
      className={`relative p-2.5 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white/80 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300 shadow-sm backdrop-blur-md transition-all duration-200 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: [0.8, 1] }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
