import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { aggregateTransactions } from "../../Utils/chartUtils";

export default function SavingsRateChart({ transactions, view }) {
  const raw = aggregateTransactions(transactions, view);

  const data = raw.map((d) => ({
    label: d.label,
    rate:
      d.income > 0
        ? ((d.income - d.expense) / d.income) * 100
        : 0,
  }));

  return (
    <div className="h-full w-full">
      <h3 className="mb-2 font-semibold text-white">
        Savings Rate (%)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis unit="%" stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0B0E14",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
            itemStyle={{ color: "#f1f5f9" }}
            cursor={{ stroke: "rgba(255,255,255,0.2)" }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
