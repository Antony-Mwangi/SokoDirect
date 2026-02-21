"use client";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const [amount, setAmount] = useState("");
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const addSale = async (e) => {
    e.preventDefault();

    await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });

    setAmount("");
    fetchSales();
  };

  return (
    <div>
      <h1>Sales</h1>

      <form onSubmit={addSale}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Sale</button>
      </form>

      <ul>
        {sales.map((sale) => (
          <li key={sale._id}>
            KES {sale.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}