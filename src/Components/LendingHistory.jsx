// src/Components/LendingHistory.jsx
import { useLending } from "../Context/LendingContext";

export default function LendingHistory() {
  const { lendings } = useLending();

  if (lendings.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No lending history yet.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Lending History</h3>

      <table className="w-full text-sm">
        <thead className="text-slate-500 border-b">
          <tr>
            <th align="left">Person</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {lendings.map((l) => (
            <tr key={l.id} className="border-b last:border-0">
              <td>{l.person}</td>
              <td>{l.date}</td>
              <td>₹{l.amount}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    l.status === "Succeeded"
                      ? "bg-green-100 text-green-700"
                      : l.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
