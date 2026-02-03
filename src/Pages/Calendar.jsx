import { useState } from "react";
import CalendarView from "../Components/CalendarView";
import DateTransactions from "../Components/DateTransactions";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  return (
    <div className="space-y-10">
      <header >
        <h2 className="text-4xl font-semibold text-white">
          Calendar
        </h2>
        <p className="text-sm text-slate-400">
          View transactions by date
        </p>
      </header>

      <CalendarView
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <DateTransactions selectedDate={selectedDate} />
    </div>
  );
}
