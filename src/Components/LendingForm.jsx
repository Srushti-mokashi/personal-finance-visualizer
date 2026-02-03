import { useState } from "react";
import { useLending } from "../Context/LendingContext";

export default function LendingForm() {
  const { addLending } = useLending();

  const [form, setForm] = useState({
    person: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    status: "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addLending({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      person: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      status: "Pending",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        bg-[#0B0E14]/95
        backdrop-blur-xl
        border border-white/10
        p-6
        space-y-4
        text-slate-200
      "
    >
      <h3 className="text-lg font-semibold text-white">
        Add Lending
      </h3>

      {/* PERSON */}
      <input
        placeholder="Person / Category"
        className="
          w-full rounded-lg
          bg-white/5 border border-white/10
          px-3 py-2 text-sm text-white
          placeholder-slate-500
          focus:outline-none
        "
        value={form.person}
        onChange={(e) =>
          setForm({ ...form, person: e.target.value })
        }
        required
      />

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount"
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
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        className="
          w-full rounded-lg
          bg-white/5 border border-white/10
          px-3 py-2 text-sm text-white
          placeholder-slate-500
          focus:outline-none
          resize-none
        "
        rows={3}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
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
        <option className="bg-[#0B0E14]">Pending</option>
        <option className="bg-[#0B0E14]">Succeeded</option>
        <option className="bg-[#0B0E14]">Cancelled</option>
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        className="
          w-full rounded-lg
          bg-blue-600
          px-4 py-2
          text-sm font-medium text-white
          hover:bg-blue-700
          transition
        "
      >
        Save Lending
      </button>
    </form>
  );
}
