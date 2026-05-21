export async function onRequestPost({ request, env }) {
  const data = await request.json();

  // basic validation
  if (!data.discord || !data.product || !data.amount) {
    return new Response("Missing fields", { status: 400 });
  }

  // simple anti-spam (basic rate limit placeholder)
  const ip = request.headers.get("CF-Connecting-IP");

  // send to Discord webhook
  await fetch(env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `🚨 NEW ORDER\nDiscord: ${data.discord}\nProduct: ${data.product}\nAmount: ${data.amount}\nIP: ${ip}`
    })
  });

  return new Response("OK", { status: 200 });
}