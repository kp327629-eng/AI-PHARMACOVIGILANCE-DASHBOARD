import React, { useState } from "react";
import Login from "./components/Login.js";
import Sidebar from "./components/Sidebar.js";
import DashboardOverview from "./components/DashboardOverview.js";
import PatientFormPredict from "./components/PatientFormPredict.js";
import SearchRecords from "./components/SearchRecords.js";
import AnalyticsPanel from "./components/AnalyticsPanel.js";
import DocCenter from "./components/DocCenter.js";
import { ShieldCheck, Info, Menu } from "lucide-react";

export default function App() {
  // Session authentication state (stored in local state, persistent via localStorage)
  const [user, setUser] = useState<{ username: string; role: string } | null>(() => {
    try {
      const saved = localStorage.getItem("pv_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleLoginSuccess = (userData: { username: string; role: string }) => {
    let finalUser = userData;
    try {
      const savedCustom = localStorage.getItem("pv_user_custom");
      if (savedCustom) {
        finalUser = JSON.parse(savedCustom);
      }
    } catch (e) {
      console.error(e);
    }
    setUser(finalUser);
    localStorage.setItem("pv_user", JSON.stringify(finalUser));
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("pv_user");
  };

  const handleUpdateProfile = (newUsername: string, newRole: string) => {
    const updated = { username: newUsername, role: newRole };
    setUser(updated);
    localStorage.setItem("pv_user", JSON.stringify(updated));
    localStorage.setItem("pv_user_custom", JSON.stringify(updated));
  };

  // Render view based on selection
  const renderActivePanel = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "predict":
        return <PatientFormPredict />;
      case "search":
        return <SearchRecords user={user} />;
      case "analytics":
        return <AnalyticsPanel />;
      case "docs":
        return <DocCenter />;
      default:
        return <DashboardOverview />;
    }
  };

  // Unauthenticated: show Login gateway
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Authenticated Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 relative overflow-x-hidden">
      {/* Sidebar - fixed left */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileSidebarOpen(false);
        }} 
        user={user} 
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area - offset by sidebar width (w-64) on desktop */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen w-full min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              title="Open Navigation"
              aria-label="Open Navigation"
            >
              <Menu size={20} />
            </button>
            <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-900 font-extrabold px-2 sm:px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
              Educational Sandbox Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-xs font-bold text-slate-800 leading-tight">
                {user.username}
              </span>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {user.role}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 font-black flex items-center justify-center text-xs">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Panels */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderActivePanel()}
        </main>

        {/* Persistent Clinical Disclaimer Footer */}
        <footer className="bg-amber-50 border-t border-amber-200 p-4 px-8 shrink-0 flex items-start gap-3 shadow-inner">
          <Info className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <div>
            <p className="text-[11px] font-bold text-amber-900 leading-tight">
              Educational &amp; Research Disclaimer:
            </p>
            <p className="text-[10px] text-amber-800 leading-relaxed font-semibold mt-0.5">
              This system is developed strictly for pharmacological research, academic presentations, and final year projects. It is <strong>NOT</strong> certified, audited, or intended for medical diagnosis, clinical diagnostics, treatment decisions, or therapeutic interventions on human subjects. Always seek professional advice from qualified healthcare providers.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
