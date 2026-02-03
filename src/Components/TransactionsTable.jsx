import { useMemo, useState } from "react";
import { useFinance } from "../Context/FinanceContext";
import { useCurrency } from "../Context/CurrencyContext";
import { Pencil, Trash2 } from "lucide-react";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

export default function TransactionsTable() {
  const {
    transactions,
    deleteTransaction,
    isSensitiveUnlocked,
    startEditTransaction,
  } = useFinance();

  const { currency, convert } = useCurrency();

  const [typeFilter, setTypeFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  /* ================= VISIBLE ================= */
  const visibleTransactions = useMemo(() => {
    return transactions.filter(
      (t) => !t.isSensitive || isSensitiveUnlocked
    );
  }, [transactions, isSensitiveUnlocked]);

  /* ================= MONTH OPTIONS ================= */
  const months = useMemo(() => {
    const set = new Set();
    visibleTransactions.forEach((t) => {
      if (!t?.date) return;
      const d = new Date(t.date);
      if (!isNaN(d)) {
        set.add(
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        );
      }
    });
    return Array.from(set).sort();
  }, [visibleTransactions]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return visibleTransactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;

      if (monthFilter !== "all") {
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}`;
        if (key !== monthFilter) return false;
      }

      return true;
    });
  }, [visibleTransactions, typeFilter, monthFilter]);

  return (
    <div className="space-y-6">
      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg bg-white/5 border border-blue-500 px-3 py-2 text-sm text-slate-300"
        >
          <option value="all" className="bg-[#0f1a31]">All</option>
          <option value="income" className="bg-[#2b8d38]">Income</option>
          <option value="expense" className="bg-[#b61a1a]">Expense</option>
        </select>

        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="rounded-lg bg-white/5 border border-blue-500 px-3 py-2 text-sm text-slate-300"
        >
          <option value="all" className="bg-[#0B0E14]">All months</option>
          {months.map((m) => (
            <option key={m} value={m} className="bg-[#0B0E14]">
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-2xl bg-slate-900 border border-slate-400 overflow-x-auto">
        <table className="w-full table-fixed text-sm text-slate-300">
          <thead className="border-b border-slate-500 text-slate-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Mode</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-center w-24">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-3 text-left">
                    {formatDate(t.date)}
                  </td>

                  <td className="p-3 capitalize text-left">
                    {t.type}
                  </td>

                  <td className="p-3 text-left">
                    {t.isSensitive && !isSensitiveUnlocked
                      ? "🔒 Hidden"
                      : t.category}
                  </td>

                  <td className="p-3 text-center uppercase text-xs text-slate-400">
                    {t.paymentMode || "—"}
                  </td>

                  <td className="p-3 text-right font-medium text-white">
                    {currency} {convert(t.amount)}
                  </td>

                  <td className="p-3 text-left text-slate-400 truncate">
                    {t.note || "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => startEditTransaction?.(t)}
                        title="Edit"
                        className="rounded-md p-1.5 text-blue-400 hover:bg-blue-400/10 transition"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => deleteTransaction(t.id)}
                        title="Delete"
                        className="rounded-md p-1.5 text-rose-400 hover:bg-rose-400/10 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
