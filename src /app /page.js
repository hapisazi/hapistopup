import Link from "next/link";
import { getProducts } from "@/lib/vip";

export default async function Home() {
  const result = await getProducts();
  const products = result?.data || [];

  return (
    <div className="container">

      <h1>Hapis Topup</h1>

      <p className="subtitle">
        Topup Game Murah, Cepat & Aman
      </p>

      {products.slice(0, 12).map((item, i) => (
        <div className="card" key={i}>
          <h3>{item.name}</h3>

          <p>
            Rp {item.price?.basic || item.price}
          </p>

          <Link
            href={`/checkout?name=${encodeURIComponent(item.name)}&price=${
              item.price?.basic || item.price
            }&code=${item.code}`}
          >
            <button className="buyBtn">
              Beli Sekarang
            </button>
          </Link>
        </div>
      ))}

    </div>
  );
}
