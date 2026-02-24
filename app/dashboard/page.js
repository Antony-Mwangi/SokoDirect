// "use client";
// import { useEffect, useState } from "react";

// export default function DashboardOverview() {
//   const [sales, setSales] = useState([]);

//   useEffect(() => {
//     fetch("/api/sales")
//       .then(res => res.json())
//       .then(data => setSales(data));
//   }, []);

//   const total = sales.reduce((sum, sale) => sum + sale.amount, 0);

//   return (
//     <div>
//       <h1>Dashboard Overview</h1>
//       <p>Total Sales: KES {total}</p>
//       <p>Transactions: {sales.length}</p>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("/api/sales").then(res => res.json()).then(data => setSales(data));
  }, []);

  const total = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <>
      <style>{`
        .ov-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 20px; }
        .ov-card { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .ov-card.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; }
        .label { font-size: 14px; opacity: 0.9; margin-bottom: 8px; display: block; }
        .value { font-size: 28px; font-weight: 800; }
      `}</style>

      <h1>Dashboard Overview</h1>
      <div className="ov-grid">
        <div className="ov-card blue">
          <span className="label">TOTAL SALES REVENUE</span>
          <div className="value">KES {total.toLocaleString()}</div>
        </div>
        <div className="ov-card">
          <span className="label" style={{color: "#64748b"}}>TOTAL TRANSACTIONS</span>
          <div className="value" style={{color: "#0f172a"}}>{sales.length}</div>
        </div>
      </div>
    </>
  );
}