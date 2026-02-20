"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>
        {`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #f8fafc;
          color: #111827;
        }

        .wrapper {
          width: 100%;
        }

        /* HERO SECTION */
        .hero {
          padding: 120px 20px;
          text-align: center;
          max-width: 900px;
          margin: auto;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #1e3a8a;
        }

        .hero p {
          font-size: 1.25rem;
          color: #4b5563;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-buttons button {
          padding: 14px 30px;
          margin: 10px;
          border-radius: 10px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .hero-primary {
          background: #2563eb;
          color: white;
        }

        .hero-primary:hover {
          background: #1d4ed8;
        }

        .hero-secondary {
          background: white;
          border: 2px solid #2563eb;
          color: #2563eb;
        }

        .hero-secondary:hover {
          background: #eff6ff;
        }

        /* FEATURES SECTION */
        .features {
          background: white;
          padding: 100px 20px;
          text-align: center;
        }

        .features h2 {
          font-size: 2.2rem;
          margin-bottom: 60px;
          color: #111827;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1100px;
          margin: auto;
        }

        .feature-card {
          padding: 30px;
          border-radius: 14px;
          background: #f9fafb;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
        }

        .feature-card h3 {
          margin-bottom: 15px;
          color: #2563eb;
          font-size: 1.2rem;
        }

        .feature-card p {
          color: #4b5563;
          line-height: 1.6;
        }

        /* HOW IT WORKS */
        .how-it-works {
          padding: 100px 20px;
          text-align: center;
          background: #f1f5f9;
        }

        .how-it-works h2 {
          font-size: 2.2rem;
          margin-bottom: 50px;
        }

        .steps {
          max-width: 800px;
          margin: auto;
        }

        .step {
          margin-bottom: 50px;
        }

        .step h3 {
          color: #1e3a8a;
          margin-bottom: 12px;
          font-size: 1.3rem;
        }

        .step p {
          color: #475569;
          font-size: 1rem;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.2rem;
          }

          .hero p {
            font-size: 1.1rem;
          }
        }
        `}
      </style>

      <div className="wrapper">

        {/* HERO */}
        <section className="hero">
          <h1>Turn Your Daily Sales Into Credit Power</h1>
          <p>
            SokoDirect helps Kenyan shopkeepers digitize inventory, track
            revenue, and generate Business Health Reports to access loans and
            grow confidently.
          </p>

          <div className="hero-buttons">
            <Link href="/register">
              <button className="hero-primary">Get Started</button>
            </Link>

            <Link href="/login">
              <button className="hero-secondary">I Have an Account</button>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <h2>Everything Your Shop Needs</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>📦 Smart Inventory</h3>
              <p>
                Track stock levels automatically and get alerts when products
                run low.
              </p>
            </div>

            <div className="feature-card">
              <h3>💰 Sales Tracking</h3>
              <p>
                Record daily sales and instantly see your revenue and profit
                performance.
              </p>
            </div>

            <div className="feature-card">
              <h3>📊 Business Insights</h3>
              <p>
                Visual dashboards show trends, top products, and growth over
                time.
              </p>
            </div>

            <div className="feature-card">
              <h3>📄 Credit-Ready Reports</h3>
              <p>
                Generate professional Business Health Reports to present to
                lenders and banks.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works">
          <h2>How It Works</h2>

          <div className="steps">
            <div className="step">
              <h3>1. Add Your Products</h3>
              <p>Enter your stock and pricing once to start tracking digitally.</p>
            </div>

            <div className="step">
              <h3>2. Record Daily Sales</h3>
              <p>The system updates stock and calculates profit automatically.</p>
            </div>

            <div className="step">
              <h3>3. Generate Business Report</h3>
              <p>Download a professional credit report to access financing.</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}