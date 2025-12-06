import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");

  if (!file) return new Response("No file uploaded", { status: 400 });

  // Upload to Blob
  const blob = await put(`fit-${Date.now()}.png`, file, {
    access: "public",
    token: process.env.VERCEL_BLOB_TOKEN_READ_WRITE_TOKEN // Must be set in Vercel Env
  });

  // Generate ID
  const id = crypto.randomUUID();

  // Try storing in KV, fallback if not configured
  try {
    await kv.set(id, { url: blob.url });
  } catch (err) {
    console.warn("KV not configured, skipping storage");
  }

  return Response.json({ id, url: blob.url });
}
