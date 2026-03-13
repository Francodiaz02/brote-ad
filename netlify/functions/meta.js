// netlify/functions/meta.js
// Token en servidor (seguro). Ad Account ID viene del cliente por parámetro.
// Así cada cliente puede tener su propia cuenta de Meta Ads.

const META_TOKEN = process.env.META_TOKEN;

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const FIELDS = [
  "campaign_name","adset_name","ad_name","objective",
  "spend","impressions","reach","clicks","ctr","frequency",
  "actions","cost_per_action_type",
].join(",");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS")
    return { statusCode: 204, headers: CORS, body: "" };

  if (!META_TOKEN) {
    return {
      statusCode: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "META_TOKEN no configurado en Netlify" }),
    };
  }

  const { since, until, acct } = event.queryStringParameters || {};
  if (!since || !until || !acct) {
    return {
      statusCode: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Faltan parámetros: since, until, acct" }),
    };
  }

  const adAccount = acct.startsWith("act_") ? acct : "act_" + acct;
  const params = new URLSearchParams({
    fields:       FIELDS,
    time_range:   JSON.stringify({ since, until }),
    level:        "ad",
    limit:        "500",
    access_token: META_TOKEN,
  });

  try {
    const res  = await fetch(`https://graph.facebook.com/v19.0/${adAccount}/insights?${params}`);
    const data = await res.json();
    if (data.error) {
      return { statusCode: 400, headers: { ...CORS, "Content-Type": "application/json" },
               body: JSON.stringify({ error: data.error.message }) };
    }
    return { statusCode: 200, headers: { ...CORS, "Content-Type": "application/json" },
             body: JSON.stringify({ data: data.data || [] }) };
  } catch (err) {
    return { statusCode: 500, headers: { ...CORS, "Content-Type": "application/json" },
             body: JSON.stringify({ error: err.message }) };
  }
};
