import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { aggregateTransactions } from "../../Utils/chartUtils";

export default function IncomeExpenseChart({ transactions, view }) {
  const data = aggregateTransactions(transactions, view);

  return (
    <div className="h-full w-full">
      <h3 className="mb-2 font-semibold text-white">
        Income vs Expenses
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0B0E14",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
            itemStyle={{ color: "#f1f5f9" }}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />
          <Bar
            dataKey="income"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="#64748b"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
