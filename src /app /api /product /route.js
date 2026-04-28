import { getProducts } from "@/lib/vip";

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}
