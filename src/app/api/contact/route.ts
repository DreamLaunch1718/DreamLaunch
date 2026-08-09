import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/content";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const { name, phone, email, company, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Champs requis manquants." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY absente — message reçu (mode dev):", body);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Dream&Launch <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: [
        `Nom: ${name}`,
        phone ? `Téléphone: ${phone}` : null,
        `Email: ${email}`,
        company ? `Société: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Échec envoi Resend:", err);
    return NextResponse.json(
      { error: "Échec de l'envoi du message." },
      { status: 502 }
    );
  }
}
