export function aggregateTransactions(transactions, view) {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    let key;

    if (view === "day") {
      key = t.date; // YYYY-MM-DD
    } else if (view === "month") {
      key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
    } else {
      key = `${date.getFullYear()}`;
    }

    if (!map[key]) {
      map[key] = {
        label: key,
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") map[key].income += Number(t.amount);
    if (t.type === "expense") map[key].expense += Number(t.amount);
  });

  return Object.values(map);
}
