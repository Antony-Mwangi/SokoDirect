"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="auth-container">
      <style jsx global>{`
        :root {
          --brand-gold: #ffb300;
          --brand-brown: #3e2723;
          --bg-cream: #fdfaf7;
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

        /* Branding Side */
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
          letter-spacing: -0.05em;
        }

        .side-panel p {
            font-size: 1.2rem;
            line-height: 1.6;
            opacity: 0.9;
            max-width: 400px;
        }

        /* Form Side */
        .form-side {
          flex: 1.2;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          background: white;
        }

        .form-card {
          width: 100%;
          max-width: 400px;
        }

        h2 {
          color: var(--brand-brown);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.04em;
        }

        .subtitle {
          color: #6d4c41;
          margin-bottom: 40px;
          font-size: 1.1rem;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          color: var(--brand-brown);
        }

        input {
          width: 100%;
          padding: 16px;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        input:focus {
          outline: none;
          border-color: var(--brand-gold);
          box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: var(--brand-gold);
          color: var(--brand-brown);
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background: #ffa000;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 179, 0, 0.2);
        }

        .footer {
          margin-top: 32px;
          text-align: center;
          color: #6d4c41;
        }

        .footer a {
          color: var(--brand-brown);
          font-weight: 800;
          text-decoration: none;
          border-bottom: 2px solid var(--brand-gold);
          padding-bottom: 2px;
          margin-left: 5px;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .side-panel { display: none; }
          .form-side { background: var(--bg-cream); }
          .form-card {
              background: white;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          }
        }

        @media (max-width: 480px) {
            .form-side { padding: 20px; }
            .form-card { padding: 30px 20px; border-radius: 0; box-shadow: none; background: transparent; }
            h2 { font-size: 1.8rem; }
        }
      `}</style>

      <div className="side-panel">
        <h1>SokoDirect</h1>
        <p>
          Welcome back to Kenya's leading shop management partner. 
          Your data, your growth, your future.
        </p>
      </div>

      <div className="form-side">
        <div className="form-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to access your dashboard.</p>

          <form onSubmit={handleSubmit}>
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
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <div className="footer">
            New to SokoDirect? 
            <Link href="/register">Register Shop</Link>
          </div>
        </div>
      </div>
    </div>
  );
}