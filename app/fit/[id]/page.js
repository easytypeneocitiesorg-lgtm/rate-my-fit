import { kv } from "@vercel/kv";

export default async function FitPage({ params }) {
  const { id } = params;
  let url = "";

  // Try fetching from KV, fallback to placeholder
  try {
    const data = await kv.get(id);
    if (data?.url) url = data.url;
  } catch {
    console.warn("KV not configured, using placeholder");
  }

  // If no URL, show a placeholder
  if (!url) url = "https://via.placeholder.com/300";

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
