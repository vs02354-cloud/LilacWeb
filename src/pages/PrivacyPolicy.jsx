import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';

const PrivacyPolicy = () => {
  return (
    <>
      <SeoHelmet
        title="Privacy Policy"
        description="LilacTechSys Privacy Policy detailing data collection, processing, and protection compliance across GDPR and CCPA."
      />

      <section className="pt-32 pb-24 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#9B7EDE]">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-slate-900 dark:text-white mb-4">
            Privacy Policy & Data Governance
          </h1>
          <p className="text-xs text-slate-500 mb-10">Last revised: September 2026</p>

          <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                1. Information We Collect
              </h2>
              <p>
                LilacTechSys collects corporate contact details (such as names, business email addresses, phone numbers, and company affiliations) exclusively when voluntarily provided through our consultation requests, quote forms, or newsletter subscriptions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                2. Use of Information
              </h2>
              <p>
                We process your technical requirements strictly to generate architectural proposals, evaluate project timelines, and deliver requested technical updates. We do not sell, rent, or monetize your information under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                3. Security Standards & Encryption
              </h2>
              <p>
                All data transmitted through our web endpoints is protected by TLS 1.3 encryption in transit and AES-256 encryption at rest. We adhere strictly to zero-trust access control protocols.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                4. Data Subject Rights (GDPR & CCPA)
              </h2>
              <p>
                You possess full legal rights to request access to, rectification of, or erasure of any personal records maintained within our systems. To exercise these rights, email our data protection officer at <a href="mailto:privacy@lilactechsys.com" className="text-purple-600 dark:text-purple-300 underline">privacy@lilactechsys.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
