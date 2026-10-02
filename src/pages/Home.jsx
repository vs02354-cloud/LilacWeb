import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, Sparkles, 
  Globe, Smartphone, Code2, Cloud, Palette, Briefcase, Headphones, 
  TrendingUp, Award, Users, Star, ArrowUpRight 
} from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';
import { servicesApi, projectsApi, blogApi, testimonialsApi } from '../services/api';
import { CardSkeleton, ProjectSkeleton } from '../components/common/SkeletonLoader';

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

const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, blogsRes, testimonialsRes] = await Promise.all([
          servicesApi.getAll(),
          projectsApi.getFeatured(),
          blogApi.getRecent(3),
          testimonialsApi.getAll(true),
        ]);

        if (servicesRes.success) setServices(servicesRes.data);
        if (projectsRes.success) setFeaturedProjects(projectsRes.data);
        if (blogsRes.success) setRecentBlogs(blogsRes.data);
        if (testimonialsRes.success) setTestimonials(testimonialsRes.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { value: '120+', label: 'Enterprise Projects Delivered' },
    { value: '99.99%', label: 'Cloud Infrastructure SLA' },
    { value: '98%', label: 'Client Retention Rate' },
    { value: '45+', label: 'Senior Engineers & Architects' },
  ];

  const techCategories = [
    { title: 'Frontend & Web', techs: ['React.js', 'Vite', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand'] },
    { title: 'Backend & APIs', techs: ['C# / .NET 9', 'ASP.NET Core', 'Node.js', 'Python', 'gRPC', 'RESTful APIs'] },
    { title: 'Cloud & DevOps', techs: ['AWS', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
    { title: 'Databases & Message Queues', techs: ['PostgreSQL', 'Redis', 'TimescaleDB', 'Apache Kafka', 'RabbitMQ'] },
  ];

  const clientLogos = [
    { name: 'Aura Financial', tag: 'Fintech Global' },
    { name: 'ApexHealth', tag: 'Healthcare Network' },
    { name: 'OmniSupply', tag: 'IoT Logistics' },
    { name: 'DefenSys Corp', tag: 'Cyber Defense' },
    { name: 'NexaPay', tag: 'Digital Payments' },
    { name: 'Veloce Retail', tag: 'Omnichannel Retail' },
  ];

  return (
    <>
      <SeoHelmet
        title="Smart IT Solutions. Seamless Digital Growth."
        description="LilacTechSys is an enterprise digital solutions partner specializing in cloud engineering, custom software, cybersecurity, and high-performance web systems."
      />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-hero">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#9B7EDE]/20 to-[#4B2E83]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300/50 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9B7EDE]" />
            <span>Smart IT Solutions. Seamless Digital Growth.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.12]"
          >
            We Architect Scalable <br className="hidden sm:inline" />
            <span className="text-lilac-gradient">Digital Systems</span> for Enterprise Growth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            LilacTechSys empowers high-growth companies with resilient cloud infrastructure, custom enterprise software, zero-trust cybersecurity, and frictionless web & mobile platforms.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <Link
              to="/quote"
              id="hero-get-consultation-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] hover:from-[#8B6DD0] hover:to-[#3F2570] text-white font-semibold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/services"
              id="hero-explore-services-btn"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-purple-800/70 bg-white/70 dark:bg-purple-950/30 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-purple-900/40 font-medium text-base transition-all flex items-center justify-center"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Zero-Downtime Migration</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>SOC 2 & ISO 27001 Standards</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Dedicated Enterprise SLAs</span>
            </span>
          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
      <section className="py-12 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-purple-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="space-y-1"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#9B7EDE] font-['Outfit']">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES OVERVIEW */}
      <section className="py-24 bg-slate-50/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
              What We Do Best
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
              Complete Digital & IT Engineering Services
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              We design, build, deploy, and safeguard mission-critical systems with speed and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            ) : (
              services.map((service, idx) => {
                const IconComponent = iconMap[service.icon] || Globe;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#9B7EDE] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#9B7EDE] group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-[#9B7EDE] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-between">
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:text-purple-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10px] font-mono text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-sm font-semibold transition-all"
            >
              <span>Explore Detailed Service Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
                The LilacTechSys Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
                Why Enterprise Leaders Trust LilacTechSys
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We combine deep architectural mastery with rapid agile delivery. Rather than simply delivering code, we become your long-term technology catalysts.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Security-First Architecture',
                    desc: 'Zero-trust networks, automated vulnerability pipelines, and rigorous OWASP compliance embedded from Day 1.',
                    icon: ShieldCheck,
                  },
                  {
                    title: 'Sub-Second High Concurrency',
                    desc: 'Distributed PostgreSQL, Redis cache tiers, and event queues designed to effortlessly sustain 100k+ concurrent requests.',
                    icon: Zap,
                  },
                  {
                    title: 'Senior Dedicated Engineering Squads',
                    desc: 'Direct collaboration with senior architects and full-stack specialists with zero junior developer turnover.',
                    icon: Users,
                  },
                  {
                    title: 'Transparent 100% IP Ownership',
                    desc: 'Complete source code ownership, zero vendor lock-in, and turnkey automated CI/CD handoff.',
                    icon: Award,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 dark:border-purple-900/30 bg-slate-50/60 dark:bg-purple-950/20"
                    >
                      <div className="p-2.5 rounded-lg bg-[#9B7EDE]/15 text-[#9B7EDE] shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Visual Architecture Showcase */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9B7EDE]/20 to-[#4B2E83]/20 rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl glass-card bg-slate-900 text-white p-6 sm:p-8 border border-purple-500/20 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-purple-300">
                    LilacTechSys Enterprise Mesh v2.6
                  </span>
                </div>

                <div className="mt-6 space-y-4 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-400">Target Framework</span>
                    <span className="text-emerald-400 font-bold">.NET 9 + React 18</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-400">Database Engine</span>
                    <span className="text-cyan-400 font-bold">PostgreSQL 16 High-Availability</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-400">Security Model</span>
                    <span className="text-purple-300 font-bold">Zero-Trust + JWT Claims</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-400">Average Clearing Latency</span>
                    <span className="text-amber-400 font-bold">&lt; 180 ms</span>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#9B7EDE]/20 to-[#4B2E83]/30 border border-purple-400/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-purple-200">Guaranteed Response SLA</div>
                    <div className="text-lg font-bold text-white font-['Outfit']">15-Minute Critical Window</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK GRID */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
              Proven Modern Technologies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
              Battle-Tested Enterprise Tooling
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              We leverage modern, industry-standard languages and frameworks to ensure stability and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit'] pb-3 mb-4 border-b border-slate-100 dark:border-purple-900/30">
                  {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-slate-50/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
                Featured Case Studies
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-300 hover:text-purple-800"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => <ProjectSkeleton key={i} />)
            ) : (
              featuredProjects.slice(0, 4).map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-800">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-purple-950/90 text-purple-700 dark:text-purple-200 backdrop-blur-md">
                      {project.categoryName || 'Enterprise'}
                    </span>
                    <span className="absolute bottom-4 left-4 text-xs font-mono text-purple-200">
                      Client: {project.clientName}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-[#9B7EDE] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-between">
                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:text-purple-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#9B7EDE] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
              Endorsements & Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
              What Our Enterprise Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.clientName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-purple-900/30 flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-purple-300 dark:border-purple-800"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit']">
                      {t.clientName}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-purple-300/80">
                      {t.clientTitle}, {t.companyName}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CLIENT LOGO MARQUEE */}
          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
              Powering Forward-Thinking Global Brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
              {clientLogos.map((client) => (
                <div key={client.name} className="flex flex-col items-center">
                  <span className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-200 font-['Outfit']">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-purple-500 font-medium">
                    {client.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
                Thought Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
                Latest Insights & Research
              </h2>
            </div>
            <Link
              to="/blog"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-300 hover:text-purple-800"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-800">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-[#9B7EDE] font-semibold">{post.categoryName}</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-[#9B7EDE] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:text-purple-800 flex items-center gap-1"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL HIGH-IMPACT CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#9B7EDE] via-[#7B5BC0] to-[#4B2E83] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-200">
                Ready For Seamless Scale?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 font-['Outfit'] leading-tight">
                Let's Build Your Next Digital Advantage Together.
              </h2>
              <p className="mt-4 text-purple-100 text-sm sm:text-base leading-relaxed">
                Connect with our senior architects for an in-depth code audit, cloud roadmap, or custom development proposal tailored to your enterprise deadlines.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/quote"
                  id="final-cta-request-quote-btn"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-purple-900 font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-purple-950/20 text-center"
                >
                  Request a Custom Quote
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/40 text-white font-medium hover:bg-white/10 transition-colors text-center"
                >
                  Schedule Intro Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
