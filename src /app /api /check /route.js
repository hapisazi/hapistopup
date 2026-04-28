export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://pg.ronzzyt.id/api/transaction/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: process.env.RONZZYT_API_KEY,
      reff_id: body.reff_id
    })
  });

  const data = await res.json();
  return Response.json(data);
}
