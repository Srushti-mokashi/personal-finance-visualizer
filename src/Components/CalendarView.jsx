import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";

export default function CalendarView({ selectedDate, onDateChange }) {
  return (
    <div className="flex justify-center">
      <div
        className="
          rounded-2xl
          bg-[#0B0E14]/95
          backdrop-blur-xl
          border border-blue-800/80
          p-8
          w-[480px]
          h-[400px]
        "
      >
        <Calendar
          value={new Date(selectedDate)}
          onChange={(date) =>
            onDateChange(date.toLocaleDateString("en-CA"))
          }
          className="calendar-dark w-full h-full"
        />
      </div>
    </div>
  );
}
