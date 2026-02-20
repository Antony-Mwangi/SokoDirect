import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>SokoDirect</h1>
      <p>Turn your daily sales into credit power.</p>

      <div style={{ marginTop: "20px" }}>
        <Link href="/register">
          <button style={{ marginRight: "10px" }}>Register</button>
        </Link>

        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}