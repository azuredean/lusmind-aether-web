import { Link } from "react-router-dom";

const NotFound = () => (
  <main
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      padding: "2rem",
      textAlign: "center",
      background: "#0b0b0d",
      color: "#f4f4f5",
      fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
    }}
  >
    <p style={{ letterSpacing: "0.3em", fontSize: "0.75rem", opacity: 0.6 }}>
      LUSMIND
    </p>
    <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Page not found</h1>
    <p style={{ opacity: 0.7, maxWidth: "42ch" }}>
      The page you requested is not part of the Lusmind B2B platform.
    </p>
    <Link
      to="/"
      style={{
        marginTop: "0.5rem",
        padding: "0.85rem 1.6rem",
        borderRadius: "999px",
        background: "#f4f4f5",
        color: "#0b0b0d",
        textDecoration: "none",
        fontWeight: 600,
      }}
    >
      Back to homepage
    </Link>
  </main>
);

export default NotFound;
