"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      if (!data.url) throw new Error("No URL returned");

      // Directly pass the Blob URL as a query param
      setUrl(`${window.location.origin}/fit/${data.id}?url=${encodeURIComponent(data.url)}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed, check console");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#fff0f6",
      color: "#333",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#ff85c0" }}>Rate My Fit</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{
          padding: "0.5rem",
          borderRadius: "8px",
          border: "1px solid #ff85c0",
          backgroundColor: "#ffe6f2",
          marginBottom: "1rem"
        }}
      />
      <button
        onClick={handleUpload}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ff85c0",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "#ff66b3"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#ff85c0"}
      >
        Upload
      </button>
      {url && (
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem",
          borderRadius: "10px",
          backgroundColor: "#ffe6f2",
          wordBreak: "break-all"
        }}>
          Shareable link: <a href={url} style={{ color: "#ff3385", fontWeight: "bold" }}>{url}</a>
        </div>
      )}
    </div>
  );
}
