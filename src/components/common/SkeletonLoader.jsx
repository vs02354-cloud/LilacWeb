import React from 'react';

export const CardSkeleton = () => (
  <div className="rounded-2xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-purple-950/20 p-6 animate-pulse space-y-4">
    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-purple-900/40" />
    <div className="h-5 w-2/3 bg-slate-200 dark:bg-purple-900/40 rounded" />
    <div className="space-y-2">
      <div className="h-3 w-full bg-slate-200 dark:bg-purple-900/30 rounded" />
      <div className="h-3 w-4/5 bg-slate-200 dark:bg-purple-900/30 rounded" />
    </div>
    <div className="pt-2 flex gap-2">
      <div className="h-6 w-16 bg-slate-200 dark:bg-purple-900/30 rounded-full" />
      <div className="h-6 w-16 bg-slate-200 dark:bg-purple-900/30 rounded-full" />
    </div>
  </div>
);

export const ProjectSkeleton = () => (
  <div className="rounded-2xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-purple-950/20 overflow-hidden animate-pulse">
    <div className="h-52 bg-slate-200 dark:bg-purple-900/40 w-full" />
    <div className="p-6 space-y-3">
      <div className="h-4 w-1/3 bg-purple-200 dark:bg-purple-900/50 rounded" />
      <div className="h-6 w-3/4 bg-slate-200 dark:bg-purple-900/40 rounded" />
      <div className="h-3 w-full bg-slate-200 dark:bg-purple-900/30 rounded" />
      <div className="h-3 w-5/6 bg-slate-200 dark:bg-purple-900/30 rounded" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full space-y-3 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-12 bg-slate-100 dark:bg-purple-950/30 rounded-xl w-full" />
    ))}
  </div>
);

export default { CardSkeleton, ProjectSkeleton, TableSkeleton };
