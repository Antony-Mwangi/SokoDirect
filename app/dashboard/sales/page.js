"use client";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Retail",
    paymentMethod: "Cash",
    notes: "",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchSales = async () => {
    const res = await fetch("/api/sales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
      }),
    });

    setForm({
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "Retail",
      paymentMethod: "Cash",
      notes: "",
    });

    fetchSales();
  };

  const deleteSale = async (id) => {
    await fetch("/api/sales", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    fetchSales();
  };

  // 📊 Summary Calculations
  const today = new Date().toDateString();

  const todayTotal = sales
    .filter(s => new Date(s.date).toDateString() === today)
    .reduce((sum, s) => sum + s.amount, 0);

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const monthTotal = sales
    .filter(s => {
      const d = new Date(s.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, s) => sum + s.amount, 0);

  const avgDaily = sales.length
    ? (monthTotal / new Date().getDate()).toFixed(2)
    : 0;

  return (
    <div>
      <h1>Sales Management</h1>

      {/* Summary */}
      <div style={styles.summary}>
        <div>Today: KES {todayTotal}</div>
        <div>This Month: KES {monthTotal}</div>
        <div>Total Transactions: {sales.length}</div>
        <div>Avg Daily: KES {avgDaily}</div>
      </div>

      {/* Add Sale Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          required
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          required
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Retail</option>
          <option>Wholesale</option>
          <option>Service</option>
        </select>

        <select
          value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
        >
          <option>Cash</option>
          <option>M-Pesa</option>
          <option>Bank</option>
        </select>

        <input
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit">Add Sale</button>
      </form>

      {/* Sales Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>KES {sale.amount}</td>
              <td>{sale.category}</td>
              <td>{sale.paymentMethod}</td>
              <td>{sale.notes}</td>
              <td>
                <button onClick={() => deleteSale(sale._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  summary: {
    display: "flex",
    gap: "30px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};