import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FinanceContext = createContext();

const TRANSACTIONS_KEY = "pfm_transactions";
const BUDGETS_KEY = "pfm_budgets";
const PASSKEY_KEY = "pfm_passkey";
const DEFAULT_PASSKEY = "1234";

export function FinanceProvider({ children }) {
  /* ================= PASSKEY ================= */
  const [passkey, setPasskey] = useState(() => {
    return localStorage.getItem(PASSKEY_KEY) || DEFAULT_PASSKEY;
  });

  const [isSensitiveUnlocked, setIsSensitiveUnlocked] = useState(false);

  useEffect(() => {
    localStorage.setItem(PASSKEY_KEY, passkey);
  }, [passkey]);

  /* ================= TRANSACTIONS ================= */
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem(TRANSACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  /* ================= BUDGETS ================= */
  const [budgets, setBudgets] = useState(() => {
    const stored = localStorage.getItem(BUDGETS_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  /* ================= PERSIST ================= */
  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  }, [budgets]);

  /* ================= TRANSACTIONS ================= */
  const addTransaction = (txn) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...txn,
        id: crypto.randomUUID(),
        isSensitive: Boolean(txn.isSensitive),
      },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  /* ================= PASSKEY LOGIC ================= */
  const unlockSensitive = (input) => {
    if (input === passkey) {
      setIsSensitiveUnlocked(true);
      return true;
    }
    return false;
  };

  const lockSensitive = () => setIsSensitiveUnlocked(false);

  const updatePasskey = (oldKey, newKey) => {
    if (oldKey !== passkey) return false;
    setPasskey(newKey);
    setIsSensitiveUnlocked(false); // auto-lock
    return true;
  };

  /* ================= VISIBLE ================= */
  const visibleTransactions = useMemo(() => {
    return transactions.filter(
      (t) => !t.isSensitive || isSensitiveUnlocked
    );
  }, [transactions, isSensitiveUnlocked]);

  /* ================= CASH / ONLINE BALANCES ================= */
  const { cashBalance, onlineBalance } = useMemo(() => {
    let cash = 0;
    let online = 0;

    transactions.forEach((t) => {
      if (!t.paymentMode) return;

      const mode = t.paymentMode.toUpperCase();
      const amt = Number(t.amount) || 0;
      const sign = t.type === "expense" ? -1 : 1;

      if (mode === "CASH") cash += sign * amt;
      if (mode === "ONLINE") online += sign * amt;
    });

    return { cashBalance: cash, onlineBalance: online };
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        /* DATA */
        transactions,
        visibleTransactions,
        budgets,
        cashBalance,
        onlineBalance,

        /* ACTIONS */
        addTransaction,
        deleteTransaction,
        updateBudget: (category, limit) => {
          setBudgets((prev) => ({
            ...prev,
            [category]: limit,
          }));
        },
        removeBudget: (category) => {
          setBudgets((prev) => {
            const next = { ...prev };
            delete next[category];
            return next;
          });
        },

        /* SENSITIVE */
        isSensitiveUnlocked,
        unlockSensitive,
        lockSensitive,
        updatePasskey,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
