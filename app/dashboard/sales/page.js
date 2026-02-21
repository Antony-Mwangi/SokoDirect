"use client";

import { useEffect, useState } from "react";

export default function SalesPage() {
  const [sales, setSales] = useState([]); // ✅ always array
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // ✅ Load sales safely
  useEffect(() => {
    const stored = localStorage.getItem("sales");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSales(parsed);
        } else {
          setSales([]);
        }
      } catch {
        setSales([]);
      }
    }
  }, []);

  // ✅ Save sales safely
  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  const handleAddSale = (e) => {
    e.preventDefault();

    if (!amount) return;

    const newSale = {
      id: Date.now(),
      amount: Number(amount),
      category,
      paymentMethod,
      notes,
      date,
    };

    setSales((prev) => [...prev, newSale]);

    // Reset form
    setAmount("");
    setCategory("");
    setNotes("");
    setPaymentMethod("Cash");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleDelete = (id) => {
    setSales((prev) => prev.filter((sale) => sale.id !== id));
  };

  // ✅ Safe reduce (never crashes)
  const total = sales.reduce((sum, sale) => {
    return sum + Number(sale.amount || 0);
  }, 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sales Management</h1>

      {/* Add Sale Form */}
      <form onSubmit={handleAddSale} style={styles.form}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={styles.input}
        >
          <option>Cash</option>
          <option>M-Pesa</option>
          <option>Bank</option>
        </select>

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Sale
        </button>
      </form>

      {/* Summary */}
      <div style={styles.summary}>
        <h2>Total Revenue: KES {total.toLocaleString()}</h2>
        <p>Total Transactions: {sales.length}</p>
      </div>

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
          {sales.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No sales recorded yet.
              </td>
            </tr>
          ) : (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>KES {sale.amount}</td>
                <td>{sale.category}</td>
                <td>{sale.paymentMethod}</td>
                <td>{sale.notes}</td>
                <td>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "30px",
    maxWidth: "500px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  summary: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  deleteBtn: {
    padding: "5px 10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};