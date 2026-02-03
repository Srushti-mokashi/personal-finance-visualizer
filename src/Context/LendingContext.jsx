import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFinance } from "./FinanceContext";

const LendingContext = createContext(null);
const STORAGE_KEY = "pfm_lendings";

export const LendingProvider = ({ children }) => {
  const { addTransaction } = useFinance();

  const [lendings, setLendings] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editingLending, setEditingLending] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lendings));
  }, [lendings]);

  /* ================= ADD ================= */
  const addLending = (data) => {
    const normalized = {
      id: crypto.randomUUID(),
      category: data.category,
      description: data.description || "",
      amount: Number(data.amount) || 0,
      date: data.date,
      status: data.status || "PENDING",
      paymentMode: data.paymentMode || null,
      addedToIncome: data.status === "PAID",
      createdAt: new Date().toISOString(),
    };

    /* ✅ PAID = INCOME */
    if (data.status === "PAID") {
      addTransaction({
        type: "income",
        amount: Number(data.amount),
        category: "Lending Return",
        date: data.date,
        paymentMode: data.paymentMode,
        note: data.description || "Lending received",
      });
    }

    setLendings((prev) => [normalized, ...prev]);
    closeModal();
  };

  /* ================= UPDATE ================= */
  const updateLending = (updated) => {
    setLendings((prev) =>
      prev.map((l) => {
        if (
          l.id === updated.id &&
          l.status !== "PAID" &&
          updated.status === "PAID" &&
          !l.addedToIncome
        ) {
          addTransaction({
            type: "income",
            amount: Number(updated.amount),
            category: "Lending Return",
            date: updated.date,
            paymentMode: updated.paymentMode,
            note: updated.description || "Lending received",
          });

          return { ...l, ...updated, addedToIncome: true };
        }

        return l.id === updated.id ? { ...l, ...updated } : l;
      })
    );

    closeModal();
  };

  const deleteLending = (id) => {
    setLendings((prev) => prev.filter((l) => l.id !== id));
  };

  const lendingSummary = useMemo(() => {
    let paid = 0;
    let cancelled = 0;

    lendings.forEach((l) => {
      const amt = Number(l.amount) || 0;
      if (l.status === "PAID") paid += amt;
      if (l.status === "CANCELLED") cancelled += amt;
    });

    return { paid, cancelled };
  }, [lendings]);

  const startEdit = (item = null) => {
    setEditingLending(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingLending(null);
    setIsModalOpen(false);
  };

  return (
    <LendingContext.Provider
      value={{
        lendings,
        lendingSummary,
        addLending,
        updateLending,
        deleteLending,
        editingLending,
        startEdit,
        isModalOpen,
        closeModal,
      }}
    >
      {children}
    </LendingContext.Provider>
  );
};

export const useLending = () => useContext(LendingContext);
