// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { 
//   LayoutDashboard, 
//   Package, 
//   BadgeDollarSign, 
//   BarChart3, 
//   CreditCard, 
//   Menu,
//   ChevronLeft,
//   LogOut 
// } from "lucide-react";

// export default function DashboardLayout({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) window.location.href = "/login";

//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const sidebarWidth = isCollapsed ? "70px" : "250px";

//   return (
//     <div style={styles.bodyContainer}>
//       {/* SIDEBAR - Styled as a floating professional card or standard column */}
//       <aside style={{ 
//         ...styles.sidebar, 
//         width: isMobile ? (isCollapsed ? "0px" : "100%") : sidebarWidth,
//         position: isMobile ? "fixed" : "relative",
//         visibility: isMobile && isCollapsed ? "hidden" : "visible",
//         zIndex: 100
//       }}>
//         <nav style={styles.nav}>
//           <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" collapsed={isCollapsed} />
//           <NavItem href="/dashboard/products" icon={<Package size={20} />} label="Products" collapsed={isCollapsed} />
//           <NavItem href="/dashboard/sales" icon={<BadgeDollarSign size={20} />} label="Sales" collapsed={isCollapsed} />
//           <NavItem href="/dashboard/analytics" icon={<BarChart3 size={20} />} label="Analytics" collapsed={isCollapsed} />
//           <NavItem href="/dashboard/credit" icon={<CreditCard size={20} />} label="Credit Score" collapsed={isCollapsed} />
//         </nav>

//         <div style={styles.sidebarFooter}>
//            <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.collapseBtn}>
//               {isCollapsed ? <Menu size={20} /> : <div style={styles.flexCenter}><ChevronLeft size={20}/> Minimize</div>}
//            </button>
//            <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} style={styles.logoutBtn}>
//               <LogOut size={20} />
//               {!isCollapsed && <span style={{ marginLeft: "10px" }}>Logout</span>}
//            </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <main style={styles.main}>
//         <div style={styles.content}>
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

// function NavItem({ href, icon, label, collapsed }) {
//   return (
//     <Link href={href} style={styles.link}>
//       <span style={styles.iconWrapper}>{icon}</span>
//       {!collapsed && <span style={styles.linkText}>{label}</span>}
//     </Link>
//   );
// }

// const styles = {
//   bodyContainer: {
//     display: "flex",
//     // This assumes your header/footer are outside. 
//     // If they have fixed heights, you can adjust minHeight accordingly.
//     minHeight: "calc(100vh - 140px)", 
//     backgroundColor: "#f8fafc",
//     fontFamily: "'Inter', sans-serif",
//     position: "relative",
//   },
//   sidebar: {
//     backgroundColor: "#ffffff",
//     borderRight: "1px solid #e2e8f0",
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px 12px",
//     transition: "width 0.3s ease, transform 0.3s ease",
//     // Ensures sidebar doesn't grow taller than the viewport minus your existing bars
//     height: "auto", 
//   },
//   main: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     minWidth: 0, // Prevents flex items from overflowing
//   },
//   content: {
//     padding: "30px",
//     flex: 1,
//   },
//   nav: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//     flexGrow: 1,
//   },
//   link: {
//     display: "flex",
//     alignItems: "center",
//     color: "#64748b",
//     textDecoration: "none",
//     padding: "12px",
//     borderRadius: "10px",
//     transition: "all 0.2s ease",
//   },
//   linkText: {
//     fontSize: "14px",
//     fontWeight: "500",
//     marginLeft: "12px",
//     whiteSpace: "nowrap",
//   },
//   iconWrapper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: "24px",
//   },
//   sidebarFooter: {
//     marginTop: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     paddingTop: "20px",
//     borderTop: "1px solid #f1f5f9",
//   },
//   collapseBtn: {
//     background: "#f1f5f9",
//     border: "none",
//     padding: "10px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     color: "#64748b",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoutBtn: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "12px",
//     backgroundColor: "#fff1f2",
//     border: "none",
//     color: "#e11d48",
//     cursor: "pointer",
//     borderRadius: "10px",
//     fontWeight: "600",
//   },
//   flexCenter: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   }
// };


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
  X
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  return (
    <>
      <style>{`
        :root {
          --sidebar-width: 250px;
          --sidebar-collapsed: 70px;
          --primary: #2563eb;
          --bg-main: #f8fafc;
          --border: #e2e8f0;
        }

        .layout-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-main);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* Sidebar Styling */
        .sidebar {
          background-color: #ffffff;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease, transform 0.3s ease;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 1000;
        }

        .nav-section {
          flex-grow: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 12px;
          color: #64748b;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-link:hover {
          background: #f1f5f9;
          color: var(--primary);
        }

        .nav-label {
          margin-left: 12px;
          font-size: 14px;
          font-weight: 500;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background: #f1f5f9;
          color: #64748b;
          font-weight: 500;
          gap: 8px;
        }

        .logout-btn {
          background: #fff1f2;
          color: #e11d48;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .content-inner {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        /* Mobile Responsive adjustments */
        .mobile-header {
          display: none;
          padding: 15px 20px;
          background: white;
          border-bottom: 1px solid var(--border);
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .mobile-header { display: flex; }
          .sidebar {
            position: fixed;
            left: 0;
            transform: translateX(-100%);
            width: 280px !important;
          }
          .sidebar.mobile-active {
            transform: translateX(0);
          }
          .content-inner { padding: 20px; }
        }
      `}</style>

      <div className="layout-container">
        {/* Mobile Navbar */}
        <header className="mobile-header">
          <span style={{ fontWeight: 800, color: "var(--primary)" }}>BIZ-DASH</span>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="control-btn">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <aside 
          className={`sidebar ${isMobileOpen ? "mobile-active" : ""}`}
          style={{ width: isCollapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)" }}
        >
          <nav className="nav-section">
            <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" collapsed={isCollapsed} />
            <NavItem href="/dashboard/products" icon={<Package size={20} />} label="Products" collapsed={isCollapsed} />
            <NavItem href="/dashboard/sales" icon={<BadgeDollarSign size={20} />} label="Sales" collapsed={isCollapsed} />
            <NavItem href="/dashboard/analytics" icon={<BarChart3 size={20} />} label="Analytics" collapsed={isCollapsed} />
            <NavItem href="/dashboard/credit" icon={<CreditCard size={20} />} label="Credit Score" collapsed={isCollapsed} />
          </nav>

          <div className="sidebar-footer">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="control-btn">
              {isCollapsed ? <Menu size={20} /> : <><ChevronLeft size={20} /> Minimize</>}
            </button>
            <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} className="control-btn logout-btn">
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        <main className="main-content">
          <div className="content-inner">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

function NavItem({ href, icon, label, collapsed }) {
  return (
    <Link href={href} className="nav-link">
      <span style={{ minWidth: "24px" }}>{icon}</span>
      {!collapsed && <span className="nav-label">{label}</span>}
    </Link>
  );
}