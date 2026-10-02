import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, ExternalLink, Layers, Sparkles } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { projectsApi } from '../services/api';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await projectsApi.getBySlug(slug);
        if (res.success) setProject(res.data);
        else setError('Case study not found');
      } catch (err) {
        setError(err.message || 'Error loading project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#9B7EDE] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading case study details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-['Outfit']">Case Study Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The case study you requested could not be located.</p>
        <Link to="/portfolio" className="mt-6 inline-block px-6 py-2.5 bg-[#9B7EDE] text-white rounded-xl font-semibold text-sm">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <SeoHelmet
        title={project.title}
        description={project.summary}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-radial-hero relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/portfolio" className="hover:text-purple-600">Portfolio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#9B7EDE]">{project.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {project.categoryName}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white mt-4">
                {project.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {project.projectUrl && (
              <div className="shrink-0">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white/80 dark:bg-purple-950/40 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-purple-900/50 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className="w-4 h-4 text-[#9B7EDE]" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Banner Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 max-h-[500px]">
          <img
            src={project.bannerUrl || project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Quantifiable Results Metrics Bar */}
      {project.results && project.results.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.results.map((res, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl glass-card text-center border border-purple-200/60 dark:border-purple-900/40"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[#9B7EDE] font-['Outfit']">
                  {res.metric}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {res.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Study Body */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge */}
              <div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-4">
                  The Enterprise Challenge
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-purple-950/20 p-6 rounded-2xl border border-slate-200 dark:border-purple-900/30">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-4">
                  The Engineering Solution & Architecture
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
                {project.fullDescription && (
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                    {project.fullDescription}
                  </p>
                )}
              </div>

              {/* Gallery if present */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-4">
                    Visual Deliverables & Interface
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-md">
                        <img src={img} alt={`Gallery item ${idx + 1}`} className="w-full h-56 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Meta Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-purple-900/40 space-y-4">
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Project Snapshot
                </h4>
                <div className="text-xs space-y-3">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Enterprise Client</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{project.clientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Practice Domain</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{project.categoryName}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-semibold uppercase tracking-wider">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Card */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-[#9B7EDE] to-[#4B2E83] text-white space-y-4 shadow-xl">
                <h4 className="text-lg font-bold font-['Outfit']">
                  Facing Similar Architecture Challenges?
                </h4>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Our systems architects can audit your current infrastructure and outline a guaranteed scalability roadmap.
                </p>
                <Link
                  to="/quote"
                  className="block w-full py-2.5 px-4 rounded-xl bg-white text-purple-950 font-bold text-xs text-center hover:bg-purple-50 transition-colors"
                >
                  Schedule Solution Discovery Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
