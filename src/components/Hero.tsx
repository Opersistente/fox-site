"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const WHATSAPP_URL =
  "https://wa.me/554799560826?text=Ol%C3%A1!%20Quero%20solicitar%20um%20or%C3%A7amento%20de%20viagem.";

const TRUST_ITEMS = [
  "Desde 1996",
  "Frota própria",
  "Motoristas experientes",
  "Seguro para passageiros",
  "Atendimento personalizado",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Efeito parallax: a imagem se move mais devagar que o scroll enquanto o
  // usuário rola pelo hero, criando sensação de profundidade.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 140]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-20 -bottom-20">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          src="/videos/hero.mp4"
          poster="/images/frota/executivo-46-01.jpg"
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="max-w-2xl">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur">
            Há quase 30 anos em Blumenau e toda a região
          </p>
          <h1
            className="animate-fade-up font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.05s" }}
          >
            Sua viagem começa com segurança, conforto e tranquilidade.
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/80"
            style={{ animationDelay: "0.1s" }}
          >
            Transportamos pessoas com excelência em excursões, eventos, viagens
            corporativas, turismo escolar e grupos em todo o Brasil.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.15s" }}
          >
            <a
              href="/contato"
              className="rounded-full bg-amber-500 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.03] hover:bg-amber-400"
            >
              Solicitar Orçamento
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Falar no WhatsApp
            </a>
          </div>

          <ul
            className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85"
            style={{ animationDelay: "0.2s" }}
          >
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0 text-amber-400">
                  <path
                    d="M4 10.5l3.5 3.5L16 5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
