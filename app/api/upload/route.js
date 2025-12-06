import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");

  const blob = await put(`fit-${Date.now()}.png`, file, { access: "public" });

  const id = crypto.randomUUID();
  await kv.set(id, { url: blob.url });

  return Response.json({ id });
}
