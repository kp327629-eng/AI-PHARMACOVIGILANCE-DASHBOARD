import React, { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Award, 
  Users, 
  AlertTriangle 
} from "lucide-react";

const COLORS = ["#1e3a8a", "#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc"];
const GENDER_COLORS = {
  Male: "#0284c7", // light-blue
  Female: "#db2777", // pink
  Other: "#64748b" // slate
};

export default function AnalyticsPanel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/analytics");
      if (!response.ok) {
        throw new Error("Unable to load analytics profiling.");
      }

      const res = await response.json();
      setData(res);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch comparative pharmacological statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-11 h-11 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider animate-pulse">Analyzing Toxicological Ratios...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 text-center max-w-xl mx-auto space-y-3">
        <AlertTriangle className="text-red-600 mx-auto" size={32} />
        <h3 className="font-bold">Analytics Failure</h3>
        <p className="text-xs">{error}</p>
        <button 
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  // Prep gender data for Recharts
  const genderData = data.gender.map((g: any) => ({
    name: g.gender,
    value: g.count,
    color: g.gender === "Male" ? GENDER_COLORS.Male : g.gender === "Female" ? GENDER_COLORS.Female : GENDER_COLORS.Other
  })).filter((g: any) => g.value > 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Activity className="text-blue-800" size={24} />
          Demographic &amp; Clinical Hazard Profiling
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Perform deeper cohort analysis on age, biological gender, and comorbidity indices relative to adverse outcomes.
        </p>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ADR by Age Group (Bar Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 lg:col-span-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Users className="text-blue-800" size={16} />
            ADR Prevalence by Age Group
          </h3>
          <p className="text-xs text-slate-400">
            Assesses distribution across age categories. Elderly cohorts typically show elevated adverse trends due to polypharmacy.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ageGroups} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="group" tick={{ fontSize: 10, fill: "#64748b", fontWeight: "bold" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
                />
                <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ADR by Gender (Pie Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <ShieldAlert className="text-pink-600" size={16} />
            ADR Incidence by Gender
          </h3>
          <p className="text-xs text-slate-400">
            Compares occurrences by biological sex. Can highlight gender-linked metabolic clearance differences.
          </p>
          <div className="h-48 flex items-center justify-center relative">
            {genderData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genderData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 text-xs">No active data.</div>
            )}
          </div>
          <div className="space-y-1.5 text-xs font-bold text-slate-600">
            {genderData.map((g: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }}></span>
                  {g.name}
                </span>
                <span className="text-slate-900">{g.value} Cases</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADR by Disease (Clinical Indication) Bar Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <TrendingUp className="text-emerald-600" size={16} />
          ADR Incident Density by Primary Disease Indication
        </h3>
        <p className="text-xs text-slate-400">
          Evaluates clinical comorbidities that exhibit high adverse frequencies. Highlights which clinical groups are most vulnerable to toxicity.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.disease} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="disease" tick={{ fontSize: 9, fill: "#475569", fontWeight: "bold" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }} />
              <Bar dataKey="count" fill="#1e3a8a" radius={[3, 3, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hazard Lists Table Row: Top 10 High-Risk Drugs & Top 10 High-Risk Diseases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top 10 High-Risk Drugs Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldAlert className="text-red-600" size={20} />
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Top High-Risk Drug Substances
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                Dynamic Safety Hazard Index
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Calculated as an aggregate hazard score weighted by case volume and clinical severity coefficients (High=3.0, Med=1.5, Low=0.5).
          </p>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs font-semibold">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[9px] font-extrabold">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Substance Name</th>
                  <th className="px-4 py-3 text-right">Hazard Score Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-bold">
                {data.topHighRiskDrugs && data.topHighRiskDrugs.length > 0 ? (
                  data.topHighRiskDrugs.map((drug: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-400">#{idx + 1}</td>
                      <td className="px-4 py-3 text-slate-900 text-xs font-extrabold">{drug.name}</td>
                      <td className="px-4 py-3 text-right text-red-600 font-mono text-xs">{drug.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-xs text-slate-400">No sufficient risk ratios compiled yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 10 High-Risk Diseases Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Award className="text-indigo-600" size={20} />
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Vulnerable Comorbidity Cohorts
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                Comorbidity Risk Index
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Aggregated relative toxicity score of comorbidities that exhibit additive hazards when combined with targeted therapeutic agents.
          </p>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs font-semibold">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[9px] font-extrabold">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Disease Indication</th>
                  <th className="px-4 py-3 text-right">Comorbidity Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-bold">
                {data.topHighRiskDiseases && data.topHighRiskDiseases.length > 0 ? (
                  data.topHighRiskDiseases.map((dis: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-400">#{idx + 1}</td>
                      <td className="px-4 py-3 text-slate-900 text-xs font-extrabold">{dis.name}</td>
                      <td className="px-4 py-3 text-right text-indigo-700 font-mono text-xs">{dis.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-xs text-slate-400">No sufficient comorbidities compiled yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
