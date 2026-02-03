import BorrowingSummaryCards from "../Components/BorrowingSummaryCards";
import BorrowingTable from "../Components/BorrowingTable";
import AddBorrowingModal from "../Components/AddBorrowingModal";
import { useBorrowing } from "../Context/BorrowingContext";

export default function Borrowing() {
  const { isModalOpen, closeModal, startEdit } = useBorrowing();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-white">Borrowing</h2>
        <button
          onClick={() => startEdit(null)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          + Add Borrowing
        </button>
      </div>

      <BorrowingSummaryCards />
      <BorrowingTable />
      <AddBorrowingModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
}
