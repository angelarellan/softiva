import { NextResponse } from "next/server";
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

  // TODO: integrar con un proveedor de email (Resend, SendGrid, etc.) o CRM.
  // Los mensajes deben enviarse/notificarse a CONTACT_EMAIL (contacto@softivastudio.com).
  console.log(`Nuevo contacto Softiva Studio (para ${CONTACT_EMAIL}):`, {
    name: body.name,
    email: body.email,
    service: body.service ?? "No especificado",
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
