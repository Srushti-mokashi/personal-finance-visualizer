import { useLending } from "../Context/LendingContext";
import { useCurrency } from "../Context/CurrencyContext";
import { Pencil, Trash2 } from "lucide-react";

const LendingTable = () => {
  const { lendings, startEdit, deleteLending } = useLending();
  const { currency, symbolMap } = useCurrency();

  const sortedLendings = [...lendings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const formatAmount = (amount) => {
    const symbol = symbolMap?.[currency]?.symbol || currency;
    return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
  };

  const formatPaymentMode = (item) => {
    if (item.status !== "PAID") return "—";
    return item.paymentMode === "ONLINE" ? "Online" : "Cash";
  };

  return (
    <div className="rounded-2xl bg-[#0B0E14]/95 border border-slate-600 overflow-hidden">
      <table className="w-full table-fixed text-sm text-slate-300">
        <thead className="border-b border-white/20 text-slate-200 text-lg">
          <tr>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-center">Payment</th>
            <th className="p-3 text-center">Date</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedLendings.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-slate-500">
                No lending history found
              </td>
            </tr>
          )}

          {sortedLendings.map((item) => (
            <tr
              key={item.id}
              className="border-t border-white/5 hover:bg-white/5 transition"
            >
              <td className="p-3 truncate">{item.category}</td>

              <td className="p-3 truncate text-slate-400">
                {item.description || "-"}
              </td>

              <td className="p-3 text-right font-medium text-white">
                {formatAmount(item.amount)}
              </td>

              <td className="p-3 text-center text-slate-300">
                {formatPaymentMode(item)}
              </td>

              <td className="p-3 text-center">
                {new Date(item.date).toLocaleDateString("en-IN")}
              </td>

              <td className="p-3 text-center">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    item.status === "PAID"
                      ? "bg-emerald-600/10 text-emerald-400"
                      : item.status === "CANCELLED"
                      ? "bg-rose-500/10 text-rose-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="rounded-md p-1.5 text-blue-400 hover:bg-blue-400/10"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteLending(item.id)}
                    className="rounded-md p-1.5 text-rose-400 hover:bg-rose-400/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LendingTable;
