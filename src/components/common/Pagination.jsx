import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      className={`flex items-center justify-center gap-1.5 pt-8 ${className}`}
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="p-2 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/30 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
            currentPage === page
              ? 'bg-[#9B7EDE] text-white shadow-md shadow-purple-500/30'
              : 'border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/30 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/40'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="p-2 rounded-xl border border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/30 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
