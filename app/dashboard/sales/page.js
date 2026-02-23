"use client";

import { useEffect, useState } from "react";

export default function SalesPage() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remainingStock, setRemainingStock] = useState(0);
  const [reports, setReports] = useState({
    daily: 0,
    monthly: 0,
    yearly: 0,
  });

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Fetch reports
  const fetchReports = async () => {
    const res = await fetch("/api/reports");
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Update remaining stock
  useEffect(() => {
    const product = products.find(p => p._id === selectedId);
    if (product) setRemainingStock(product.stockQuantity);
  }, [selectedId, products]);

  const handleSale = async () => {
    if (!selectedId || quantity <= 0) return;

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: selectedId,
        quantitySold: Number(quantity),
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Sale recorded!");
      fetchReports();
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Record Sale</h1>

      {/* Sales Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-md">
        <select
          className="w-full border p-2 rounded"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.stockQuantity} in stock)
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          className="w-full border p-2 rounded"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Quantity Sold"
        />

        <p className="text-sm text-gray-600">
          Remaining Stock: {remainingStock}
        </p>

        <button
          onClick={handleSale}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Record Sale
        </button>
      </div>

      {/* Reports Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Daily Total" value={reports.daily} />
        <StatCard title="Monthly Total" value={reports.monthly} />
        <StatCard title="Yearly Total" value={reports.yearly} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2">KES {value.toLocaleString()}</p>
    </div>
  );
}