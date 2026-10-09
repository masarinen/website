import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * Tar emot förfrågningar från kontaktformuläret och skickar dem som e-post
 * via Resend. Nycklar läses endast här på servern.
 *
 * Kräver miljövariablerna RESEND_API_KEY, CONTACT_TO_EMAIL och
 * CONTACT_FROM_EMAIL (se .env.example). Saknas de svarar endpointen 503 och
 * formuläret erbjuder besökaren att skicka via sitt eget e-postprogram.
 */

function config() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  return apiKey && to && from ? { apiKey, to, from } : null;
}

// Enkel begränsning per IP (bäst-effort, per serverinstans).
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function GET() {
  return NextResponse.json({ enabled: config() !== null });
}

export async function POST(request: Request) {
  const settings = config();
  if (!settings) {
    return NextResponse.json(
      { error: "not_configured", message: "Kontaktformuläret är inte aktiverat." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "Ogiltig förfrågan." }, { status: 400 });
  }

  // Honungsfälla för robotar – låtsas inte att något skickats, svara neutralt.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ error: "rejected", message: "Meddelandet kunde inte skickas." }, { status: 400 });
  }

  const input: ContactInput = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    subject: String(body.subject ?? ""),
    message: String(body.message ?? ""),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "För många meddelanden på kort tid. Försök igen om en stund." },
      { status: 429 },
    );
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${settings.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: settings.from,
        to: [settings.to],
        reply_to: email,
        subject: `Webbförfrågan: ${input.subject} – ${name}`,
        text: `Namn: ${name}\nE-post: ${email}\nÄmne: ${input.subject}\n\n${message}`,
        html: `<p><strong>Namn:</strong> ${escapeHtml(name)}<br><strong>E-post:</strong> ${escapeHtml(
          email,
        )}<br><strong>Ämne:</strong> ${escapeHtml(input.subject)}</p><p>${escapeHtml(message).replace(
          /\n/g,
          "<br>",
        )}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("Resend svarade med status", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { error: "send_failed", message: "Meddelandet kunde inte skickas just nu." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Kunde inte nå Resend", err);
    return NextResponse.json(
      { error: "send_failed", message: "Meddelandet kunde inte skickas just nu." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
