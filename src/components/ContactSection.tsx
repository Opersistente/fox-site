"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_INFO = [
  {
    label: "Endereço",
    lines: ["Rua Butantã, 295, Sala 01 – Velha", "Blumenau – SC, CEP 89040-430"],
  },
  {
    label: "Telefones",
    lines: ["(47) 99956-0826", "(47) 3041-7726"],
  },
  {
    label: "E-mail",
    lines: ["foxagenciador@gmail.com"],
  },
  {
    label: "Horário de funcionamento",
    lines: ["Segunda a Sexta: 8h às 18h", "Sábado: 9h às 13h"],
  },
];

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Não foi possível enviar sua mensagem.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  return (
    <section id="contato" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
              <h3 className="font-display text-xl font-semibold">Fox Agência de Viagens</h3>
              <p className="mt-1 text-sm text-white/60">CNPJ: 01.504.603/0001-93</p>
              <p className="mt-3 text-sm text-white/75">
                Desde 1996 conectando destinos com segurança e conforto.
              </p>

              <dl className="mt-8 space-y-6">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 space-y-0.5 text-sm text-white/85">
                      {item.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-800">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-navy-900/15 bg-sand-50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-amber-500"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-800">
                  Telefone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-lg border border-navy-900/15 bg-sand-50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-amber-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-800">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-navy-900/15 bg-sand-50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-amber-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-800">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Destino, data e quantidade de passageiros"
                  className="w-full rounded-lg border border-navy-900/15 bg-sand-50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensagem"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm font-medium text-emerald-600">
                Mensagem enviada! Em breve entraremos em contato.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-medium text-red-600">
                {errorMessage || "Não foi possível enviar. Tente novamente ou fale pelo WhatsApp."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
