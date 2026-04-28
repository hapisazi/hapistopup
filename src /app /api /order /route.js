export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://vip-reseller.co.id/api/game-feature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_id: process.env.VIP_API_ID,
      api_key: process.env.VIP_API_KEY,
      sign: process.env.VIP_SIGN,

      type: "order",
      service: body.code,
      data_no: body.userId,
      data_zone: body.zoneId || ""
    })
  });

  const data = await res.json();
  return Response.json(data);
}
