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
  X,
  LogOut,
  Bell,
  UserCircle
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div style={styles.container}>
      {/* 1. FULL WIDTH TOP BAR */}
      <header style={styles.topBar}>
        <div style={styles.headerLeft}>
          <button onClick={toggleMobileMenu} style={styles.mobileToggle}>
            <Menu size={24} />
          </button>
          <div style={styles.logoContainer}>
             <h2 style={styles.logoText}>Soko<span style={styles.logoHighlight}>Direct</span></h2>
          </div>
        </div>
        
        <div style={styles.headerRight}>
          <button style={styles.iconBtn}><Bell size={20} /></button>
          <div style={styles.userProfile}>
            <UserCircle size={24} />
            <span style={styles.userName}>Admin</span>
          </div>
        </div>
      </header>

      <div style={styles.lowerLayout}>
        {/* 2. SIDEBAR (Sits under TopBar) */}
        <aside style={{ 
          ...styles.sidebar, 
          width: isCollapsed ? "80px" : "240px",
          transform: isMobileMenuOpen ? "translateX(0)" : (typeof window !== 'undefined' && window.innerWidth < 768 ? "translateX(-100%)" : "none"),
          display: (typeof window !== 'undefined' && window.innerWidth < 768 && !isMobileMenuOpen) ? "none" : "flex"
        }}>
          <nav style={styles.nav}>
            <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" collapsed={isCollapsed} />
            <NavItem href="/dashboard/products" icon={<Package size={20} />} label="Products" collapsed={isCollapsed} />
            <NavItem href="/dashboard/sales" icon={<BadgeDollarSign size={20} />} label="Sales" collapsed={isCollapsed} />
            <NavItem href="/dashboard/analytics" icon={<BarChart3 size={20} />} label="Analytics" collapsed={isCollapsed} />
            <NavItem href="/dashboard/credit" icon={<CreditCard size={20} />} label="Credit Score" collapsed={isCollapsed} />
          </nav>

          <div style={styles.sidebarFooter}>
             <button onClick={toggleSidebar} style={styles.collapseBtn}>
                {isCollapsed ? <Menu size={20} /> : <div style={{display:'flex', alignItems:'center', gap:'10px'}}><X size={20}/> Collapse</div>}
             </button>
             <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} style={styles.logoutBtn}>
                <LogOut size={20} />
                {!isCollapsed && <span style={{ marginLeft: "12px" }}>Logout</span>}
             </button>
          </div>
        </aside>

        {/* 3. MAIN CONTENT AREA */}
        <main style={{ 
          ...styles.main, 
          marginLeft: (typeof window !== 'undefined' && window.innerWidth > 768) ? (isCollapsed ? "80px" : "240px") : "0" 
        }}>
          <div style={styles.content}>
            {children}
          </div>
        </main>
      </div>
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
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f1f5f9",
  },
  topBar: {
    height: "64px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  logoHighlight: {
    color: "#6366f1",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    backgroundColor: "#f8fafc",
    borderRadius: "20px",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "500",
  },
  lowerLayout: {
    display: "flex",
    flex: 1,
    marginTop: "64px", // Matches Header Height
  },
  sidebar: {
    position: "fixed",
    top: "64px",
    bottom: 0,
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "20px 12px",
    transition: "width 0.3s ease, transform 0.3s ease",
    zIndex: 900,
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
    color: "#64748b",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "10px",
    transition: "all 0.2s",
  },
  linkText: {
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "12px",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 1,
    transition: "margin-left 0.3s ease",
    width: "100%",
  },
  content: {
    padding: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  mobileToggle: {
    display: "none", // Hidden by default, show in Media Queries if using CSS
    background: "none",
    border: "none",
    cursor: "pointer",
    "@media (max-width: 768px)": { display: "block" } 
  },
  sidebarFooter: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "16px",
  },
  collapseBtn: {
    background: "#f8fafc",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#64748b",
    fontSize: "13px",
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
  iconBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
  }
};