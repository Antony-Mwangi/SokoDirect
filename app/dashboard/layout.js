"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  BadgeDollarSign, 
  BarChart3, 
  CreditCard, 
  Menu,
  ChevronLeft,
  LogOut 
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const sidebarWidth = isCollapsed ? "70px" : "250px";

  return (
    <div style={styles.bodyContainer}>
      {/* SIDEBAR - Styled as a floating professional card or standard column */}
      <aside style={{ 
        ...styles.sidebar, 
        width: isMobile ? (isCollapsed ? "0px" : "100%") : sidebarWidth,
        position: isMobile ? "fixed" : "relative",
        visibility: isMobile && isCollapsed ? "hidden" : "visible",
        zIndex: 100
      }}>
        <nav style={styles.nav}>
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" collapsed={isCollapsed} />
          <NavItem href="/dashboard/products" icon={<Package size={20} />} label="Products" collapsed={isCollapsed} />
          <NavItem href="/dashboard/sales" icon={<BadgeDollarSign size={20} />} label="Sales" collapsed={isCollapsed} />
          <NavItem href="/dashboard/analytics" icon={<BarChart3 size={20} />} label="Analytics" collapsed={isCollapsed} />
          <NavItem href="/dashboard/credit" icon={<CreditCard size={20} />} label="Credit Score" collapsed={isCollapsed} />
        </nav>

        <div style={styles.sidebarFooter}>
           <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.collapseBtn}>
              {isCollapsed ? <Menu size={20} /> : <div style={styles.flexCenter}><ChevronLeft size={20}/> Minimize</div>}
           </button>
           <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} style={styles.logoutBtn}>
              <LogOut size={20} />
              {!isCollapsed && <span style={{ marginLeft: "10px" }}>Logout</span>}
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={styles.main}>
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, collapsed }) {
  return (
    <Link href={href} style={styles.link}>
      <span style={styles.iconWrapper}>{icon}</span>
      {!collapsed && <span style={styles.linkText}>{label}</span>}
    </Link>
  );
}

const styles = {
  bodyContainer: {
    display: "flex",
    // This assumes your header/footer are outside. 
    // If they have fixed heights, you can adjust minHeight accordingly.
    minHeight: "calc(100vh - 140px)", 
    backgroundColor: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
  },
  sidebar: {
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "20px 12px",
    transition: "width 0.3s ease, transform 0.3s ease",
    // Ensures sidebar doesn't grow taller than the viewport minus your existing bars
    height: "auto", 
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0, // Prevents flex items from overflowing
  },
  content: {
    padding: "30px",
    flex: 1,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1,
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "#64748b",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
  },
  linkText: {
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "12px",
    whiteSpace: "nowrap",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24px",
  },
  sidebarFooter: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingTop: "20px",
    borderTop: "1px solid #f1f5f9",
  },
  collapseBtn: {
    background: "#f1f5f9",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    backgroundColor: "#fff1f2",
    border: "none",
    color: "#e11d48",
    cursor: "pointer",
    borderRadius: "10px",
    fontWeight: "600",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }
};