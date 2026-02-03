import { useState, useMemo } from "react";
import { useFinance } from "../Context/FinanceContext";

import BalanceCards from "../Components/BalanceCards";
import ChartToggle from "../Components/Charts/ChartToggle";
import IncomeExpenseChart from "../Components/Charts/IncomeExpenseChart";
import SavingsRateChart from "../Components/Charts/SavingsRateChart";
import RecentTransactions from "../Components/RecentTransactions";

import LiveRatesModal from "../Components/LiveRatesModal";

import AddTransactionButton from "../Components/AddTransactionButton";
import SummaryCards from "../Components/SummaryCards";
import AIInsightsPanel from "../Components/AIInsightsPanel";
import BudgetsPanel from "../Components/BudgetsPanel";
import DashboardDatePicker from "../Components/DashboardDatePicker";
import Modal from "../Components/Modal";
import TransactionForm from "../Components/TransactionForm";

const Dashboard = () => {
  const finance = useFinance();
  const visibleTransactions = finance?.visibleTransactions ?? [];
  const allTransactions = finance?.transactions ?? [];

  const [showAddTxn, setShowAddTxn] = useState(false);
  const [showRates, setShowRates] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [view, setView] = useState("month");

  /* ================= FILTER BY MONTH (VISIBLE ONLY) ================= */
  const filteredVisibleTransactions = useMemo(() => {
    if (!Array.isArray(visibleTransactions)) return [];
    const month = selectedMonth.getMonth();
    const year = selectedMonth.getFullYear();

    return visibleTransactions.filter((t) => {
      if (!t?.date) return false;
      const d = new Date(t.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }, [visibleTransactions, selectedMonth]);

  /* ================= FILTER BY MONTH (ALL - For Summary) ================= */
  const filteredAllTransactions = useMemo(() => {
    if (!Array.isArray(allTransactions)) return [];
    const month = selectedMonth.getMonth();
    const year = selectedMonth.getFullYear();

    return allTransactions.filter((t) => {
      if (!t?.date) return false;
      const d = new Date(t.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }, [allTransactions, selectedMonth]);

  return (
    <div className="min-h-screen space-y-8 px-6 py-6 text-slate-900 dark:text-slate-100 bg-transparent">
      {/* ================= HEADER ================= */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Financial overview for{" "}
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {selectedMonth.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DashboardDatePicker
            value={selectedMonth}
            onChange={setSelectedMonth}
          />

          <button
            onClick={() => setShowRates(true)}
            className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition shadow-sm dark:shadow-none"
          >
            💱 Live Rates
          </button>

          <AddTransactionButton onClick={() => setShowAddTxn(true)} />
        </div>
      </header>

      {/* ================= BALANCE CARDS ================= */}
      <section className="card-border backdrop-blur p-4">
        <BalanceCards />
      </section>

      {/* ================= SUMMARY (USES ALL DATA) ================= */}
      <SummaryCards transactions={filteredAllTransactions} />

      {/* ================= CHART TOGGLE ================= */}
      <ChartToggle value={view} onChange={setView} />

      {/* ================= CHARTS (VISIBLE DATA ONLY) ================= */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card-border backdrop-blur p-4">
          <IncomeExpenseChart
            transactions={filteredVisibleTransactions}
            view={view}
          />
        </div>

        <div className="card-border backdrop-blur p-4">
          <SavingsRateChart
            transactions={filteredVisibleTransactions}
            view={view}
          />
        </div>
      </section>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <div className="card-border backdrop-blur p-4">
        <RecentTransactions />
      </div>

      {/* ================= BOTTOM PANELS (VISIBLE DATA ONLY) ================= */}
      <section className="grid gap-6 lg:grid-cols-[2fr,1.3fr]">
        <div className="card-border backdrop-blur p-4">
          <AIInsightsPanel transactions={filteredVisibleTransactions} />
        </div>

        <div className="card-border backdrop-blur p-4">
          <BudgetsPanel transactions={filteredVisibleTransactions} />
        </div>
      </section>

      {/* ================= ADD TRANSACTION MODAL ================= */}
      <Modal open={showAddTxn} onClose={() => setShowAddTxn(false)}>
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Add Transaction
        </h3>
        <TransactionForm onAdded={() => setShowAddTxn(false)} />
      </Modal>

      {/* ================= LIVE RATES MODAL ================= */}
      <LiveRatesModal
        open={showRates}
        onClose={() => setShowRates(false)}
      />
    </div>
  );
};

export default Dashboard;
