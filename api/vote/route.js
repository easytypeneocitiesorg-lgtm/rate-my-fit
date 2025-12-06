import { kv } from "@vercel/kv";

export async function POST(req) {
  const body = await req.json();
  const { id, score } = body;

  const data = await kv.get(id);
  if (!data) return new Response("Not found", { status: 404 });

  const votes = data.votes || [];
  votes.push(score);

  await kv.set(id, { ...data, votes });

  return Response.json({ ok: true });
}
