import React, { useEffect, useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  CheckCircle, 
  TrendingUp,
  HeartPulse,
  Brain,
  FileSpreadsheet
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from "recharts";
import { DashboardStats } from "../types.js";

const SEVERITY_COLORS = {
  High: "#dc2626", // red-600
  Medium: "#d97706", // amber-600
  Low: "#16a34a" // green-600
};

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard metrics and analytics demographics in parallel
      const [statsRes, analyticsRes] = await Promise.all([
        fetch("/api/dashboard"),
        fetch("/api/analytics")
      ]);

      if (!statsRes.ok || !analyticsRes.ok) {
        throw new Error("Failed to load statistics database.");
      }

      const statsText = await statsRes.text();
      const analyticsText = await analyticsRes.text();

      let statsData;
      let analyticsData;

      try {
        statsData = statsText ? JSON.parse(statsText) : null;
        analyticsData = analyticsText ? JSON.parse(analyticsText) : null;
      } catch (jsonErr) {
        throw new Error("Received malformed data from drug safety database.");
      }

      if (!statsData || !analyticsData) {
        throw new Error("Empty dashboard data received.");
      }

      setStats(statsData);
      setAnalytics(analyticsData);
    } catch (err: any) {
      console.error(err);
      setError("Unable to query core pharmacovigilance safety datasets. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          Compiling National Drug Safety Register metrics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 my-6 max-w-2xl mx-auto flex flex-col items-center text-center space-y-3">
        <AlertTriangle className="text-red-600" size={36} />
        <h3 className="font-bold text-lg">Safety Dashboard Query Failure</h3>
        <p className="text-sm">{error}</p>
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Re-establish Connection
        </button>
      </div>
    );
  }

  if (!stats || !analytics) return null;

  // Pie chart data prep
  const severityData = [
    { name: "High Risk", value: stats.highRiskCases, color: SEVERITY_COLORS.High },
    { name: "Medium Risk", value: stats.mediumRiskCases, color: SEVERITY_COLORS.Medium },
    { name: "Low Risk", value: stats.lowRiskCases, color: SEVERITY_COLORS.Low }
  ].filter(d => d.value > 0);

  // Safety Score status
  const getSafetyScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getSafetyScoreLabel = (score: number) => {
    if (score >= 85) return "Optimal Safety Profile";
    if (score >= 70) return "Elevated Vigilance Required";
    return "Critical Drug Safety Alert";
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Safety Monitoring Intelligence
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time adverse drug reaction (ADR) prediction analytics and statistical monitoring.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-xl px-4 py-2.5 flex items-center gap-3 text-xs font-semibold shrink-0">
          <Activity className="text-blue-600 shrink-0" size={16} />
          <span>Educational &amp; Research Protocol Active</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Reports */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-32">
          <div className="flex justify-between items-start w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Safety Cases</span>
            <span className="p-1.5 bg-blue-50 text-blue-700 rounded-lg"><FileSpreadsheet size={16} /></span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-900 font-display">{stats.totalReports}</span>
            <span className="text-xs font-bold text-emerald-600">+12%</span>
          </div>
        </div>

        {/* High Risk */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-rose-500 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High Severity</span>
            <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><AlertTriangle size={16} /></span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-rose-600 font-display">{stats.highRiskCases}</span>
            <span className="text-[10px] font-extrabold uppercase bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded tracking-wide">Critical</span>
          </div>
        </div>

        {/* Medium Risk */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-amber-500 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medium Severity</span>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg"><AlertTriangle size={16} /></span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-amber-600 font-display">{stats.mediumRiskCases}</span>
            <span className="text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded tracking-wide">Moderate</span>
          </div>
        </div>

        {/* Low Risk */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-green-500 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Low Severity</span>
            <span className="p-1.5 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={16} /></span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-green-600 font-display">{stats.lowRiskCases}</span>
            <span className="text-[10px] font-extrabold uppercase bg-green-50 text-green-700 px-1.5 py-0.5 rounded tracking-wide">Low Risk</span>
          </div>
        </div>

        {/* Drug Safety Score Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-600 flex flex-col justify-between h-32 lg:col-span-1 sm:col-span-2">
          <div className="flex justify-between items-start w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drug Safety Score</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg"><ShieldCheck size={16} /></span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-indigo-950 font-display">{stats.safetyScore}/100</span>
            <span className="text-[10px] font-extrabold uppercase bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded tracking-wide">
              {stats.safetyScore >= 85 ? "Optimal" : stats.safetyScore >= 70 ? "Stable" : "Caution"}
            </span>
          </div>
        </div>
      </div>

      {/* Warning Alert Banner based on safety score */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${getSafetyScoreColor(stats.safetyScore)}`}>
        <div className="flex items-start sm:items-center gap-3">
          <Brain className="shrink-0" size={20} />
          <div>
            <p className="text-sm font-bold">
              Current System Assessment: {getSafetyScoreLabel(stats.safetyScore)}
            </p>
            <p className="text-xs opacity-90 mt-0.5">
              Calculated dynamically as a weighted ratio of active high-risk clinical events versus mild side effect declarations.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold underline shrink-0 cursor-pointer hover:opacity-80">
          Review Safety Protocol &gt;
        </span>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={16} />
              Monthly ADR Reports Trend
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">
              Last 6 Months
            </span>
          </div>
          <div className="h-72">
            {analytics.monthlyTrend && analytics.monthlyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1e40af" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b", fontWeight: "medium" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }} 
                    labelStyle={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8" }}
                    itemStyle={{ fontSize: "12px", color: "#38bdf8" }}
                  />
                  <Area type="monotone" dataKey="count" name="Safety Reports" stroke="#1e40af" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMonth)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 text-xs">
                No sufficient timeline history available to render trend curves.
              </div>
            )}
          </div>
        </div>

        {/* Severity Distribution Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <HeartPulse className="text-red-500" size={16} />
            Severity Risk Breakdown
          </h3>
          <div className="h-56 relative flex items-center justify-center">
            {severityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-400 text-xs">No active reports.</div>
            )}
            {/* Center label inside doughnut */}
            <div className="absolute text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
              <span className="text-2xl font-black text-slate-800 leading-none">{stats.totalReports}</span>
            </div>
          </div>
          {/* Custom legend */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
            {severityData.map((d, i) => (
              <div key={i} className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="block w-2.5 h-2.5 rounded-full mx-auto mb-1" style={{ backgroundColor: d.color }}></span>
                <span className="text-slate-500 truncate block">{d.name}</span>
                <span className="text-slate-800 block mt-0.5">{d.value} ({Math.round(d.value / stats.totalReports * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Graphs Block: Frequently Reported Drugs & Symptoms list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Frequently Reported Drugs Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Activity className="text-blue-800" size={16} />
            Most Frequently Reported Substances
          </h3>
          <div className="h-64">
            {stats.mostReportedDrugs && stats.mostReportedDrugs.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.mostReportedDrugs} margin={{ top: 10, right: 10, left: -25, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#334155", fontWeight: "bold" }} width={80} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
                  />
                  <Bar dataKey="count" fill="#1e3a8a" radius={[0, 4, 4, 0]} name="Reports count" barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 text-xs">No data.</div>
            )}
          </div>
        </div>

        {/* Heatmap-Style Clinical Symptoms Grid */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={16} />
            Common Clinical Manifestations Index
          </h3>
          <p className="text-xs text-slate-500">
            A density heat-map of active safety alarms. Highlights which toxic symptoms are most prevalent across patients.
          </p>

          <div className="space-y-2.5 pt-1.5">
            {stats.mostCommonSymptoms && stats.mostCommonSymptoms.length > 0 ? (
              stats.mostCommonSymptoms.map((sym, idx) => {
                const colors = [
                  "bg-red-50 border-red-100 text-red-800",
                  "bg-orange-50 border-orange-100 text-orange-800",
                  "bg-amber-50 border-amber-100 text-amber-800",
                  "bg-yellow-50 border-yellow-100 text-yellow-800",
                  "bg-slate-50 border-slate-100 text-slate-800"
                ];
                const badgeColor = colors[idx] || "bg-slate-50 border-slate-100 text-slate-800";
                const totalSymptomReports = stats.mostCommonSymptoms.reduce((acc, s) => acc + s.count, 0);
                const percent = Math.round((sym.count / stats.totalReports) * 100);

                return (
                  <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between gap-4 ${badgeColor}`}>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white/70 shadow-sm flex items-center justify-center font-bold text-xs">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-xs tracking-wide">{sym.name}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="opacity-80">Frequency:</span>
                      <span className="font-black bg-white/60 px-2 py-0.5 rounded border border-black/5">
                        {sym.count} cases ({percent}%)
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-slate-400 text-xs text-center py-8">No clinical symptoms logged yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
