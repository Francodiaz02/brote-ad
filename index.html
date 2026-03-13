// netlify/functions/ai.js
// Usa Gemini 2.0 Flash — gratis (1500 req/día con Google AI Studio key)

const GEMINI_KEY = process.env.GEMINI_KEY;

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS")
    return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: CORS, body: "Method not allowed" };

  if (!GEMINI_KEY) {
    return {
      statusCode: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "GEMINI_KEY no configurada en Netlify" }),
    };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers: CORS, body: "Invalid JSON" }; }

  const { prompt, kb = [] } = body;
  if (!prompt)
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Falta prompt" }) };

  const fullPrompt = prompt + (kb.length ? "\n\nRecursos de referencia:\n" + kb.join("\n") : "");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    });
    const data = await res.json();
    if (data.error)
      return { statusCode: 400, headers: { ...CORS, "Content-Type": "application/json" },
               body: JSON.stringify({ error: data.error.message }) };

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
    return { statusCode: 200, headers: { ...CORS, "Content-Type": "application/json" },
             body: JSON.stringify({ text }) };
  } catch (err) {
    return { statusCode: 500, headers: { ...CORS, "Content-Type": "application/json" },
             body: JSON.stringify({ error: err.message }) };
  }
};
