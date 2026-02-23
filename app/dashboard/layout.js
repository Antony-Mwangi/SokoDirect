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
  LogOut,
  Bell,
  UserCircle
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
    <div style={styles.appWrapper}>
      {/* 1. HEADER - Static and Full Width */}
      <header style={styles.topBar}>
        <div style={styles.headerLeft}>
          <h2 style={styles.logoText}>Soko<span style={styles.logoHighlight}>Direct</span></h2>
        </div>
        
        <div style={styles.headerRight}>
          <button style={styles.iconBtn}><Bell size={20} /></button>
          <div style={styles.userProfile}>
            <UserCircle size={24} />
            {!isMobile && <span style={styles.userName}>Admin</span>}
          </div>
        </div>
      </header>

      {/* 2. BODY AREA - Flex Row */}
      <div style={styles.bodyContainer}>
        
        {/* SIDEBAR - Stays inside bodyContainer */}
        <aside style={{ 
          ...styles.sidebar, 
          width: isMobile ? (isCollapsed ? "0px" : "100%") : sidebarWidth,
          overflow: isMobile && isCollapsed ? "hidden" : "visible",
          position: isMobile ? "absolute" : "relative", // Overlays only on mobile
          zIndex: 50
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

        {/* 3. MAIN CONTENT */}
        <main style={styles.main}>
          <div style={styles.content}>
            {children}
          </div>
          
          {/* FOOTER - Stays at bottom of content, never covered by sidebar */}
          <footer style={styles.footer}>
            © 2024 SokoDirect Dashboard v1.0
          </footer>
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
  appWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden", // Prevents double scrollbars
    backgroundColor: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
  },
  topBar: {
    height: "70px",
    minHeight: "70px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 100,
  },
  bodyContainer: {
    display: "flex",
    flex: 1, // Takes remaining vertical space
    overflow: "hidden",
    position: "relative",
  },
  sidebar: {
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "20px 12px",
    transition: "width 0.3s ease",
    height: "100%",
  },
  main: {
    flex: 1,
    overflowY: "auto", // Content scrolls independently
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: "30px",
    flex: 1,
  },
  footer: {
    padding: "20px 30px",
    borderTop: "1px solid #e2e8f0",
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  // Sub-styles
  logoText: { fontSize: "22px", fontWeight: "800", color: "#1e293b", margin: 0 },
  logoHighlight: { color: "#6366f1" },
  headerRight: { display: "flex", alignItems: "center", gap: "15px" },
  userProfile: { display: "flex", alignItems: "center", gap: "10px", padding: "5px 12px", borderRadius: "8px", backgroundColor: "#f1f5f9" },
  userName: { fontSize: "14px", fontWeight: "600", color: "#475569" },
  nav: { display: "flex", flexDirection: "column", gap: "5px", flexGrow: 1 },
  link: { display: "flex", alignItems: "center", color: "#64748b", textDecoration: "none", padding: "12px", borderRadius: "10px" },
  linkText: { fontSize: "14px", fontWeight: "500", marginLeft: "12px" },
  iconWrapper: { display: "flex", minWidth: "24px" },
  sidebarFooter: { marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingTop: "20px" },
  collapseBtn: { background: "#f1f5f9", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", color: "#64748b" },
  logoutBtn: { display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", backgroundColor: "#fff1f2", border: "none", color: "#e11d48", cursor: "pointer", borderRadius: "10px", fontWeight: "600" },
  flexCenter: { display: "flex", alignItems: "center", gap: "8px" },
  iconBtn: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }
};