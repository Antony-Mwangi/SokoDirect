// "use client";

// export default function CreditPage() {
//   return (
//     <div style={{ padding: "24px" }}>
//       <h1>Credit Score</h1>
//       <p>This page will calculate and show the user's credit score based on sales history.</p>
//     </div>
//   );
// }

"use client";

export default function CreditPage() {
  return (
    <>
      <style>{`
        .credit-container { text-align: center; max-width: 600px; margin: 40px auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .score-gauge { width: 150px; height: 150px; border-radius: 50%; border: 12px solid #22c55e; display: flex; align-items: center; justify-content: center; margin: 20px auto; font-size: 32px; font-weight: 800; color: #1e293b; }
      `}</style>
      
      <div className="credit-container">
        <h1>Merchant Credit Score</h1>
        <div className="score-gauge">740</div>
        <p style={{color: "#64748b", lineHeight: "1.6"}}>
          Your credit score is calculated based on your sales consistency, inventory management, and transaction history.
          <strong> Keep selling to increase your score!</strong>
        </p>
      </div>
    </>
  );
}