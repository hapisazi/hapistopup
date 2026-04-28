export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://pg.ronzzyt.id/api/transaction/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: process.env.RONZZYT_API_KEY,
      code: "qris",
      amount: Number(body.amount),
      description: body.description
    })
  });

  const data = await res.json();
  return Response.json(data);
}
