import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFinance } from "./FinanceContext";

const BorrowingContext = createContext(null);
const STORAGE_KEY = "pfm_borrowings";

export const BorrowingProvider = ({ children }) => {
  const { addTransaction } = useFinance();

  const [borrowings, setBorrowings] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editingBorrowing, setEditingBorrowing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(borrowings));
  }, [borrowings]);

  /* ================= ADD ================= */
  const addBorrowing = (data) => {
    const normalized = {
      id: crypto.randomUUID(),
      category: data.category,
      description: data.description || "",
      amount: Number(data.amount) || 0,
      date: data.date,
      status: data.status || "PENDING",
      paymentMode: data.paymentMode,
      createdAt: new Date().toISOString(),
    };

    /* ✅ PAID = EXPENSE */
    if (data.status === "PAID") {
      addTransaction({
        type: "expense",
        amount: Number(data.amount),
        category: "Borrowing Repayment",
        date: data.date,
        paymentMode: data.paymentMode,
        note: data.description || "Borrowing paid",
      });
    }

    setBorrowings((prev) => [normalized, ...prev]);
    closeModal();
  };

  const updateBorrowing = (updated) => {
    setBorrowings((prev) =>
      prev.map((b) => (b.id === updated.id ? { ...b, ...updated } : b))
    );
    closeModal();
  };

  const deleteBorrowing = (id) => {
    setBorrowings((prev) => prev.filter((b) => b.id !== id));
  };

  const borrowingSummary = useMemo(() => {
    let paid = 0;
    let pending = 0;
    let cancelled = 0;

    borrowings.forEach((b) => {
      const amt = Number(b.amount) || 0;
      if (b.status === "PAID") paid += amt;
      else if (b.status === "PENDING") pending += amt;
      else if (b.status === "CANCELLED") cancelled += amt;
    });

    return { paid, pending, cancelled };
  }, [borrowings]);

  const startEdit = (item = null) => {
    setEditingBorrowing(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingBorrowing(null);
    setIsModalOpen(false);
  };

  return (
    <BorrowingContext.Provider
      value={{
        borrowings,
        borrowingSummary,
        addBorrowing,
        updateBorrowing,
        deleteBorrowing,
        editingBorrowing,
        startEdit,
        isModalOpen,
        closeModal,
      }}
    >
      {children}
    </BorrowingContext.Provider>
  );
};

export const useBorrowing = () => useContext(BorrowingContext);
