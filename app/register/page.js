"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... logic remains same
  };

  return (
    <div className="auth-container">
      <style jsx global>{`
        :root {
          --brand-gold: #ffb300;
          --brand-brown: #3e2723;
          --bg-cream: #fdfaf7;
          --text-main: #1a1a1a;
        }

        body {
          margin: 0;
          background-color: var(--bg-cream);
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .auth-container {
          display: flex;
          min-height: 100vh;
        }

        /* Side Aesthetic Panel (Desktop Only) */
        .side-panel {
          flex: 1;
          background: var(--brand-brown);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          color: white;
        }

        .side-panel h1 {
          font-size: 3rem;
          color: var(--brand-gold);
          margin-bottom: 20px;
        }

        /* Main Form Side */
        .form-side {
          flex: 1.2;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .form-card {
          width: 100%;
          max-width: 440px;
        }

        .form-card h2 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--brand-brown);
          margin-bottom: 8px;
        }

        .form-card p {
          color: #6d4c41;
          margin-bottom: 32px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--brand-brown);
        }

        .input-group input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--brand-gold);
          box-shadow: 0 0 0 3px rgba(255, 179, 0, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: var(--brand-gold);
          color: var(--brand-brown);
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.2s;
        }

        .submit-btn:hover {
          background: #ffa000;
          transform: translateY(-1px);
        }

        .footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.9rem;
        }

        .footer a {
          color: var(--brand-brown);
          font-weight: 700;
          text-decoration: none;
          border-bottom: 2px solid var(--brand-gold);
        }

        @media (max-width: 900px) {
          .side-panel { display: none; }
          .form-side { background: white; }
        }
      `}</style>

      <div className="side-panel">
        <h1>SokoDirect</h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9}}>
          The smartest way to manage your Kenyan retail shop. 
          Digitize your sales, track your growth, and access credit.
        </p>
      </div>

      <div className="form-side">
        <div className="form-card">
          <h2>Create Account</h2>
          <p>Join thousands of shopkeepers growing with us.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Shop Name</label>
              <input 
                type="text" 
                placeholder="Business name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                placeholder="07xx xxx xxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Location</label>
              <input 
                type="text" 
                placeholder="Town / Estate"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="submit-btn">Register My Shop</button>
          </form>

          <div className="footer">
            Already have an account? <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}