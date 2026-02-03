// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   CalendarDays,
//   Settings,
//   LogOut,
//   User,
//   ChevronLeft,
//   ChevronRight,
//   HandCoins,
// } from "lucide-react";
// import { useAuth } from "../Auth/AuthContext";
// import logo from "../assets/image.png";

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const initials = user?.email
//     ? user.email.charAt(0).toUpperCase()
//     : "U";

//   /* ================= BASE STYLES ================= */

//   const linkBase =
//     "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

//   const linkInactive =
//     "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100";

//   const linkActive =
//     "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md";

//   return (
//     <aside
//       className={`fixed left-0 top-0 z-40 h-screen
//        bg-slate-800 
//       border-r border-slate-800
//       flex flex-col transition-all duration-300
//       ${collapsed ? "w-20" : "w-64"}`}
//     >
//       {/* ================= LOGO ================= */}
//       <div className="flex items-center justify-between px-4 py-5 border-b border-slate-400">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <img src={logo} alt="logo" className="h-8 w-8 rounded-lg" />
//           {!collapsed && (
//             <span className="text-2xl font-semibold text-slate-100">
//               BudgetVision
//             </span>
//           )}
//         </div>

//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="p-1 rounded-lg text-slate-100 hover:bg-slate-400  hover:text-white"
//         >
//           {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//         </button>
//       </div>

//       {/* ================= PROFILE ================= */}
//       <div className="px-4 py-5 border-b border-slate-500 flex items-center gap-3">
//         <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
//           {initials}
//         </div>

//         {!collapsed && (
//           <div className="overflow-hidden">
//             <p className="text-sm font-medium text-slate-100 truncate">
//               {user?.email}
//             </p>
//             <p className="text-xs text-slate-400 flex items-center gap-1">
//               <User size={12} /> Account
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ================= NAVIGATION ================= */}
//       <nav className="flex-1 px-3 py-6 space-y-1">
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             `${linkBase} ${isActive ? linkActive : linkInactive}`
//           }
//         >
//           <LayoutDashboard size={20} className="text-blue-400" />
//           {!collapsed && <span>Dashboard</span>}
//         </NavLink>

//         <NavLink
//           to="/calendar"
//           className={({ isActive }) =>
//             `${linkBase} ${isActive ? linkActive : linkInactive}`
//           }
//         >
//           <CalendarDays size={20} className="text-emerald-400" />
//           {!collapsed && <span>Calendar</span>}
//         </NavLink>

//         <NavLink
//           to="/lending"
//           className={({ isActive }) =>
//             `${linkBase} ${isActive ? linkActive : linkInactive}`
//           }
//         >
//           <HandCoins size={20} className="text-violet-400" />
//           {!collapsed && <span>Lending</span>}
//         </NavLink>

//         <NavLink
//           to="/settings"
//           className={({ isActive }) =>
//             `${linkBase} ${isActive ? linkActive : linkInactive}`
//           }
//         >
//           <Settings size={20} className="text-slate-400" />
//           {!collapsed && <span>Settings</span>}
//         </NavLink>
//       </nav>

//       {/* ================= LOGOUT ================= */}
//       <div className="p-3 border-t border-slate-400">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xl
//           text-red-400 hover:bg-red-500/10 hover:text-red-500 justify-center"
//         >
//           <LogOut size={20} />
//           {!collapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }


import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  HandCoins,
  ArrowDownLeft,
} from "lucide-react";
import { useAuth } from "../Auth/AuthContext";
import logo from "../assets/image.png";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const linkInactive =
    "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100";

  const linkActive =
    "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md";

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen
        bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-800
        flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-200 dark:border-slate-400">
        <div className="flex items-center gap-3 overflow-hidden">
          <img src={logo} alt="logo" className="h-8 w-8 rounded-lg" />
          {!collapsed && (
            <span className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              BudgetVision
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-slate-500 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-400 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* PROFILE */}
      <div className="px-4 py-5 border-b border-slate-200 dark:border-slate-500 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
          {initials}
        </div>

        {!collapsed && (
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <User size={12} /> Account
            </p>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <NavLink to="/dashboard" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <LayoutDashboard size={20} className="text-blue-400" />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/calendar" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <CalendarDays size={20} className="text-emerald-400" />
          {!collapsed && "Calendar"}
        </NavLink>

        <NavLink to="/lending" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <HandCoins size={20} className="text-violet-400" />
          {!collapsed && "Lending"}
        </NavLink>

        {/* ✅ NEW: BORROWING */}
        <NavLink to="/borrowing" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <ArrowDownLeft size={20} className="text-rose-400" />
          {!collapsed && "Borrowing"}
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <Settings size={20} className="text-slate-400" />
          {!collapsed && "Settings"}
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-400">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 justify-center transition"
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
