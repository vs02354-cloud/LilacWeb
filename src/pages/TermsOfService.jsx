import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SeoHelmet from '../components/common/SeoHelmet';

const TermsOfService = () => {
  return (
    <>
      <SeoHelmet
        title="Terms of Service"
        description="LilacTechSys Terms of Service governing web platform usage, intellectual property, and service engagement principles."
      />

      <section className="pt-32 pb-24 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#9B7EDE]">Terms of Service</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mb-10">Last revised: September 2026</p>

          <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or navigating the LilacTechSys platform, you confirm agreement with these Terms of Service, applicable laws, and relevant regulatory mandates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                2. Intellectual Property & Code Ownership
              </h2>
              <p>
                All proprietary client solutions developed under contracted Master Services Agreements (MSAs) remain the 100% exclusive intellectual property of the respective client upon final milestone clearing. All site content, trademarks, and branding belong exclusively to LilacTechSys Solutions Inc.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                3. Service Level Agreements (SLAs)
              </h2>
              <p>
                Specific uptime commitments, support escalation matrices, and incident resolution windows are formally established inside each client's individual Statement of Work (SOW).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                4. Governing Law & Jurisdiction
              </h2>
              <p>
                These terms are governed by the laws of the State of California, United States, without regard to its conflict of law principles.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfService;
