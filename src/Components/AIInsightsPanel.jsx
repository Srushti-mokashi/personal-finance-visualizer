import React, { useMemo } from "react";
import { useFinance } from "../Context/FinanceContext";
import { useCurrency } from "../Context/CurrencyContext";
import { calculateInsights } from "../Utils/CalculateInsights";

const AIInsightsPanel = () => {
  const finance = useFinance();
  const { currency, convert } = useCurrency();

  /* ✅ SAFE DATA */
  const transactions =
    finance?.visibleTransactions ??
    finance?.transactions ??
    [];

  const budgets = finance?.budgets ?? {};

  /* ---------------- Local Insights ---------------- */

  const local = useMemo(() => {
    return calculateInsights(transactions, budgets);
  }, [transactions, budgets]);

  /* ---------------- Render ---------------- */

  return (
    <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Insights
        </h2>
      </div>

      <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">Summary</p>
        <ul className="list-disc pl-5">
          {(local.summaryLines || []).map(
            (l, i) => (
              <li key={i}>
                {l.replace(
                  /₹\s?\d+/g,
                  (m) =>
                    `${currency} ${convert(
                      Number(m.replace(/\D/g, ""))
                    )}`
                )}
              </li>
            )
          )}
        </ul>

        <p className="font-semibold text-slate-900 dark:text-white">Suggestions</p>
        <ul className="list-disc pl-5">
          {(local.suggestions || []).map(
            (s, i) => (
              <li key={i}>{s}</li>
            )
          )}
        </ul>

        <p className="text-xs text-slate-500 dark:text-slate-500">
          Uses visible (unlocked) transactions only.
        </p>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
