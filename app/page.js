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
          background-color: #fdfaf7; 
          color: #1a1a1a;
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
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 24px;
          color: #3e2723;
          letter-spacing: -0.04em;
          line-height: 1.1;
        }

        .hero p {
          font-size: 1.25rem;
          color: #5d4037;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-buttons button {
          padding: 16px 32px;
          margin: 10px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-primary {
          background: #ffb300;
          color: #1a1a1a;
          box-shadow: 0 4px 20px rgba(255, 179, 0, 0.4);
        }

        .hero-primary:hover {
          background: #ffa000;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 179, 0, 0.5);
        }

        .hero-secondary {
          background: #1a1a1a;
          color: #ffb300;
        }

        .hero-secondary:hover {
          background: #333333;
          transform: translateY(-3px);
        }

        /* FEATURES SECTION */
        .features {
          background: #ffffff;
          padding: 100px 20px;
          text-align: center;
        }

        .features h2 {
          font-size: 2.5rem;
          margin-bottom: 60px;
          color: #3e2723;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: auto;
        }

        .feature-card {
          padding: 40px 30px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid #efebe9;
          transition: 0.4s ease;
          text-align: left;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: #ffb300;
          box-shadow: 0 20px 40px rgba(62, 39, 35, 0.08);
        }

        .icon-box {
          width: 60px;
          height: 60px;
          background: #fff8e1;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .icon {
          width: 32px;
          height: 32px;
          stroke: #ffb300;
        }

        .feature-card h3 {
          margin-bottom: 12px;
          font-size: 1.4rem;
          color: #1a1a1a;
        }

        /* HOW IT WORKS (WITH IMAGE) */
        .how-it-works {
          padding: 100px 20px;
          background: #3e2723;
          color: #fdfaf7;
        }

        .section-container {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .content-side {
          text-align: left;
        }

        .image-side {
          position: relative;
        }

        .stranded-img {
          width: 100%;
          height: auto;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 179, 0, 0.3);
        }

        .how-it-works h2 {
          font-size: 2.8rem;
          margin-bottom: 30px;
          color: #ffb300;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .step {
          padding-left: 24px;
          border-left: 3px solid rgba(255, 179, 0, 0.2);
          transition: 0.3s;
        }

        .step:hover {
          border-left: 3px solid #ffb300;
        }

        .step h3 {
          color: #ffb300;
          margin-bottom: 8px;
          font-size: 1.25rem;
        }

        .step p {
          color: #d7ccc8;
          line-height: 1.6;
        }

        @media (max-width: 968px) {
          .section-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .content-side { text-align: center; }
          .step { border-left: none; border-top: 2px solid rgba(255,179,0,0.2); padding-left: 0; padding-top: 20px; }
          .hero h1 { font-size: 2.8rem; }
        }
        `}
      </style>

      <div className="wrapper">
        {/* HERO */}
        <section className="hero">
          <h1>Turn Your Daily Sales Into Credit Power</h1>
          <p>
            SokoDirect helps Kenyan shopkeepers digitize inventory, track
            revenue, and generate Business Health Reports to grow confidently.
          </p>

          <div className="hero-buttons">
            <Link href="/register">
              <button className="hero-primary">Get Started Now</button>
            </Link>
            <Link href="/login">
              <button className="hero-secondary">Login to Shop</button>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <h2>Empowering Your Business</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-box">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3>Smart Inventory</h3>
              <p>Keep track of every item. Know exactly what's in stock and what's flying off the shelves.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3>Sales Analytics</h3>
              <p>Visualise your daily, weekly, and monthly growth with easy-to-read revenue charts.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Credit Reports</h3>
              <p>Turn your data into a professional Health Report that lenders actually trust.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION WITH IMAGE */}
        <section className="how-it-works">
          <div className="section-container">
            <div className="content-side">
              <h2>How It Works</h2>
              <div className="steps">
                <div className="step">
                  <h3>01. Set Up Your Shop</h3>
                  <p>Add your products and current stock levels in less than 5 minutes.</p>
                </div>
                <div className="step">
                  <h3>02. Record Your Sales</h3>
                  <p>Log every transaction. Our system calculates your profit and stock margins instantly.</p>
                </div>
                <div className="step">
                  <h3>03. Scale Your Business</h3>
                  <p>Use your generated sales history to apply for the credit you need to expand.</p>
                </div>
              </div>
            </div>

            <div className="image-side">
              {/* Replace the src with your actual image path */}
              <img 
                src="/how%20it%20works.jpg" 
                alt="Support for local business" 
                className="stranded-img"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}