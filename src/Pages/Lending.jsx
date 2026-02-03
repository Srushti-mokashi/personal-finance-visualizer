import LendingSummaryCards from "../Components/LendingSummaryCards";
import LendingTable from "../Components/LendingTable";
import AddLendingModal from "../Components/AddLendingModal";
import { useLending } from "../Context/LendingContext";

const Lending = () => {
  const { isModalOpen, closeModal, startEdit } = useLending();

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">
            Lending
          </h2>
          <p className="text-sm text-slate-400">
            Track money you lend or borrow
          </p>
        </div>

        <button
          onClick={() => startEdit(null)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          + Add Lending
        </button>
      </div>

      {/* ================= SUMMARY ================= */}
      <LendingSummaryCards />

      {/* ================= TABLE ================= */}
      <LendingTable />

      {/* ================= MODAL ================= */}
      <AddLendingModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Lending;
