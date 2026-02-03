export default function ChartToggle({ value, onChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {["day", "month", "year"].map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-3 py-1 rounded text-sm font-medium transition
            ${
              value === v
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
