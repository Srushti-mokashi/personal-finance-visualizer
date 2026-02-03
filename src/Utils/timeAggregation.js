// Utility functions to aggregate transactions by time

export function aggregateByDay(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const day = t.date; // YYYY-MM-DD
    map[day] = (map[day] || 0) + t.amount;
  });

  return Object.keys(map).map((key) => ({
    label: key.slice(8), // day number
    value: map[key],
  }));
}

export function aggregateByWeek(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const week = getWeekNumber(date);
    map[week] = (map[week] || 0) + t.amount;
  });

  return Object.keys(map).map((key) => ({
    label: `Week ${key}`,
    value: map[key],
  }));
}

export function aggregateByMonth(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });
    map[month] = (map[month] || 0) + t.amount;
  });

  return Object.keys(map).map((key) => ({
    label: key,
    value: map[key],
  }));
}

export function aggregateByYear(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const year = new Date(t.date).getFullYear();
    map[year] = (map[year] || 0) + t.amount;
  });

  return Object.keys(map).map((key) => ({
    label: key,
    value: map[key],
  }));
}

// Helper function
function getWeekNumber(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const diff = date - firstDay;
  return Math.ceil((diff / 86400000 + firstDay.getDay() + 1) / 7);
}
