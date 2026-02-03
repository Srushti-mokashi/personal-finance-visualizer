import { useState } from "react";
import { useLending } from "../Context/LendingContext";
import Modal from "./Modal";

export default function EditLendingModal({ lending, onClose }) {
  const { updateLending } = useLending();

  const [form, setForm] = useState({ ...lending });

  const handleSave = () => {
    updateLending(form);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">Edit Lending</h3>

      <div className="space-y-3">
        <input
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: Number(e.target.value) })
          }
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Amount"
        />

        <input
          type="text"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Category"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md"
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md"
        >
          <option>Pending</option>
          <option>Succeeded</option>
          <option>Cancelled</option>
        </select>

        <textarea
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Description"
        />
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}
