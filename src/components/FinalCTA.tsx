import Image from "next/image";
import { Reveal } from "./Reveal";
import { ShinyLink } from "./ui/shiny-button";
import { buildWhatsAppUrl } from "@/lib/site";

const WHATSAPP_URL = buildWhatsAppUrl(
  "Olá! Quero falar com um especialista sobre minha viagem."
);

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
      <Image
        src="/images/frota/senior-28-hero.jpg"
        alt="Frota Fox Viagens"
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />

      <Reveal className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Pronto para sua próxima viagem?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/80">
          Solicite agora seu orçamento e viaje com uma empresa que há quase 30
          anos transporta pessoas com segurança, conforto e confiança.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ShinyLink href="/contato" className="px-7 py-3.5">
            Falar com um especialista
          </ShinyLink>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            Falar no WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
