export async function getProducts() {
  const res = await fetch("https://vip-reseller.co.id/api/game-feature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_id: process.env.VIP_API_ID,
      api_key: process.env.VIP_API_KEY,
      sign: process.env.VIP_SIGN,
      type: "services"
    }),
    cache: "no-store"
  });

  return res.json();
}
