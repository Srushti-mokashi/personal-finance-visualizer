export function calculateInsights(transactions, budgets = {}) {
  if (!transactions || transactions.length === 0) {
    return {
      summaryLines: ["No data yet. Add some transactions to see insights."],
      suggestions: [],
    };
  }

  let income = 0;
  let expense = 0;

  const categoryTotals = {};

  for (const t of transactions) {
    const amount = Number(t.amount) || 0;
    if (t.type === "income") income += amount;
    if (t.type === "expense") {
      expense += amount;
      const cat = t.category || "Other";
      if (!categoryTotals[cat]) categoryTotals[cat] = 0;
      categoryTotals[cat] += amount;
    }
  }

  const savings = income - expense;
  const savingRate = income > 0 ? (savings / income) * 100 : 0;

  // Top spending category
  let topCategory = null;
  let topAmount = 0;
  for (const [cat, total] of Object.entries(categoryTotals)) {
    if (total > topAmount) {
      topAmount = total;
      topCategory = cat;
    }
  }

  const summaryLines = [];

  summaryLines.push(
    `You recorded a total income of ₹${income.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })} and expenses of ₹${expense.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}.`
  );

  summaryLines.push(
    `Your current savings are ₹${savings.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}, which is about ${savingRate.toFixed(1)}% of your income.`
  );

  if (topCategory) {
    summaryLines.push(
      `Your highest spending category is "${topCategory}" with ₹${topAmount.toLocaleString(
        "en-IN",
        { maximumFractionDigits: 0 }
      )} spent.`
    );
  }

  // Suggestions
  const suggestions = [];

  if (savingRate < 15) {
    suggestions.push(
      "Your saving rate is on the lower side. Try to aim for at least 20–30% savings if possible."
    );
  } else if (savingRate >= 25) {
    suggestions.push(
      "Great job! Your saving rate looks healthy. Try to keep it consistent over the next few months."
    );
  }

  if (topCategory && savingRate < 30) {
    suggestions.push(
      `See if you can reduce your spending on "${topCategory}" by 5–10% next month to improve savings.`
    );
  }

  // Budget-based suggestions (if budgets provided)
  for (const [cat, limit] of Object.entries(budgets)) {
    const spent = categoryTotals[cat] || 0;
    if (spent > limit) {
      suggestions.push(
        `You crossed your budget for "${cat}" (spent ₹${spent.toLocaleString(
          "en-IN",
          { maximumFractionDigits: 0 }
        )} out of ₹${limit.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })}). Try to slow down in this category.`
      );
    } else if (spent > 0 && spent > limit * 0.8) {
      suggestions.push(
        `You are close to reaching your budget for "${cat}". Keep an eye on this category.`
      );
    }
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your spending pattern looks balanced so far. Keep tracking regularly to maintain control."
    );
  }

  return { summaryLines, suggestions };
}