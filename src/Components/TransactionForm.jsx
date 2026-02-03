import React, { useState } from "react";
import { useFinance } from "../Context/FinanceContext";

const DEFAULT_CATEGORIES = [
  "Salary",
  "Freelance",
  "Food",
  "Rent",
  "Bills",
  "Shopping",
  "Travel",
  "Entertainment",
  "Health",
  "Other",
];

const TransactionForm = ({ onAdded }) => {
  const { addTransaction } = useFinance();

  const [type, setType] = useState("expense");
  const [paymentMode, setPaymentMode] = useState("online");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [note, setNote] = useState("");
  const [isSensitive, setIsSensitive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    addTransaction({
      type,
      category,
      amount: Number(amount),
      date,
      note,
      paymentMode,
      isSensitive,
    });

    setAmount("");
    setNote("");
    setIsSensitive(false);
    onAdded?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-border backdrop-blur p-6 space-y-5 text-slate-300"
    >
      {/* 🔒 SENSITIVE TOGGLE */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsSensitive((v) => !v)}
          className={`rounded-full px-4 py-1 text-m font-medium border transition ${
            isSensitive
              ? "border-red-400/40 bg-red-500/10 text-red-300"
              : "border-white/10 bg-white/5 text-slate-400"
          }`}
        >
          {isSensitive ? "🔒 Sensitive ON" : "🔓 Sensitive OFF"}
        </button>
      </div>

      {/* TYPE */}
      <div>
        <label className="text-m text-slate-400">Type</label>
        <div className="mt-2 flex gap-2">
          {["income", "expense"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                type === t
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* PAYMENT MODE */}
      <div>
        <label className="text-m text-slate-400">Payment Mode</label>
        <div className="mt-2 flex gap-2">
          {["online", "cash"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPaymentMode(m)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                paymentMode === m
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {m === "online" ? "ONLINE" : "CASH"}
            </button>
          ))}
        </div>
      </div>

      {/* AMOUNT */}
      <div>
        <label className="text-m text-slate-400">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹ 0"
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="text-m text-slate-400">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {DEFAULT_CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#0B0E14]">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* DATE */}
      <div>
        <label className="text-m text-slate-400">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* NOTE */}
      <div>
        <label className="text-m text-slate-400">Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* SUBMIT */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="rounded-full px-6 py-2 text-sm font-medium text-white
            bg-gradient-to-r from-violet-600 to-indigo-600
            shadow-[0_0_25px_rgba(139,92,246,0.7)]
            hover:scale-[1.04] transition"
        >
          Save Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
