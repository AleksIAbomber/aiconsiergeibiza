import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = (body?.messages ?? []) as Msg[];
    const lang = (body?.lang ?? "es") as string;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    const system =
      lang === "es"
        ? "Eres AIConsierge Ibiza. Responde de forma concisa, útil y práctica. Si falta info clave, haz 1 pregunta y propone 2-3 opciones provisionales."
        : "You are AIConsierge Ibiza. Be concise and practical. If key info is missing, ask 1 question and propose 2-3 provisional options.";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
