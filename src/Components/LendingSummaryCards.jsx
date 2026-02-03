// import { useMemo } from "react";
// import { useLending } from "../Context/LendingContext";
// import { useCurrency } from "../Context/CurrencyContext";

// export default function LendingSummaryCards() {
//   const { lendings } = useLending();
//   const { currency, convert } = useCurrency();

//   const summary = useMemo(() => {
//     let paid = 0;
//     let pending = 0;
//     let cancelled = 0;

//     lendings.forEach((l) => {
//       const amt = Number(l.amount) || 0;

//       if (l.status === "PAID") {
//         paid += amt;
//       } else if (l.status === "PENDING") {
//         pending += amt;
//       } else if (l.status === "CANCELLED") {
//         cancelled += amt;
//       }
//     });

//     return { paid, pending, cancelled };
//   }, [lendings]);

//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//       <Card title="Paid Amount" value={convert(summary.paid)} currency={currency} />
//       <Card title="Pending Amount" value={convert(summary.pending)} currency={currency} />
//       <Card title="Cancelled Amount" value={convert(summary.cancelled)} currency={currency} />
//     </div>
//   );
// }

// function Card({ title, value, currency }) {
//   return (
//     <div className="rounded-xl border bg-white p-4 shadow-sm">
//       <p className="text-sm text-slate-500">{title}</p>
//       <h3 className="text-2xl font-semibold">
//         {currency} {value}
//       </h3>
//     </div>
//   );
// }


import { useMemo } from "react";
import { useLending } from "../Context/LendingContext";
import { useCurrency } from "../Context/CurrencyContext";

export default function LendingSummaryCards() {
  const { lendings } = useLending();
  const { currency, convert } = useCurrency();

  const summary = useMemo(() => {
    let paid = 0;
    let pending = 0;
    let cancelled = 0;

    lendings.forEach((l) => {
      const amt = Number(l.amount) || 0;

      if (l.status === "PAID") paid += amt;
      else if (l.status === "PENDING") pending += amt;
      else if (l.status === "CANCELLED") cancelled += amt;
    });

    return { paid, pending, cancelled };
  }, [lendings]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card title="Paid Amount" value={convert(summary.paid)} currency={currency} color="green" />
      <Card title="Pending Amount" value={convert(summary.pending)} currency={currency} color="yellow" />
      <Card title="Cancelled Amount" value={convert(summary.cancelled)} currency={currency} color="red" />
    </div>
  );
}

function Card({ title, value, currency, color }) {
  const colorMap = {
    green: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-rose-400",
  };

  return (
    <div className="rounded-2xl bg-[#0B0E14]/95 border border-white/10 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className={`text-2xl font-semibold ${colorMap[color]}`}>
        {currency} {value}
      </h3>
    </div>
  );
}
