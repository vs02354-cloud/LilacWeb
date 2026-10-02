import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, Smartphone, Code2, Cloud, Palette, Briefcase, 
  ShieldCheck, Headphones, ArrowRight, CheckCircle2, Sparkles 
} from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { servicesApi } from '../services/api';
import { CardSkeleton } from '../components/common/SkeletonLoader';

const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Code2: Code2,
  Cloud: Cloud,
  Palette: Palette,
  Briefcase: Briefcase,
  ShieldCheck: ShieldCheck,
  Headphones: Headphones,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await servicesApi.getAll();
        if (res.success) setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <SeoHelmet
        title="Enterprise IT Solutions & Digital Services"
        description="Explore LilacTechSys's 8 core specialized services: Web Development, Mobile Apps, Custom Software, Cloud & DevOps, UI/UX, Cybersecurity, IT Consulting, and 24/7 Support."
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
            <span>Full-Spectrum Digital Mastery</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']"
          >
            Engineered For Scale. <br />
            <span className="text-lilac-gradient">Built For Impact.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            From custom high-throughput software and cloud infrastructure to modern UX interfaces, our engineering practices deliver enterprise-grade performance and security.
          </motion.p>
        </div>
      </section>

      {/* Services List with Detailed Breakdown */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Globe;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-purple-900/40 relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Details (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#9B7EDE] flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            0{idx + 1} // PRACTICE AREA
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {service.detailedDescription}
                      </p>

                      {/* Features Bullet Points */}
                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Key Capabilities & Deliverables
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-[#9B7EDE] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center gap-4">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors"
                        >
                          <span>Explore Full Specs</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/quote?service=${encodeURIComponent(service.title)}`}
                          className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-300 hover:underline"
                        >
                          Get a Quote for this Service →
                        </Link>
                      </div>
                    </div>

                    {/* Right Tech & Enterprise Benefits (5 cols) */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-3">
                          Enterprise Value Proposition
                        </h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-[#9B7EDE] font-bold mt-0.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-purple-200/60 dark:border-purple-900/40">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-3">
                          Core Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-purple-950 text-slate-700 dark:text-purple-200 border border-purple-200 dark:border-purple-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-['Outfit']">
            Unsure Which Architecture Fits Your Horizon?
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
            Book a 30-minute discovery session with our Lead Solutions Architect. We will audit your current bottlenecks and present a phased technology blueprint.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/quote"
              className="px-6 py-3 rounded-xl bg-[#9B7EDE] hover:bg-[#8B6DD0] text-white font-semibold text-sm transition-colors"
            >
              Request Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
