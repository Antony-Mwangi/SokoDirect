"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        /* Reset */
        .sd-header-wrapper * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .sd-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 5%;
          background: #ffffff;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .sd-logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .sd-brand-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }

        .sd-nav {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .sd-nav-link {
          text-decoration: none;
          color: #444;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .sd-nav-link:hover {
          color: #0066ff;
        }

      

        .sd-btn-logout {
          background: #f8f9fa;
          color: #dc3545;
          border: 1px solid #f1c2c7;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sd-btn-logout:hover {
          background: #ffe6e9;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sd-header {
            flex-direction: column;
            padding: 20px;
            text-align: center;
          }

          .sd-logo-area {
            margin-bottom: 15px;
          }

          .sd-nav {
            gap: 15px;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }

          .sd-nav-link {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <header className="sd-header-wrapper sd-header">
        <Link href="/" className="sd-logo-area">
          <h2 className="sd-brand-title">SokoDirect</h2>
        </Link>

        <nav className="sd-nav">
          {!isLoggedIn ? (
            <>
              <Link href="/" className="sd-nav-link">Home</Link>
              <Link href="/login" className="sd-nav-link">Login</Link>
              <Link href="/register" className="sd-nav-link">Register Shop</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="sd-nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="sd-btn-logout">
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
}