import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isEmail(v: string) {
    return /.+@.+\..+/.test(v);
}

export async function POST(req: Request) {
    try {
        const MAX_LEN = 4000;
        const body = await req.json().catch(() => ({}));
        const { firstName = "", lastName="", section="", email = "", motivation = "", message = "", website = "" } = body as Record<string, string>;

        // Honeypot (bots fill hidden field "website")
        if (website) return NextResponse.json({ ok: true }, { status: 200 });

        if (!firstName || !lastName || !section || !email || (!motivation && !message)) {
            return NextResponse.json({ ok: false, error: "Champs obligatoires manquants." }, { status: 400 });
        }
        if (!isEmail(email)) {
            return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 422 });
        }

        const text = [
            `Nom: ${lastName}`,
            `Prénom: ${firstName}`,
            `Classe: ${section}`,
            `Email: ${email}`,
            motivation ? `Motivation: ${motivation}` : null,
            message ? `Message: ${message}` : null,
            `User-Agent: ${req.headers.get("user-agent") ?? "n/a"}`,
        ]
            .filter(Boolean)
            .join("\n\n");

        if (text.length > MAX_LEN) {
            return NextResponse.json({ ok: false, error: "Message trop long." }, { status: 413 });
        }

        // SMTP transport from env
        const host = process.env.SMTP_HOST as string | undefined;
        const port = Number(process.env.SMTP_PORT || 587);
        const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true"; // true for 465
        const user = process.env.SMTP_USER as string | undefined;
        const pass = process.env.SMTP_PASS as string | undefined;
        const to = process.env.CONTACT_TO || user || "";
        const from = process.env.CONTACT_FROM || user || "no-reply@example.com";

        if (!host || !user || !pass || !to) {
            console.error("Missing SMTP env vars");
            return NextResponse.json({ ok: false, error: "Configuration SMTP incomplète." }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

        const subject = `Pré‑inscription — ${firstName} ${lastName} (${section})`;
        const html = `
      <h2>Pré‑inscription — Silicon Valley Study Trip</h2>
      <p><strong>Nom:</strong> ${escapeHtml(lastName)}</p>
      <p><strong>Prénom:</strong> ${escapeHtml(firstName)}</p>
      <p><strong>Classe:</strong> ${escapeHtml(section)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${motivation ? `<p><strong>Motivation:</strong><br/>${escapeHtml(motivation).replace(/\n/g, "<br/>")}</p>` : ""}
        ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n\r/g, "<br/>")}</p>` : ""}
        <hr/>
        <p style="color:#999">Envoyé depuis le site St Jo Silicon Valley — ${new Date().toISOString()}</p>
        `;

    await transporter.sendMail({ from, to, subject, text, html, replyTo: email });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}