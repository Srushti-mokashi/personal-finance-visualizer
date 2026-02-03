// src/utils/aiPrompts.js
export function buildFinancePrompt(summary, categories = [], budgets = {}) {
  // summary = { income, expense, savings, savingRate }
  // categories = [{ name, amount }, ...] - should be pre-sorted (top first)
  // budgets = { Food: 5000, Rent: 12000 }

  const topCategories = (categories || [])
    .slice(0, 6)
    .map((c) => `- ${c.name}: ${c.amount}`)
    .join("\n");

  const budgetsText =
    Object.keys(budgets || {}).length > 0
      ? Object.entries(budgets)
          .map(([k, v]) => `- ${k}: ${v}`)
          .join("\n")
      : "none";

  return `
You are a concise, factual personal finance assistant. DO NOT WRITE ANYTHING except a valid JSON object.
Read the input data below and RETURN JSON ONLY using this exact schema:

{
  "summary": "short one-line summary",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

INPUT DATA:
total_income: ${summary.income}
total_expense: ${summary.expense}
savings: ${summary.savings}
saving_rate_percent: ${Number(summary.savingRate).toFixed(1)}

Top categories (name: amount):
${topCategories || "none"}

Budgets:
${budgetsText}

Rules:
1) Provide 2-4 concise insights (each under 20 words).
2) Provide 2-4 practical suggestions (each one short and actionable).
3) If there is no meaningful data, return an object with a short summary and empty arrays.
4) Output only valid JSON. No explanation, no markdown, no commentary.
5) If you cannot produce valid JSON, output:
{"error":"could not produce json"}.

Now produce the JSON.
`.trim();
}