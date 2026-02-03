// import { useMemo } from "react";
// import { useFinance } from "../Context/FinanceContext";
// import { useCurrency } from "../Context/CurrencyContext";

// export default function DateTransactions({ selectedDate }) {
//   const { transactions } = useFinance();
//   const { currency, convert } = useCurrency();

//   const dayTransactions = transactions.filter(
//     (t) => t.date === selectedDate
//   );

//   /* ================= TOTALS ================= */
//   const totals = useMemo(() => {
//     let income = 0;
//     let expense = 0;

//     dayTransactions.forEach((t) => {
//       const amt = Number(t.amount) || 0;
//       if (t.type === "income") income += amt;
//       if (t.type === "expense") expense += amt;
//     });

//     return {
//       income,
//       expense,
//       net: income - expense,
//     };
//   }, [dayTransactions]);

//   return (
//     <div className="rounded-xl border-slate-100 bg-slate-900 p-4 shadow-sm">
//       {/* HEADER */}
//       <div className="mb-3 flex items-start justify-between">
//         <h3 className="font-semibold  text-slate-200">
//           Transactions on {selectedDate}
//         </h3>

//         {/* TOTALS (RIGHT CORNER) */}
//         <div className="text-right text-xs leading-tight">
//           <p className="text-emerald-600">
//             Income: {currency} {convert(totals.income)}
//           </p>
//           <p className="text-rose-600">
//             Expense: {currency} {convert(totals.expense)}
//           </p>
//           <p
//             className={`font-medium ${
//               totals.net >= 0
//                 ? "text-emerald-700"
//                 : "text-rose-700"
//             }`}
//           >
//             Net: {currency} {convert(totals.net)}
//           </p>
//         </div>
//       </div>

//       {/* TRANSACTIONS */}
//       {dayTransactions.length === 0 ? (
//         <p className="text-sm text-slate-500">
//           No transactions on this date.
//         </p>
//       ) : (
//         <ul className="space-y-3">
//           {dayTransactions.map((t) => (
//             <li
//               key={t.id}
//               className="flex justify-between rounded-lg border p-3"
//             >
//               <div>
//                 <p className="font-medium">{t.category}</p>
//                 <p className="text-xs text-slate-500">
//                   {t.note || "-"}
//                 </p>
//               </div>

//               <span
//                 className={`font-semibold ${
//                   t.type === "income"
//                     ? "text-emerald-600"
//                     : "text-rose-600"
//                 }`}
//               >
//                 {currency} {convert(t.amount)}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useMemo } from "react";
import { useFinance } from "../Context/FinanceContext";
import { useCurrency } from "../Context/CurrencyContext";

export default function DateTransactions({ selectedDate }) {
  const { transactions } = useFinance();
  const { currency, convert } = useCurrency();

  const dayTransactions = transactions.filter(
    (t) => t.date === selectedDate
  );

  /* ================= TOTALS ================= */
  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    dayTransactions.forEach((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") income += amt;
      if (t.type === "expense") expense += amt;
    });

    return {
      income,
      expense,
      net: income - expense,
    };
  }, [dayTransactions]);

  return (
    <div
      className="
        rounded-2xl
        bg-[#0B0E14]/95
        backdrop-blur-xl
        border border-blue-500/40   /* ✅ BLUE BORDER */
        p-5
      "
    >
      {/* ================= HEADER ================= */}
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-semibold text-xl text-slate-200">
          Transactions on {selectedDate}
        </h3>

        {/* TOTALS ROW */}
        <div className="flex gap-[2px] text-lg">
          <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-400 hover:bg-green-500/20">
            Income: {currency} {convert(totals.income)}
          </span>

          <span className="rounded-md bg-rose-500/10 px-2 py-1 text-rose-400 hover:bg-red-500/20">
            Expense: {currency} {convert(totals.expense)}
          </span>

          <span className="rounded-md bg-blue-500/10 px-2 py-1 text-blue-400 hover:bg-blue-500/20">
            Net: {currency} {convert(totals.net)}
          </span>
        </div>
      </div>

      {/* ================= TRANSACTIONS ================= */}
      {dayTransactions.length === 0 ? (
        <p className="text-lg text-slate-500">
          No transactions on this date.
        </p>
      ) : (
        <ul className="space-y-3">
          {dayTransactions.map((t) => (
            <li
              key={t.id}
              className="
                flex items-center justify-between
                rounded-lg
                border border-white/10
                bg-white/5
                px-4 py-3
              "
            >
              <div>
                <p className="font-medium text-slate-200">
                  {t.category}
                </p>
                <p className="text-xs text-slate-500">
                  {t.note || "-"}
                </p>
              </div>

              <span
                className={`font-semibold ${
                  t.type === "income"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {currency} {convert(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
