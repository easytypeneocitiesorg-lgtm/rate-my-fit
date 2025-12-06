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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Rate this Fit</h1>
      <img src={url} alt="Fit" style={{ maxWidth: "100%" }} />
      <p>Share this link to get ratings!</p>
    </div>
  );
}
