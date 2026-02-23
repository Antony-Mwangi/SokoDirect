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

  /* ADD PRODUCT */
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

  /* DELETE */
  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  /* RESTOCK */
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

  /* EDIT */
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

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>

      {/* Search + Filter */}
      <div className="flex gap-4">
        <input
          placeholder="Search product..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-4 rounded shadow grid grid-cols-4 gap-4">
        <input
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded"
          value={form.stockQuantity}
          onChange={(e) =>
            setForm({ ...form, stockQuantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />
        <button
          onClick={handleAdd}
          className="col-span-4 bg-green-600 text-white py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.stockQuantity}</td>
              <td className="p-3">KES {p.price}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleRestock(p._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Restock
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}