import { NextResponse } from "next/server";

// Este endpoint envia o formulário de contato por e-mail usando a Resend
// (https://resend.com). É necessário configurar duas variáveis de ambiente
// em um arquivo `.env.local` (veja `.env.local.example`):
//
//   RESEND_API_KEY=coloque_sua_chave_aqui
//   CONTACT_TO_EMAIL=foxagenciador@gmail.com
//
// Passo a passo rápido:
// 1. Crie uma conta gratuita em https://resend.com
// 2. Gere uma API Key em Dashboard > API Keys
// 3. Verifique o domínio foxagencia.com.br em Dashboard > Domains (adiciona
//    alguns registros DNS) para poder enviar como "contato@foxagencia.com.br".
//    Sem domínio verificado, a Resend só permite enviar para o e-mail da
//    conta cadastrada — ótimo para testar, mas limitado para produção.

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Preencha nome, e-mail e mensagem." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "foxagenciador@gmail.com";

  if (!apiKey) {
    console.error(
      "RESEND_API_KEY não configurada. Veja instruções em src/app/api/contact/route.ts"
    );
    return NextResponse.json(
      {
        error:
          "Envio de e-mail ainda não configurado neste servidor. Fale pelo WhatsApp enquanto isso.",
      },
      { status: 500 }
    );
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Site Fox Viagens <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `Novo contato pelo site — ${name}`,
        html: `
          <h2>Nova mensagem do site Fox Viagens</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefone:</strong> ${escapeHtml(phone || "não informado")}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Erro da Resend:", errorBody);
      return NextResponse.json(
        { error: "Falha ao enviar e-mail. Tente novamente em instantes." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail de contato:", err);
    return NextResponse.json(
      { error: "Falha ao enviar e-mail. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
