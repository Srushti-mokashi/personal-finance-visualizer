import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

export default function DashboardDatePicker({ value, onChange }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white">
        <CalendarDays size={16} />
        <DatePicker
          selected={value}
          onChange={onChange}
          dateFormat="MMM yyyy"
          showMonthYearPicker
          className="bg-transparent outline-none cursor-pointer w-24"
        />
      </div>
    </div>
  );
}
