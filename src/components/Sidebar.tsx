import React from "react";
import { 
  LayoutDashboard, 
  UserPlus, 
  Search, 
  BarChart3, 
  BookOpen, 
  LogOut, 
  ShieldAlert, 
  RefreshCcw 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { username: string; role: string } | null;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "predict", label: "Patient AI Predict", icon: UserPlus },
    { id: "search", label: "Safety Records", icon: Search },
    { id: "analytics", label: "Risk Analytics", icon: BarChart3 },
    { id: "docs", label: "Documentation & Viva", icon: BookOpen }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-10 font-sans">
      {/* Branding Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <ShieldAlert className="text-blue-400 shrink-0" size={24} />
        <div>
          <h1 className="text-sm font-extrabold tracking-wider text-white uppercase">
            PV Safety AI
          </h1>
          <p className="text-[10px] text-slate-400 font-semibold tracking-tight uppercase">
            Pharmacovigilance
          </p>
        </div>
      </div>

      {/* User Session Profile Card */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-900/40">
            {user?.username?.substring(0, 2).toUpperCase() || "SO"}
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-slate-100 truncate">
              {user?.username || "Safety Officer"}
            </h2>
            <p className="text-[9.5px] text-slate-400 truncate font-medium">
              {user?.role || "System Operator"}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-mono text-slate-400 font-medium">
            Secure Endpoint Online
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-800 text-white shadow-lg shadow-blue-900/30 font-bold"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer System Control panel */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/20 space-y-3">
        <div className="bg-slate-800/60 rounded-xl p-2.5 text-[10px] text-slate-400 space-y-1 font-mono">
          <div className="flex justify-between">
            <span>Core Model:</span>
            <span className="text-blue-400 font-bold">RF / Gemini</span>
          </div>
          <div className="flex justify-between">
            <span>Engine:</span>
            <span className="text-slate-300">v1.2.0-TLS</span>
          </div>
          <div className="flex justify-between">
            <span>XAI Platform:</span>
            <span className="text-emerald-400 font-bold">SHAP v0.42</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-700 rounded-xl text-xs font-semibold text-slate-400 hover:bg-red-950/30 hover:border-red-900 hover:text-red-400 transition cursor-pointer"
        >
          <LogOut size={14} />
          End Session
        </button>
      </div>
    </aside>
  );
}
