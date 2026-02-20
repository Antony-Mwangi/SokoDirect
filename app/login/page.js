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
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="page-wrapper">
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #f3f4f6;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
          max-width: 400px;
        }

        h2 {
          color: #111827;
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-align: center;
          letter-spacing: -0.025em;
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
          transition: all 0.2s ease;
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

        .register-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
        }

        .register-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .card {
            padding: 1.5rem;
            box-shadow: none;
            background: transparent;
          }
          body {
            background-color: white;
          }
        }
      `}</style>

      <div className="card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to manage your SokoDirect shop.</p>

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

          <button type="submit">Login</button>
        </form>

        <p className="footer-text">
          Don't have an account? 
          <Link href="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}