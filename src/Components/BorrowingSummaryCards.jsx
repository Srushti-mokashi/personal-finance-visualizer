import { useBorrowing } from "../Context/BorrowingContext";
import { useCurrency } from "../Context/CurrencyContext";

export default function BorrowingSummaryCards() {
  const { borrowingSummary } = useBorrowing();
  const { currency, convert } = useCurrency();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card
        title="Paid Amount"
        value={convert(borrowingSummary.paid)}
        currency={currency}
        color="red"
      />
      <Card
        title="Pending Amount"
        value={convert(borrowingSummary.pending)}
        currency={currency}
        color="yellow"
      />
      <Card
        title="Cancelled Amount"
        value={convert(borrowingSummary.cancelled)}
        currency={currency}
        color="slate"
      />
    </div>
  );
}

function Card({ title, value, currency, color }) {
  const colorMap = {
    red: "text-rose-400",
    yellow: "text-yellow-400",
    slate: "text-green-500",
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
