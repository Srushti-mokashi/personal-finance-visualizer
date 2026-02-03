import { useState } from "react";
import { useFinance } from "../Context/FinanceContext";
import { useCurrency } from "../Context/CurrencyContext";

const BudgetsPanel = ({ transactions = [] }) => {
  const { budgets, updateBudget, removeBudget } = useFinance();
  const { currency, convert, rates } = useCurrency();

  if (!budgets || typeof budgets !== "object") {
    return (
      <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <h3 className="font-semibold text-2xl text-slate-900 dark:text-white">Budgets</h3>
        <p className="text-m text-slate-500 dark:text-slate-400">No budgets available.</p>
      </div>
    );
  }

  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  /* Input is in Selected Currency -> Store in Base (INR) */
  const handleAddOrUpdate = () => {
    if (!newCategory || !newAmount) return;
    const rate = rates[currency] || 1;
    const amountInBase = Number(newAmount) / rate;
    updateBudget(newCategory, amountInBase);
    setNewCategory("");
    setNewAmount("");
  };

  return (
    <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-900 dark:text-white">Budgets</h3>

      {/* ================= ADD / UPDATE ================= */}
      <div className="flex gap-2">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category"
          className="flex-1 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-2 py-1 text-m text-slate-900 dark:text-white placeholder-slate-400"
        />
        <input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          placeholder="Amount"
          className="w-28 rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-2 py-1 text-sm text-slate-900 dark:text-white placeholder-slate-400"
        />
        <button
          onClick={handleAddOrUpdate}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* ================= BUDGET LIST ================= */}
      {Object.keys(budgets).length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No budgets set.</p>
      ) : (
        Object.entries(budgets).map(([category, limit]) => {
          const spent = transactions
            .filter(
              (t) =>
                t.type === "expense" &&
                t.category?.toLowerCase() === category.toLowerCase()
            )
            .reduce((sum, t) => sum + Number(t.amount || 0), 0);

          const percent =
            limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

          let barColor = "bg-emerald-500";
          if (percent >= 90 && percent < 100) barColor = "bg-amber-500";
          if (percent >= 100) barColor = "bg-rose-500";

          return (
            <div key={category} className="space-y-1">
              <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                <span>{category}</span>
                <span>
                  {currency} {convert(spent)} / {convert(limit)}
                </span>
              </div>

              <div className="h-2 w-full rounded bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all duration-500`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <button
                onClick={() => removeBudget(category)}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
              >
                Remove
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BudgetsPanel;
