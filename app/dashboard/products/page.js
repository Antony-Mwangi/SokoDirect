"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState({
    name: "",
    category: "",
    stockQuantity: "",
    price: "",
  });

  const fetchProducts = async () => {
    const res = await fetch(
      `/api/products?search=${search}&category=${category}`
    );
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const handleAdd = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        stockQuantity: Number(form.stockQuantity),
        price: Number(form.price),
      }),
    });

    setForm({ name: "", category: "", stockQuantity: "", price: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleRestock = async (id) => {
    const qty = prompt("Enter quantity to add:");
    if (!qty || qty <= 0) return;

    await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        quantity: Number(qty),
      }),
    });

    fetchProducts();
  };

  const handleEdit = async (product) => {
    const newPrice = prompt("Enter new price:", product.price);
    if (!newPrice) return;

    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        price: Number(newPrice),
      }),
    });

    fetchProducts();
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background-color: #f8f5f0;
        }

        .container {
          padding: 40px 20px;
          max-width: 1200px;
          margin: auto;
        }

        h1 {
          color: #3b2f2f;
          margin-bottom: 30px;
        }

        /* Search + Filter */
        .filters {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        input, select {
          padding: 10px;
          border: 1px solid #c8b560;
          border-radius: 6px;
          outline: none;
          min-width: 200px;
        }

        input:focus, select:focus {
          border-color: #8b6f3d;
        }

        /* Form */
        .form-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .primary-btn {
          background-color: #8b6f3d;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: bold;
        }

        .primary-btn:hover {
          background-color: #6e552e;
        }

        /* Table */
        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        thead {
          background-color: #f1d879;
        }

        th, td {
          padding: 14px;
          text-align: left;
          color: #2c2c2c;
        }

        th {
          font-weight: bold;
          color: #3b2f2f;
        }

        tr {
          border-bottom: 1px solid #eee;
        }

        tr:hover {
          background-color: #faf3d1;
        }

        .action-btn {
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          margin-right: 5px;
          transition: 0.3s;
        }

        .edit-btn {
          background-color: #3b2f2f;
          color: white;
        }

        .edit-btn:hover {
          background-color: black;
        }

        .restock-btn {
          background-color: #f1c40f;
          color: black;
        }

        .restock-btn:hover {
          background-color: #d4ac0d;
        }

        .delete-btn {
          background-color: #8b0000;
          color: white;
        }

        .delete-btn:hover {
          background-color: #5c0000;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container {
            padding: 20px 15px;
          }

          th, td {
            padding: 10px;
            font-size: 14px;
          }

          .action-btn {
            margin-bottom: 5px;
          }
        }
      `}</style>

      <div className="container">
        <h1>ProductManagement</h1>

        <div className="filters">
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-card">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stockQuantity}
            onChange={(e) =>
              setForm({ ...form, stockQuantity: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <button onClick={handleAdd} className="primary-btn">
            Add Product
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price (KES)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stockQuantity}</td>
                  <td>KES {p.price}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(p)}
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleRestock(p._id)}
                      className="action-btn restock-btn"
                    >
                      Restock
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}