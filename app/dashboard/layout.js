"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h2 style={styles.logoText}>Soko<span style={styles.logoHighlight}>Direct</span></h2>
        </div>

        <nav style={styles.nav}>
          <Link href="/dashboard" style={styles.link}>Overview</Link>
          <Link href="/dashboard/sales" style={styles.link}>Sales</Link>
          <Link href="/dashboard/analytics" style={styles.link}>Analytics</Link>
          <Link href="/dashboard/credit" style={styles.link}>Credit Score</Link>
        </nav>
        
       
      </aside>

      <main style={styles.main}>
        <header style={styles.topBar}>
          <span style={styles.breadcrumb}>Dashboard </span>
        </header>
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#121212", 
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#1A1A1A", 
    color: "#EAEAEA",
    padding: "40px 24px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #332B24", 
  },
  logoContainer: {
    marginBottom: "50px",
    paddingLeft: "10px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "#FFFFFF",
    margin: 0,
  },
  logoHighlight: {
    color: "#D4AF37", 
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  },
  link: {
    color: "#A39382", 
    textDecoration: "none",
    fontWeight: "500",
    padding: "12px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    fontSize: "15px",
   
    borderLeft: "3px solid transparent",
  },
 
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FDFCFB", 
  },
  topBar: {
    height: "70px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    padding: "0 40px",
    borderBottom: "1px solid #EDE9E6",
  },
  breadcrumb: {
    fontSize: "14px",
    color: "#5C4033", 
    fontWeight: "500",
  },
  content: {
    padding: "40px",
    flex: 1,
  },
  footerNote: {
    fontSize: "12px",
    color: "#5C4033",
    opacity: 0.6,
    paddingTop: "20px",
  }
};