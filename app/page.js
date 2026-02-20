"use client"; // This must be the very first line

import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <style jsx global>{`
        /* Reset & Base Styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #f9fafb;
          color: #111827;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
        }

        h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #2563eb; 
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        p {
          font-size: 1.25rem;
          color: #4b5563;
          max-width: 600px;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .button-group {
          display: flex;
          gap: 15px;
          width: 100%;
          justify-content: center;
        }

        button {
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          width: 140px;
        }

        .btn-primary {
          background-color: #2563eb;
          color: white;
        }

        .btn-primary:hover {
          background-color: #1d4ed8;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background-color: white;
          color: #2563eb;
          border: 2px solid #2563eb;
        }

        .btn-secondary:hover {
          background-color: #eff6ff;
        }

        /* Responsive Breakpoints */
        @media (max-width: 640px) {
          h1 {
            font-size: 2.25rem;
          }
          
          .button-group {
            flex-direction: column;
            align-items: center;
          }

          button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      <main>
        <h1>SokoDirect</h1>
        <p>Turn your daily sales into credit power. Empower your business with smart financial tools.</p>

        <div className="button-group">
          <Link href="/register">
            <button className="btn-primary">Register</button>
          </Link>

          <Link href="/login">
            <button className="btn-secondary">Login</button>
          </Link>
        </div>
      </main>
    </div>
  );
}