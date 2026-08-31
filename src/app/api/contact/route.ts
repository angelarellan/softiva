import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const service =
    typeof body.service === "string" && body.service.trim()
      ? body.service.trim()
      : "No especificado";
  const message = body.message.trim();

  const apiKey = process.env.RESEND_API_KEY;

  // Sin RESEND_API_KEY configurada (ej. en desarrollo local) solo dejamos
  // constancia en el log para no romper el flujo del formulario.
  if (!apiKey) {
    console.log(`Nuevo contacto Softiva Studio (para ${CONTACT_EMAIL}):`, {
      name,
      email,
      service,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Softiva Studio <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto: ${name} — ${service}`,
      text: `Nombre: ${name}\nEmail: ${email}\nServicio de interés: ${service}\n\nMensaje:\n${message}`,
    });

    if (error) {
      console.error("Error de Resend al enviar el contacto:", error);
      return NextResponse.json(
        { ok: false, error: "No se pudo enviar el mensaje." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error inesperado al enviar el contacto:", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
