import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';

const NotFound = () => {
  return (
    <>
      <SeoHelmet
        title="404 – Page Not Found"
        description="The page you were looking for does not exist on LilacTechSys."
      />

      <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 bg-radial-hero text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-3xl bg-purple-100 dark:bg-purple-950/80 text-[#9B7EDE] flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <h1 className="text-7xl font-extrabold text-[#9B7EDE] font-['Outfit'] tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mt-2">
            Page Coordinates Not Found
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The page or architectural resource you requested may have been relocated, restructured, or retired.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-purple-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
