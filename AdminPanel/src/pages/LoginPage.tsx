import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { KeyIcon } from '../components/Icons';

export const LoginPage: React.FC = () => {
  const { login, sessionError, clearSessionError } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError(null);
    clearSessionError();
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F4F7FB]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 font-bold mx-auto mb-4 shadow-md ring-4 ring-amber-400/20">
            <KeyIcon size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Hub</h1>
          <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-1">
            Multi-Addin Licensing Console
          </p>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Sign in with Super Admin credentials to manage all add-ins & licenses
          </p>
        </div>

        {sessionError && (
          <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl font-semibold leading-relaxed">
            {sessionError}
          </div>
        )}

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-semibold"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-semibold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-sm font-black rounded-xl shadow-md transition-all disabled:opacity-50 border border-slate-800"
          >
            {loading ? 'Authenticating...' : 'Sign In as Super Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};
