"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Brand Section */}
        <div style={styles.brandSection}>
          <p style={styles.brandName}>SokoDirect</p>
          <p style={styles.tagline}>
            Empowering small businesses by turning everyday sales records
            into financial growth.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <p style={styles.heading}>Platform</p>
          <ul style={styles.links}>
            <li><Link href="/login" style={styles.link}>Login</Link></li>
            <li><Link href="/register" style={styles.link}>Register</Link></li>
            <li><Link href="/dashboard" style={styles.link}>Dashboard</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <p style={styles.heading}>Legal</p>
          <ul style={styles.links}>
            <li><Link href="#" style={styles.link}>Privacy Policy</Link></li>
            <li><Link href="#" style={styles.link}>Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div style={styles.copyright}>
        © {new Date().getFullYear()} SokoDirect. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#ffffff",
    color: "#6b7280",
    padding: "60px 24px 30px",
    borderTop: "1px solid #e5e7eb",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "40px",
  },
  brandSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  brandName: {
    color: "#2563eb",
    fontWeight: "800",
    fontSize: "1.25rem",
    margin: 0,
    letterSpacing: "-0.025em",
  },
  tagline: {
    fontSize: "0.95rem",
    lineHeight: "1.5",
    maxWidth: "300px",
  },
  heading: {
    color: "#111827",
    fontWeight: "700",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "16px",
  },
  links: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#6b7280",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  copyright: {
    maxWidth: "1200px",
    margin: "40px auto 0",
    paddingTop: "24px",
    borderTop: "1px solid #f3f4f6",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#9ca3af",
  },
};