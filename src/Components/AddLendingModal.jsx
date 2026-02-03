import { useEffect, useState } from "react";
import { useLending } from "../Context/LendingContext";
import { useCurrency } from "../Context/CurrencyContext";
import Modal from "./Modal";

export default function AddLendingModal({ open, onClose }) {
  const { addLending, updateLending, editingLending } = useLending();
  const { currency } = useCurrency();

  const initialFormState = {
    category: "",
    description: "",
    amount: "",
    date: "",
    status: "PENDING",
    paymentMode: "",
  };

  const [form, setForm] = useState(initialFormState);

  /* ================= RESET & PREFILL ================= */
  useEffect(() => {
    if (!open) {
      setForm(initialFormState);
      return;
    }

    if (editingLending) {
      setForm({
        id: editingLending.id,
        category: editingLending.category || "",
        description: editingLending.description || "",
        amount: editingLending.amount || "",
        date: editingLending.date || "",
        status: editingLending.status || "PENDING",
        paymentMode: editingLending.paymentMode || "",
      });
    } else {
      setForm(initialFormState);
    }
  }, [open, editingLending]);

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.status === "PAID" && !form.paymentMode) {
      alert("Please select payment mode");
      return;
    }

    if (editingLending) {
      updateLending(form);
    } else {
      addLending(form);
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="mb-5 text-lg font-semibold text-white">
        {editingLending ? "Edit Lending" : "Add Lending"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-200">
        {/* CATEGORY */}
        <input
          type="text"
          placeholder="Category"
          className="
            w-full rounded-lg
            bg-white/5 border border-white/10
            px-3 py-2 text-sm text-white
            placeholder-slate-500
            focus:outline-none
          "
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        />

        {/* DESCRIPTION */}
        <input
          type="text"
          placeholder="Description"
          className="
            w-full rounded-lg
            bg-white/5 border border-white/10
            px-3 py-2 text-sm text-white
            placeholder-slate-500
            focus:outline-none
          "
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder={`Amount (${currency})`}
          className="
            w-full rounded-lg
            bg-white/5 border border-white/10
            px-3 py-2 text-sm text-white
            placeholder-slate-500
            focus:outline-none
          "
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
        />

        {/* DATE */}
        <input
          type="date"
          className="
            w-full rounded-lg
            bg-white/5 border border-white/10
            px-3 py-2 text-sm text-white
            focus:outline-none
          "
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        {/* STATUS */}
        <select
          className="
            w-full rounded-lg
            bg-white/5 border border-white/10
            px-3 py-2 text-sm text-white
            focus:outline-none
          "
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="PENDING" className="bg-[#0B0E14]">
            Pending
          </option>
          <option value="PAID" className="bg-[#0B0E14]">
            Paid
          </option>
          <option value="CANCELLED" className="bg-[#0B0E14]">
            Cancelled
          </option>
        </select>

        {/* PAYMENT MODE – ONLY WHEN PAID */}
        {form.status === "PAID" && (
          <select
            className="
              w-full rounded-lg
              bg-white/5 border border-white/10
              px-3 py-2 text-sm text-white
              focus:outline-none
            "
            value={form.paymentMode}
            onChange={(e) =>
              setForm({ ...form, paymentMode: e.target.value })
            }
            required
          >
            <option value="" className="bg-[#0B0E14]">
              Select Payment Mode
            </option>
            <option value="CASH" className="bg-[#0B0E14]">
              Cash
            </option>
            <option value="ONLINE" className="bg-[#0B0E14]">
              Online
            </option>
          </select>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="
            mt-2 w-full rounded-lg
            bg-blue-600
            py-2 text-sm font-medium text-white
            hover:bg-blue-700
            transition
          "
        >
          {editingLending ? "Save Changes" : "Add Lending"}
        </button>
      </form>
    </Modal>
  );
}
