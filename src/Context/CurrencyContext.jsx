import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext(null);

const CURRENCY_KEY = "pfm_currency";
const SYMBOLS_KEY = "pfm_symbols";
const RATES_KEY = "pfm_rates";
const BASE_CURRENCY = "INR";

/* 🔐 GUARANTEED FALLBACK */
const DEFAULT_SYMBOLS = {
  INR: { description: "Indian Rupee" },
  USD: { description: "US Dollar" },
  EUR: { description: "Euro" },
  GBP: { description: "British Pound" },
  JPY: { description: "Japanese Yen" },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(
    () => localStorage.getItem(CURRENCY_KEY) || BASE_CURRENCY
  );

  const [symbols, setSymbols] = useState(() => {
    const cached = localStorage.getItem(SYMBOLS_KEY);
    return cached ? JSON.parse(cached) : DEFAULT_SYMBOLS;
  });

  const [rates, setRates] = useState(() => {
    const cached = localStorage.getItem(RATES_KEY);
    return cached ? JSON.parse(cached) : { INR: 1 };
  });

  const [loading, setLoading] = useState(false);

  /* SAVE SELECTED CURRENCY */
  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency]);

  /* FETCH SYMBOLS (optional, safe) */
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate.host/symbols"
        );
        const data = await res.json();

        if (data?.symbols) {
          setSymbols(data.symbols);
          localStorage.setItem(
            SYMBOLS_KEY,
            JSON.stringify(data.symbols)
          );
        }
      } catch {
        console.warn("Symbols API blocked, using fallback");
      }
    };

    fetchSymbols();
  }, []);

  /* ✅ FETCH LIVE RATES (FIXED & RELIABLE) */
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://open.er-api.com/v6/latest/INR"
        );
        const data = await res.json();

        if (data?.rates) {
          setRates(data.rates);
          localStorage.setItem(
            RATES_KEY,
            JSON.stringify(data.rates)
          );
        }
      } catch (err) {
        console.warn("Rates API failed, using cached data");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();

    /* 🔄 Auto refresh every 10 minutes */
    const interval = setInterval(fetchRates, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /* INR → Selected Currency */
  const convertNumber = (amount) => {
    const rate = rates[currency] || 1;
    return Number(amount || 0) * rate;
  };

  const convert = (amount) => convertNumber(amount).toFixed(2);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        baseCurrency: BASE_CURRENCY,
        symbols,
        rates,
        loading,
        convert,
        convertNumber,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }
  return ctx;
};
