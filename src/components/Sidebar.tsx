import React, { useState } from "react";
import { 
  LayoutDashboard, 
  UserPlus, 
  Search, 
  BarChart3, 
  BookOpen, 
  LogOut, 
  ShieldAlert, 
  RefreshCcw,
  Edit,
  X
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { username: string; role: string } | null;
  onLogout: () => void;
  onUpdateProfile?: (username: string, role: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  user, 
  onLogout, 
  onUpdateProfile,
  isOpen = false,
  onClose = () => {}
}: SidebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("");

  const handleOpenEdit = () => {
    setEditUsername(user?.username || "");
    setEditRole(user?.role || "");
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUsername.trim() || !editRole.trim()) return;
    onUpdateProfile?.(editUsername.trim(), editRole.trim());
    setIsEditing(false);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "predict", label: "Patient AI Predict", icon: UserPlus },
    { id: "search", label: "Safety Records", icon: Search },
    { id: "analytics", label: "Risk Analytics", icon: BarChart3 },
    { id: "docs", label: "Documentation & Viva", icon: BookOpen }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-100 flex flex-col h-screen border-r border-slate-800 z-50 font-sans transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
        {/* Branding Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
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
          
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

      {/* User Session Profile Card */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40 relative group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-900/40 shrink-0 select-none">
            {user?.username?.substring(0, 2).toUpperCase() || "SO"}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-bold text-slate-100 truncate flex items-center gap-1.5 justify-between">
              <span className="truncate">{user?.username || "Safety Officer"}</span>
            </h2>
            <p className="text-[9.5px] text-slate-400 truncate font-medium">
              {user?.role || "System Operator"}
            </p>
          </div>
          <button 
            onClick={handleOpenEdit}
            title="Edit Safety Officer Profile"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850/80 transition cursor-pointer shrink-0"
          >
            <Edit size={13} />
          </button>
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

      {/* Profile Edit Overlay Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm p-4 text-slate-900">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-blue-400" size={18} />
                <h3 className="font-bold text-sm tracking-wide">EDIT CLINICAL OFFICER PROFILE</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Officer Name / Username
                </label>
                <input 
                  type="text"
                  required
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs font-semibold"
                  placeholder="e.g. Dr. Bala Subramanian"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Professional Designation / Role
                </label>
                <input 
                  type="text"
                  required
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-xs font-semibold"
                  placeholder="e.g. Senior Drug Safety Officer"
                />
                <p className="text-[10px] text-slate-400 font-medium leading-normal">
                  This title appears on the top navbar, system logouts, and newly generated PDF Pharmacovigilance safety reports.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
    </>
  );
}
