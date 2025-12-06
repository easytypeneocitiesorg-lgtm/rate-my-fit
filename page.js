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
    <div>
      <h1>Upload your fit</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={upload}>Upload</button>

      {url && (
        <div>
          <p>Share this link:</p>
          <a href={url}>{url}</a>
        </div>
      )}
    </div>
  );
}
