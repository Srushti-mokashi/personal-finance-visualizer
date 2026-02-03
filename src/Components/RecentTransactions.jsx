import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFinance } from "../Context/FinanceContext";
import { useCurrency } from "../Context/CurrencyContext";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

export default function RecentTransactions() {
  const {
    transactions,
    isSensitiveUnlocked,
  } = useFinance();

  const { currency, convert } = useCurrency();

  /* ================= VISIBLE TRANSACTIONS ================= */
  const visibleTransactions = useMemo(() => {
    return transactions.filter(
      (t) => !t.isSensitive || isSensitiveUnlocked
    );
  }, [transactions, isSensitiveUnlocked]);

  /* ================= LAST 3 ================= */
  const recent = useMemo(() => {
    return [...visibleTransactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  }, [visibleTransactions]);

  return (
    <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
      <div className="mb-3 flex justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">Recent Transactions</h3>

        <Link
          to="/transactions"
          className="text-xl font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No recent transactions
        </p>
      ) : (
        <ul className="space-y-3">
          {recent.map((t) => (
            <li
              key={t.id}
              className="flex justify-between bg-slate-50 dark:bg-white/5 rounded-lg p-2"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {t.isSensitive && !isSensitiveUnlocked
                    ? "🔒 Hidden"
                    : t.category}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(t.date)}
                </p>
              </div>

              <span
                className={`font-semibold ${t.type === "income"
                    ? "text-emerald-400"
                    : "text-rose-500"
                  }`}
              >
                {currency} {convert(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
