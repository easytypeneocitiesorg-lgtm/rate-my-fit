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
      if (!data.id) throw new Error("No ID returned");

      setUrl(`${window.location.origin}/fit/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed, check console");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Rate My Fit</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>
        Upload
      </button>
      {url && (
        <div style={{ marginTop: "1rem" }}>
          Shareable link: <a href={url}>{url}</a>
        </div>
      )}
    </div>
  );
}
