"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added Link import

export default function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password, shopName, location }),
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
    <div className="page-wrapper">
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #f3f4f6;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .page-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 420px;
        }

        h2 {
          color: #111827;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .subtitle {
          color: #6b7280;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        input {
          width: 100%;
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
        }

        input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        button {
          width: 100%;
          background-color: #2563eb;
          color: white;
          padding: 14px;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: #1d4ed8;
        }

        .footer-text {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          color: #4b5563;
        }

        .login-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .card {
            padding: 1.5rem;
            background: white;
          }
        }
      `}</style>

      <div className="card">
        <h2>Create Your Shop Account</h2>
        <p className="subtitle">Join SokoDirect and grow your business.</p>

        <form onSubmit={handleSubmit} className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location (e.g. Kasarani, Nairobi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <button type="submit">Register Shop</button>
        </form>

        <p className="footer-text">
          Already have an account? 
          <Link href="/login" className="login-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}