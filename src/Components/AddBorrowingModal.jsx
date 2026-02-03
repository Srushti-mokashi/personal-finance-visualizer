import { useEffect, useState } from "react";
import { useBorrowing } from "../Context/BorrowingContext";
import Modal from "./Modal";

export default function AddBorrowingModal({ open, onClose }) {
  const { addBorrowing, updateBorrowing, editingBorrowing } = useBorrowing();

  const initialState = {
    category: "",
    description: "",
    amount: "",
    date: "",
    status: "PENDING",
    paymentMode: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!open) {
      setForm(initialState);
      return;
    }

    if (editingBorrowing) {
      setForm({
        id: editingBorrowing.id,
        category: editingBorrowing.category || "",
        description: editingBorrowing.description || "",
        amount: editingBorrowing.amount || "",
        date: editingBorrowing.date || "",
        status: editingBorrowing.status || "PENDING",
        paymentMode: editingBorrowing.paymentMode || "",
      });
    }
  }, [open, editingBorrowing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.paymentMode) {
      alert("Please select payment mode");
      return;
    }

    editingBorrowing ? updateBorrowing(form) : addBorrowing(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="mb-5 text-lg font-semibold text-white">
        {editingBorrowing ? "Edit Borrowing" : "Add Borrowing"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-200">
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
          required
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
          required
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
          required
        />

        {/* PAYMENT MODE (ALWAYS) */}
        <select
          value={form.paymentMode}
          onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
          required
        >
          <option value="" className="bg-[#0B0E14]">
            Select Payment Mode
          </option>
          <option value="CASH" className="bg-[#0B0E14]">Cash</option>
          <option value="ONLINE" className="bg-[#0B0E14]">Online</option>
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
        >
          <option value="PENDING" className="bg-[#0B0E14]">Pending</option>
          <option value="PAID" className="bg-[#0B0E14]">Paid</option>
          <option value="CANCELLED" className="bg-[#0B0E14]">Cancelled</option>
        </select>

        <button className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
          Save Borrowing
        </button>
      </form>
    </Modal>
  );
}
