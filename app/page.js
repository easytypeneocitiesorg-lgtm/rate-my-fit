"use client";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  async function upload() {
    const form = new FormData();
    form.append("file", image);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    setUrl(`${window.location.origin}/fit/${data.id}`);
  }

  return (
    <div className="wrap">
      <style>{`
        body {
          background: #ffeaf5;
          font-family: sans-serif;
        }
        .wrap {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
        }
        h1 {
          color: #ff7fbf;
          margin-bottom: 20px;
        }
        input {
          margin: 20px 0;
        }
        button {
          background: #ff99cc;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
          font-size: 16px;
        }
        button:hover {
          background: #ff7fba;
        }
        a {
          color: #d948a0;
          word-break: break-all;
        }
      `}</style>

      <h1>Upload your fit</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={upload}>Upload</button>

      {url && (
        <div style={{ marginTop: "20px" }}>
          <p>Share this link:</p>
          <a href={url}>{url}</a>
        </div>
      )}
    </div>
  );
}
