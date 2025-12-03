

export default {
  async scheduled(event, env, ctx) {
    await handleTrigger(env);
  },

  async fetch(request, env, ctx) {
    return new Response("Health Trigger Worker active", { status: 200 });
  },
};

async function handleTrigger(env) {
  const url = "https://hooks.jonathan-harris.online/dw5subfnlocutv";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trigger: "auto", interval: "30min" })
    });

    const text = await res.text();

    return new Response(`Triggered: ${text}`, { status: 200 });
  } catch (err) {
    return new Response(`Trigger failed: ${err}`, { status: 500 });
  }
}
