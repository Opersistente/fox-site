"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const QUESTIONS = [
  {
    q: "Os veículos possuem seguro?",
    a: "Sim. Todos os veículos da nossa frota possuem seguro para passageiros, além de estarem regularizados junto aos órgãos de transporte.",
  },
  {
    q: "Vocês atendem viagens interestaduais?",
    a: "Sim, atendemos viagens regionais, interestaduais e também internacionais, conforme a necessidade do grupo.",
  },
  {
    q: "Os ônibus possuem banheiro?",
    a: "Os modelos Marcopolo G7 e Senior Executivo possuem banheiro a bordo, ideais para viagens mais longas.",
  },
  {
    q: "Como funciona o orçamento?",
    a: "Basta enviar destino, data e número de passageiros pelo formulário ou WhatsApp. Nossa equipe monta a proposta em poucas horas.",
  },
  {
    q: "Qual a capacidade dos veículos?",
    a: "Trabalhamos com veículos de 28 a 46 lugares, para atender desde grupos pequenos até excursões maiores.",
  },
  {
    q: "Vocês atendem empresas e escolas?",
    a: "Sim, temos soluções dedicadas para transporte corporativo e turismo escolar, com atendimento personalizado para cada perfil.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Dúvidas frequentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Perguntas que recebemos com frequência
          </h2>
        </Reveal>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-navy-900/10 bg-white">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-navy-900">{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`shrink-0 text-amber-500 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-navy-700/80">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
