import { Plus } from "lucide-react";

export default function AddTransactionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      <Plus size={16} />
      Add Transaction
    </button>
  );
}
