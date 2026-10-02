import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(username, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid admin credentials');
    }
  };

  return (
    <>
      <SeoHelmet title="Admin Portal Login" />

      <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-radial-hero">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-purple-900/50 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9B7EDE] to-[#4B2E83] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              LilacTechSys Console
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Secure administrative access for solutions management.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Username or Staff Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  id="admin-username-input"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  id="admin-password-input"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#9B7EDE]"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 text-[11px] text-purple-700 dark:text-purple-300 space-y-0.5">
              <div><strong>Default Demo Credentials:</strong></div>
              <div>Username: <code className="font-mono bg-purple-100 dark:bg-purple-900/60 px-1 py-0.5 rounded">admin</code></div>
              <div>Password: <code className="font-mono bg-purple-100 dark:bg-purple-900/60 px-1 py-0.5 rounded">Admin@123</code></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="admin-login-btn"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9B7EDE] to-[#4B2E83] text-white font-semibold text-sm shadow-md hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-[#9B7EDE] transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
