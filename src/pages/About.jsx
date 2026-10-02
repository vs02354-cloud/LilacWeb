import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Target, Compass, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, GithubIcon } from '../components/common/SocialIcons';
import { Link } from 'react-router-dom';
import SeoHelmet from '../components/common/SeoHelmet';
import { teamApi } from '../services/api';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await teamApi.getAll();
        if (res.success) setTeam(res.data);
      } catch (err) {
        console.error('Failed to fetch team:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const values = [
    {
      title: 'Architectural Excellence',
      desc: 'We reject shortcuts. Every system is engineered with strict type safety, clean layered separation, and comprehensive testing.',
      icon: Target,
    },
    {
      title: 'Radical Transparency',
      desc: 'No hidden dependencies or proprietary walled gardens. Direct weekly code reviews and open architectural documentation.',
      icon: Compass,
    },
    {
      title: 'Security-By-Design',
      desc: 'Zero-trust governance and defense-in-depth principles are embedded into the foundation of every codebase.',
      icon: Shield,
    },
    {
      title: 'Long-Term Partnership',
      desc: 'We scale with our clients beyond deployment, providing ongoing performance tuning, SLA-backed support, and innovation roadmaps.',
      icon: Award,
    },
  ];

  const milestones = [
    { year: '2018', title: 'LilacTechSys Inception', desc: 'Founded by senior cloud architects aiming to bring tier-1 engineering rigor to high-growth tech companies.' },
    { year: '2020', title: 'Global Cloud Practice', desc: 'Expanded specialized practices in Kubernetes orchestration, AWS multi-region failovers, and HIPAA compliance.' },
    { year: '2023', title: 'Enterprise Modernization Engine', desc: 'Surpassed 100 successful enterprise migrations across North America, Europe, and Asia-Pacific.' },
    { year: '2026', title: 'Next-Gen Autonomous Systems', desc: 'Incorporated event-driven AI observability and zero-trust perimeter governance into our core service offerings.' },
  ];

  return (
    <>
      <SeoHelmet
        title="About Us"
        description="Learn about LilacTechSys, our leadership, our mission to deliver smart IT solutions, and our enterprise engineering values."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-radial-hero text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300/50 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9B7EDE]" />
            <span>Our Heritage & Vision</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Outfit']"
          >
            Smart IT Solutions. <br />
            <span className="text-lilac-gradient">Seamless Digital Growth.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            We are a team of veteran systems architects, software engineers, and product designers dedicated to solving complex operational challenges with clean code and modern cloud infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-20 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold font-['Outfit'] text-slate-900 dark:text-white">
                Engineered from the ground up for stability, performance, and trust.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                LilacTechSys was founded with a clear thesis: enterprise software should not be sluggish, fragile, or burdened with technical debt. By uniting strict backend architectural patterns with cutting-edge frontend interfaces, we build systems that scale gracefully from thousands to millions of users.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether deploying zero-trust perimeters for multinational financial networks or orchestrating IoT data pipelines for international shipping carriers, our commitment remains uncompromising: bulletproof reliability, sub-second latency, and transparent communication.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
                  <div className="text-2xl font-extrabold text-[#9B7EDE] font-['Outfit']">8+ Years</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Industry Excellence</div>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
                  <div className="text-2xl font-extrabold text-[#9B7EDE] font-['Outfit']">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">On-Time Delivery Rate</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="LilacTechSys Engineering Collaboration"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
              The Values That Guide Our Code
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#9B7EDE] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-purple-950/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
              Evolutionary Path
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
              Our Growth Journey
            </h2>
          </div>

          <div className="relative border-l-2 border-purple-300 dark:border-purple-800 ml-4 sm:ml-32 space-y-12">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-10"
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#9B7EDE] border-4 border-white dark:border-slate-900 shadow-sm" />
                <span className="absolute -left-28 top-0 hidden sm:block text-right w-20 font-bold text-lg text-[#9B7EDE] font-['Outfit']">
                  {m.year}
                </span>
                <span className="sm:hidden inline-block text-xs font-bold text-[#9B7EDE] mb-1 font-mono">
                  {m.year}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {m.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Directory */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#9B7EDE] uppercase">
              Leadership & Brainpower
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-['Outfit']">
              Meet the Architects Behind LilacTechSys
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Seasoned technologists combining decades of experience across enterprise software and cloud engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.fullName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group text-center"
              >
                <div className="h-64 overflow-hidden bg-slate-800">
                  <img
                    src={member.avatarUrl}
                    alt={member.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-semibold text-[#9B7EDE] uppercase tracking-wider">
                    {member.department}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] mt-1">
                    {member.fullName}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-purple-300/80 mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-purple-900/30 flex items-center justify-center gap-3 text-slate-400">
                    {member.linkedInUrl && (
                      <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className="hover:text-[#9B7EDE]">
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitterUrl && (
                      <a href={member.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-[#9B7EDE]">
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a href={member.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#9B7EDE]">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Want to Join Our Elite Engineering Team?
          </h2>
          <p className="mt-3 text-purple-100 text-sm max-w-xl mx-auto">
            We are constantly hiring top-tier full-stack engineers, cloud architects, and UI/UX designers globally.
          </p>
          <div className="mt-6">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-900 font-bold hover:bg-purple-50 transition-colors shadow-md text-sm"
            >
              <span>Explore Open Positions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
