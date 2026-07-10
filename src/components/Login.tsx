import React, { useState } from "react";
import { ShieldCheck, Lock, User, AlertCircle } from "lucide-react";

interface LoginProps {
  onLoginSuccess: (user: { username: string; role: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const trimmedUsername = username.trim();
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmedUsername, password })
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (jsonErr) {
        throw new Error(`Server returned invalid response: ${responseText.substring(0, 100) || "Empty response"}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Success
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || "Unable to authenticate. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-800">
          <ShieldCheck size={48} className="animate-pulse" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-950 tracking-tight">
          PharmacoVigilance AI
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Drug Adverse Reaction Predictive Safety Analytics Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-red-800 font-medium">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Authorized Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="e.g. bala"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Security Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                  Remember my session
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed transition"
              >
                {loading ? "Authenticating Session..." : "Establish Secure Session"}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md">
              <p className="text-xs text-blue-800 font-semibold mb-1">
                AUTHORIZED CREDENTIALS:
              </p>
              <p className="text-xs text-blue-700">
                Username: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono font-semibold">bala</code> <br />
                Password: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono font-semibold">bala7603</code>
              </p>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
              *Warning: Unauthorized clinical access is strictly tracked. The database will save audits for research use. Not certified for therapeutic actions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
