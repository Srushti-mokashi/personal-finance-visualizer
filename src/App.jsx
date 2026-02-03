import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./Components/Sidebar";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import CalendarPage from "./Pages/Calendar";
import Lending from "./Pages/Lending";
import Borrowing from "./Pages/Borrowing";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import ProtectedRoute from "./Auth/ProtectedRoute";

/* 🔴 REMOVED CONTEXT IMPORTS FROM HERE (Handling in main.jsx) */

function App() {
  const location = useLocation();

  const hideSidebarRoutes = ["/", "/login", "/signup"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {!shouldHideSidebar && <Sidebar />}

      <main
        className={`flex-1 transition-all duration-300
          ${shouldHideSidebar ? "ml-0" : "ml-64"} px-6 py-6`}
      >
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lending"
            element={
              <ProtectedRoute>
                <Lending />
              </ProtectedRoute>
            }
          />

          <Route
            path="/borrowing"
            element={
              <ProtectedRoute>
                <Borrowing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
