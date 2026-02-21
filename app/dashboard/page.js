"use client";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("/api/sales")
      .then(res => res.json())
      .then(data => setSales(data));
  }, []);

  const total = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <p>Total Sales: KES {total}</p>
      <p>Transactions: {sales.length}</p>
    </div>
  );
}