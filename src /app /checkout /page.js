"use client";

import { useState } from "react";

export default function Checkout({ searchParams }) {
  const name = searchParams.name;
  const price = searchParams.price;
  const code = searchParams.code;

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [pay, setPay] = useState(null);
  const [status, setStatus] = useState("");

  async function createPayment() {
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: price,
        description: name
      })
    });

    const data = await res.json();
    setPay(data.data);
    setStatus("pending");
  }

  async function checkPayment() {
    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reff_id: pay.reff_id
      })
    });

    const data = await res.json();
    const st = data.data.status;

    setStatus(st);

    if (st === "success") {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          userId,
          zoneId
        })
      });
    }
  }

  return (
    <div className="container">
      <h1>Checkout</h1>

      <div className="card">
        <h3>{name}</h3>
        <p>Rp {price}</p>

        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          placeholder="Zone ID (jika ada)"
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
        />

        {!pay && (
          <button className="buyBtn" onClick={createPayment}>
            Bayar Sekarang
          </button>
        )}
      </div>

      {pay && (
        <div className="card">
          <img src={pay.qr_image} width="100%" />
          <p>Status: {status}</p>

          <button className="buyBtn" onClick={checkPayment}>
            Cek Status
          </button>
        </div>
      )}
    </div>
  );
}
