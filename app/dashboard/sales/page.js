// "use client";

// import { useEffect, useState } from "react";

// export default function SalesPage() {
//   const [products, setProducts] = useState([]);
//   const [selectedId, setSelectedId] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [remainingStock, setRemainingStock] = useState(0);
//   const [reports, setReports] = useState({
//     daily: 0,
//     monthly: 0,
//     yearly: 0,
//   });

//   // Fetch products
//   useEffect(() => {
//     fetch("/api/products")
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   // Fetch reports
//   const fetchReports = async () => {
//     const res = await fetch("/api/reports");
//     const data = await res.json();
//     setReports(data);
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   // Update remaining stock
//   useEffect(() => {
//     const product = products.find(p => p._id === selectedId);
//     if (product) setRemainingStock(product.stockQuantity);
//   }, [selectedId, products]);

//   const handleSale = async () => {
//     if (!selectedId || quantity <= 0) return;

//     const res = await fetch("/api/sales", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         productId: selectedId,
//         quantitySold: Number(quantity),
//       }),
//     });

//     const data = await res.json();

//     if (data.error) {
//       alert(data.error);
//     } else {
//       alert("Sale recorded!");
//       fetchReports();
//     }
//   };

//   return (
//     <div className="p-8 space-y-8">
//       <h1 className="text-2xl font-bold">Record Sale</h1>

//       {/* Sales Form */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-md">
//         <select
//           className="w-full border p-2 rounded"
//           value={selectedId}
//           onChange={e => setSelectedId(e.target.value)}
//         >
//           <option value="">Select Product</option>
//           {products.map(p => (
//             <option key={p._id} value={p._id}>
//               {p.name} ({p.stockQuantity} in stock)
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           min="1"
//           className="w-full border p-2 rounded"
//           value={quantity}
//           onChange={e => setQuantity(e.target.value)}
//           placeholder="Quantity Sold"
//         />

//         <p className="text-sm text-gray-600">
//           Remaining Stock: {remainingStock}
//         </p>

//         <button
//           onClick={handleSale}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           Record Sale
//         </button>
//       </div>

//       {/* Reports Dashboard */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Daily Total" value={reports.daily} />
//         <StatCard title="Monthly Total" value={reports.monthly} />
//         <StatCard title="Yearly Total" value={reports.yearly} />
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow text-center">
//       <h2 className="text-gray-500 text-sm">{title}</h2>
//       <p className="text-2xl font-bold mt-2">KES {value.toLocaleString()}</p>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remainingStock, setRemainingStock] = useState(0);
  const [reports, setReports] = useState({ daily: 0, monthly: 0, yearly: 0 });

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await fetch("/api/reports");
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    const product = products.find(p => p._id === selectedId);
    if (product) setRemainingStock(product.stockQuantity);
  }, [selectedId, products]);

  const handleSale = async () => {
    if (!selectedId || quantity <= 0) return;
    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: selectedId, quantitySold: Number(quantity) }),
    });
    const data = await res.json();
    if (data.error) alert(data.error);
    else { alert("Sale recorded!"); fetchReports(); }
  };

  return (
    <>
      <style>{`
        .page-header { margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; color: #1e293b; }

        .sales-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
        }

        .sale-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          height: fit-content;
        }

        .form-label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px; }
        
        .form-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .btn-submit {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .report-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #2563eb;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-card h3 { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 10px; }
        .stat-val { font-size: 20px; font-weight: 700; color: #0f172a; }

        @media (max-width: 1024px) {
          .sales-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="page-header">
        <h1>Record Sale</h1>
      </div>

      <div className="sales-grid">
        <div className="sale-card">
          <label className="form-label">Select Product</label>
          <select className="form-input" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
            <option value="">Choose product...</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>{p.name} ({p.stockQuantity} in stock)</option>
            ))}
          </select>

          <label className="form-label">Quantity</label>
          <input type="number" className="form-input" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />

          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>
            Remaining Stock: <strong>{remainingStock}</strong>
          </p>

          <button onClick={handleSale} className="btn-submit">Complete Sale</button>
        </div>

        <div className="report-grid">
          <StatCard title="Daily Revenue" value={reports.daily} />
          <StatCard title="Monthly Revenue" value={reports.monthly} />
          <StatCard title="Yearly Revenue" value={reports.yearly} />
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-val">KES {value.toLocaleString()}</p>
    </div>
  );
}