import React, { useState } from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";

interface LoginProps {
  onLoginSuccess: (user: { username: string; role: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("bala");
  const [password, setPassword] = useState("bala7603");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword })
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

            <div className="text-center py-4 bg-slate-50 rounded-xl px-4 border border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Welcome back, Officer! To access the clinical research workspace directly, simply click the button below.
              </p>
            </div>


            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed transition"
              >
                {loading ? "Authenticating Session..." : "Enter Portal (Direct Log In)"}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              *Warning: Clinical portal access is logged for regulatory audit compliance. Dr. Bala Subramanian session credentials are pre-loaded for secure direct access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
