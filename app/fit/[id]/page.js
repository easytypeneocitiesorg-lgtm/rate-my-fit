"use client";
import { useSearchParams } from "next/navigation";

export default function FitPage({ params }) {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "https://via.placeholder.com/300";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#fff0f6",
      color: "#333",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "2rem", color: "#ff85c0", marginBottom: "1rem" }}>Rate this Fit</h1>
      <img
        src={url}
        alt="Fit"
        style={{
          maxWidth: "90%",
          borderRadius: "12px",
          border: "2px solid #ff85c0",
          marginBottom: "1rem"
        }}
      />
      <p style={{ fontSize: "1rem", color: "#ff3385" }}>Share this link to get ratings!</p>
    </div>
  );
}
