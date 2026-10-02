import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, Smartphone, Code2, Cloud, Palette, Briefcase, 
  ShieldCheck, Headphones, ArrowRight, CheckCircle2, ChevronRight, Sparkles 
} from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { servicesApi } from '../services/api';

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

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      setError('');
      try {
        const [res, allRes] = await Promise.all([
          servicesApi.getBySlug(slug),
          servicesApi.getAll(),
        ]);

        if (res.success) setService(res.data);
        else setError('Service not found');

        if (allRes.success) setAllServices(allRes.data);
      } catch (err) {
        setError(err.message || 'Service could not be loaded');
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#9B7EDE] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading service specifications...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-40 pb-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-['Outfit']">Service Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The service practice area you requested does not exist or has been updated.</p>
        <Link to="/services" className="mt-6 inline-block px-6 py-2.5 bg-[#9B7EDE] text-white rounded-xl font-semibold text-sm">
          Return to All Services
        </Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Globe;

  return (
    <>
      <SeoHelmet
        title={service.title}
        description={service.shortDescription}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-radial-hero relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-purple-600">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#9B7EDE]">{service.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-[#9B7EDE] flex items-center justify-center mb-6 shadow-md">
                <Icon className="w-7 h-7" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white">
                {service.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to={`/quote?service=${encodeURIComponent(service.title)}`}
                id="service-detail-quote-btn"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center gap-2"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-4">
                  Overview & Engineering Approach
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.detailedDescription}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-6">
                  Capabilities & Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="p-4 rounded-xl glass-card border border-slate-200 dark:border-purple-900/30 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#9B7EDE] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Benefits */}
              <div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white mb-6">
                  Measurable Business Benefits
                </h3>
                <div className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={benefit}
                      className="p-5 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 flex items-start gap-4"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#9B7EDE] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Tech Stack card */}
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-purple-900/40">
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white mb-4">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-purple-900/40">
                <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white mb-4">
                  Explore Other Services
                </h4>
                <div className="space-y-2">
                  {allServices
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block p-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-[#9B7EDE] transition-colors"
                      >
                        {s.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
