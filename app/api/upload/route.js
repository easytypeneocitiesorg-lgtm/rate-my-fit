import { put } from "@vercel/blob";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");

  if (!file) return new Response("No file", { status: 400 });

  const blob = await put(`fit-${Date.now()}.png`, file, {
    access: "public",
    token: process.env.VERCEL_BLOB_TOKEN_READ_WRITE_TOKEN  // <- use your env variable
  });

  return Response.json({ url: blob.url });
}
