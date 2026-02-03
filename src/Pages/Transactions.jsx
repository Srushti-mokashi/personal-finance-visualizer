import { useState } from "react";
import TransactionsTable from "../Components/TransactionsTable";
import { useFinance } from "../Context/FinanceContext";

const Transactions = () => {
  const {
    isSensitiveUnlocked,
    unlockSensitive,
    lockSensitive,
  } = useFinance();

  const [showPasskey, setShowPasskey] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = () => {
    const success = unlockSensitive(passkey);
    if (!success) {
      setError("Incorrect passkey");
    } else {
      setError("");
      setPasskey("");
      setShowPasskey(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            All Transactions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Only transactions marked as sensitive are hidden.
          </p>
        </div>

        {!isSensitiveUnlocked ? (
          <button
            onClick={() => setShowPasskey(true)}
            className="rounded-lg bg-slate-200 dark:bg-slate-700 px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            🔒 View Hidden Transactions
          </button>
        ) : (
          <button
            onClick={lockSensitive}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700 transition"
          >
            🔐 Hide Sensitive
          </button>
        )}
      </header>

      {/* ================= PASSKEY INPUT ================= */}
      {showPasskey && !isSensitiveUnlocked && (
        <div className="max-w-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 p-4 space-y-3 shadow-lg dark:shadow-none">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Enter passkey to view hidden transactions
          </p>

          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="Passkey"
            className="w-full rounded-lg bg-slate-100 dark:bg-white/10 px-3 py-2 text-slate-900 dark:text-white focus:outline-none border border-slate-200 dark:border-transparent"
          />

          {error && (
            <p className="text-sm text-rose-400">{error}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleUnlock}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 transition"
            >
              Unlock
            </button>

            <button
              onClick={() => {
                setShowPasskey(false);
                setPasskey("");
                setError("");
              }}
              className="rounded-lg bg-slate-300 dark:bg-slate-600 px-4 py-2 text-sm text-slate-800 dark:text-white hover:bg-slate-400 dark:hover:bg-slate-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ================= TRANSACTION LIST ================= */}
      <section>
        <TransactionsTable />
      </section>
    </div>
  );
};

export default Transactions;
