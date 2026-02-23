"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  BadgeDollarSign, 
  BarChart3, 
  CreditCard, 
  ChevronLeft, 
  Menu,
  LogOut
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    // Handle responsiveness
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={{ 
        ...styles.sidebar, 
        width: isCollapsed ? "80px" : "260px",
        left: isMobile && isCollapsed ? "-80px" : "0" 
      }}>
        <div style={styles.logoContainer}>
          {!isCollapsed ? (
            <h2 style={styles.logoText}>Soko<span style={styles.logoHighlight}>Direct</span></h2>
          ) : (
            <div style={styles.logoIcon}>S</div>
          )}
        </div>

        <nav style={styles.nav}>
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" collapsed={isCollapsed} />
          <NavItem href="/dashboard/products" icon={<Package size={20} />} label="Products" collapsed={isCollapsed} />
          <NavItem href="/dashboard/sales" icon={<BadgeDollarSign size={20} />} label="Sales" collapsed={isCollapsed} />
          <NavItem href="/dashboard/analytics" icon={<BarChart3 size={20} />} label="Analytics" collapsed={isCollapsed} />
          <NavItem href="/dashboard/credit" icon={<CreditCard size={20} />} label="Credit Score" collapsed={isCollapsed} />
        </nav>

        <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} style={styles.logoutBtn}>
          <LogOut size={20} />
          {!isCollapsed && <span style={{ marginLeft: "12px" }}>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ 
        ...styles.main, 
        marginLeft: isMobile ? "0" : (isCollapsed ? "80px" : "260px") 
      }}>
        <header style={styles.topBar}>
          <button onClick={toggleSidebar} style={styles.toggleBtn}>
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
          <div style={styles.breadcrumb}>
            <span style={{ color: "#94a3b8" }}>Pages</span> / Dashboard
          </div>
        </header>

        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

// Helper component for Nav Items
function NavItem({ href, icon, label, collapsed }) {
  return (
    <Link href={href} style={styles.link} className="nav-item">
      <span style={styles.iconWrapper}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f8fafc", // Very light grey/blue background
  },
  sidebar: {
    position: "fixed",
    height: "100vh",
    backgroundColor: "#0f172a", // Deep Slate Blue/Black
    color: "#f8fafc",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 100,
    boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
  },
  logoContainer: {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    height: "32px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    whiteSpace: "nowrap",
  },
  logoHighlight: {
    color: "#6366f1", // Indigo accent
  },
  logoIcon: {
    background: "#6366f1",
    padding: "4px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flexGrow: 1,
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "#94a3b8",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "8px",
    transition: "all 0.2s",
    fontSize: "14px",
    fontWeight: "500",
  },
  iconWrapper: {
    minWidth: "40px",
    display: "flex",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    transition: "margin 0.3s ease",
  },
  topBar: {
    height: "64px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  toggleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#64748b",
    padding: "8px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    marginRight: "16px",
    backgroundColor: "#f1f5f9",
  },
  breadcrumb: {
    fontSize: "14px",
    color: "#1e293b",
    fontWeight: "600",
  },
  content: {
    padding: "32px",
    flex: 1,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    marginTop: "auto",
    backgroundColor: "transparent",
    border: "none",
    color: "#f87171", // Soft red
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  }
};