import { useMemo } from "react";
import { useCurrency } from "../Context/CurrencyContext";

export default function SummaryCards({ transactions }) {
  const safeTransactions = transactions ?? []; // ✅ FIX
  const { currency, convert } = useCurrency();

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    safeTransactions.forEach((t) => {
      if (t.type === "income") income += Number(t.amount || 0);
      if (t.type === "expense") expense += Number(t.amount || 0);
    });

    return {
      income,
      expense,
      savings: income - expense,
    };
  }, [safeTransactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <p className="text-m text-slate-500 dark:text-slate-400">Income</p>
        <h3 className="text-xl font-semibold text-emerald-500 dark:text-emerald-400">
          {currency} {convert(summary.income)}
        </h3>
      </div>

      <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <p className="text-m text-slate-500 dark:text-slate-400">Expense</p>
        <h3 className="text-xl font-semibold text-rose-500 dark:text-rose-400">
          {currency} {convert(summary.expense)}
        </h3>
      </div>

      <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <p className="text-m text-slate-500 dark:text-slate-400">Savings</p>
        <h3 className="text-xl font-semibold text-blue-500 dark:text-blue-400">
          {currency} {convert(summary.savings)}
        </h3>
      </div>
    </div>
  );
}
