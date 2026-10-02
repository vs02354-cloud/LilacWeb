import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { projectsApi, blogApi } from '../services/api';
import Pagination from '../components/common/Pagination';
import { ProjectSkeleton } from '../components/common/SkeletonLoader';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await blogApi.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch projects when category, search, or page changes
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await projectsApi.getAll({
          category: selectedCategory || undefined,
          searchTerm: searchTerm || undefined,
          pageNumber: page,
          pageSize: 6,
        });

        if (res.success && res.data) {
          setProjects(res.data.items);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProjects, 250);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchTerm, page]);

  return (
    <>
      <SeoHelmet
        title="Case Studies & Client Portfolio"
        description="Explore how LilacTechSys architects and scales digital systems for enterprise fintech, healthcare, and global logistics clients."
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
            <span>Proven Enterprise Impact</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']"
          >
            Case Studies & <br />
            <span className="text-lilac-gradient">Client Transformations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Real results for real enterprise leaders. See how we resolve concurrency bottlenecks, modernize architectures, and accelerate time-to-market.
          </motion.p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-purple-950/40 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <button
                onClick={() => { setSelectedCategory(''); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === ''
                    ? 'bg-[#9B7EDE] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-purple-950/30 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                }`}
              >
                All Practices
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => { setSelectedCategory(c.slug); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === c.slug
                      ? 'bg-[#9B7EDE] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-purple-950/30 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                placeholder="Search case studies..."
                id="portfolio-search-input"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-purple-900/40 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#9B7EDE]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base text-slate-500">No case studies match your filter criteria.</p>
              <button
                onClick={() => { setSelectedCategory(''); setSearchTerm(''); }}
                className="mt-4 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-52 overflow-hidden bg-slate-800 relative">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-purple-950/90 text-purple-700 dark:text-purple-200 backdrop-blur-md">
                        {project.categoryName}
                      </span>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-mono text-purple-600 dark:text-purple-300">
                        Client: {project.clientName}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] mt-1 leading-snug group-hover:text-[#9B7EDE] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack?.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-50 dark:bg-purple-950/50 text-slate-700 dark:text-purple-200 border border-purple-200/60 dark:border-purple-800/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-between mt-4">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:text-purple-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#9B7EDE] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </section>
    </>
  );
};

export default Portfolio;
