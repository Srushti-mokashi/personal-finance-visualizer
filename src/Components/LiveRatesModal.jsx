import { useState, useMemo } from "react";
import Modal from "./Modal";
import { useCurrency } from "../Context/CurrencyContext";

/* 🌍 Auto flag generator */
const getFlag = (code) =>
  code
    .slice(0, 2)
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );

export default function LiveRatesModal({ open, onClose }) {
  const { rates, symbols, currency, loading } = useCurrency();

  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(1);

  if (!rates) return null;

  /* 🔁 Build + filter rows */
  const rows = useMemo(() => {
    return Object.entries(rates)
      .filter(([code]) => code !== "INR")
      .map(([code, rate]) => {
        const inrPerUnit = 1 / rate; // 1 currency → INR
        return {
          code,
          name: symbols[code]?.description || "",
          inr: inrPerUnit,
          converted: (amount * inrPerUnit).toFixed(2),
        };
      })
      .filter(
        (item) =>
          item.code.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [rates, symbols, search, amount]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            💱 Live Exchange Rates
          </h3>
          <span className="text-sm text-slate-400">
            Converted to INR (₹)
          </span>
        </div>

        {/* AMOUNT INPUT */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="
              w-32 rounded-lg
              border border-white/10
              bg-slate-900
              px-3 py-2
              text-sm text-white
              outline-none
              focus:border-blue-500
            "
          />
          <span className="text-sm text-slate-400">
            Amount
          </span>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search currency (USD, Dollar, EUR...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full rounded-lg
            border border-white/10
            bg-slate-900
            px-3 py-2
            text-sm text-white
            placeholder-slate-500
            outline-none
            focus:border-blue-500
          "
        />

        {loading && (
          <p className="text-sm text-slate-400">
            Fetching latest rates…
          </p>
        )}

        {/* TABLE */}
        <div className="max-h-[420px] overflow-y-auto rounded-xl border border-white/10 bg-slate-800">
          <table className="w-full text-sm text-slate-300">
            <thead className="sticky top-0 bg-slate-800 text-slate-300">
              <tr>
                <th className="p-3 text-left">Currency</th>
                
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="p-4 text-center text-slate-500"
                  >
                    No currency found
                  </td>
                </tr>
              )}

              {rows.map(({ code, name, converted }) => (
                <tr
                  key={code}
                  className={`
                    border-t border-white/5
                    hover:bg-white/5 transition
                    ${
                      code === currency
                        ? "bg-blue-500/10"
                        : ""
                    }
                  `}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getFlag(code)}</span>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          {code}
                        </span>
                        <span className="text-xs text-slate-400">
                          {name}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-right font-mono text-emerald-400">
                    ₹ {converted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400">
          Enter an amount to see its value in Indian Rupees.
        </p>
      </div>
    </Modal>
  );
}
