import { kv } from "@vercel/kv";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const data = await kv.get(id);
  if (!data) return new Response("Not found", { status: 404 });

  return Response.json(data);
}
