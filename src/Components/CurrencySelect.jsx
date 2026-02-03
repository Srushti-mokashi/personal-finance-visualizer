import { useEffect, useMemo, useRef, useState } from "react";
import { useCurrency } from "../Context/CurrencyContext";

/* ================= FLAG MAP (PRIMARY COUNTRY) ================= */
const FLAG_MAP = {
  INR: "🇮🇳",
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  AUD: "🇦🇺",
  CAD: "🇨🇦",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
  HKD: "🇭🇰",
  SGD: "🇸🇬",
  NZD: "🇳🇿",
  ZAR: "🇿🇦",
  AED: "🇦🇪",
  SAR: "🇸🇦",
};

/* fallback flag */
const getFlag = (code) => FLAG_MAP[code] || "🏳️";

export default function CurrencySelect() {
  const { currency, setCurrency, symbols } = useCurrency();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    return Object.entries(symbols).filter(
      ([code, data]) =>
        code.toLowerCase().includes(search.toLowerCase()) ||
        data.description
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [symbols, search]);

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BUTTON */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          w-full flex items-center justify-between
          rounded-md bg-white/5 border border-white/10
          px-3 py-2 text-white
        "
      >
        <span className="flex items-center gap-2">
          <span>{getFlag(currency)}</span>
          <span className="font-medium">{currency}</span>
        </span>
        <span className="text-slate-400">⌄</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full max-h-72
            overflow-y-auto rounded-xl
            bg-[#0B0E14] border border-white/10
            shadow-xl
          "
        >
          {/* SEARCH */}
          <div className="p-2 border-b border-white/10">
            <input
              autoFocus
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full rounded-md bg-white/5
                border border-white/10
                px-3 py-2 text-sm text-white
                placeholder-slate-400
                outline-none
              "
            />
          </div>

          {/* LIST */}
          {filtered.length === 0 ? (
            <p className="p-4 text-sm text-slate-400">
              No currency found
            </p>
          ) : (
            filtered.map(([code, data]) => (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                  setSearch("");
                }}
                className="
                  w-full flex items-center gap-3
                  px-4 py-2 text-sm
                  text-slate-200
                  hover:bg-white/5
                  transition
                "
              >
                <span className="text-lg">
                  {getFlag(code)}
                </span>
                <span className="font-medium">{code}</span>
                <span className="text-slate-400 truncate">
                  {data.description}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
