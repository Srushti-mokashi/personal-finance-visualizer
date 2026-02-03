// src/utils/llmClient.js
export async function callLLM_OpenAI(apiKey, prompt, opts = {}) {
  if (!apiKey) throw new Error("Missing API key");

  const model = opts.model || "gpt-4o-mini"; // change if model unavailable
  const body = {
    model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: opts.max_tokens ?? 400,
    temperature: opts.temperature ?? 0.2,
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`LLM error ${res.status}: ${txt}`);
  }

  const json = await res.json();
  // Extract assistant content (common structure)
  const content = json?.choices?.[0]?.message?.content ?? "";
  return content;
}
