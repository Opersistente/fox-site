import type { Metadata } from "next";
import { Users, Presentation, Store, UsersRound, PartyPopper, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { buildWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transporte Corporativo",
  description:
    "Transporte corporativo em Blumenau para convenções, congressos, feiras e equipes. Frota própria, motoristas experientes e propostas sob medida para empresas.",
  alternates: { canonical: "/empresas" },
};

const USE_CASES = [
  { icon: Presentation, title: "Convenções", description: "Transporte de participantes entre hotel, aeroporto e local do evento." },
  { icon: Users, title: "Congressos", description: "Logística para grandes públicos, com múltiplos veículos e horários coordenados." },
  { icon: Store, title: "Feiras", description: "Traslados pontuais para equipes e clientes durante feiras e exposições." },
  { icon: UsersRound, title: "Transporte de equipes", description: "Rotas recorrentes para levar sua equipe ao trabalho ou a visitas técnicas." },
  { icon: PartyPopper, title: "Eventos internos", description: "Confraternizações, treinamentos e eventos fora da empresa, sem dor de cabeça com logística." },
];

const WHY_FOX = [
  "Frota própria — sem depender de terceiros na hora que mais importa",
  "Motoristas experientes e veículos regulamentados pelos órgãos de transporte",
  "Atendimento dedicado, com um único ponto de contato para toda a operação",
  "Quase 30 anos atendendo empresas em Blumenau e região",
];

export default function EmpresasPage() {
  const whatsappHref = buildWhatsAppUrl(
    "Olá! Gostaria de solicitar uma proposta de transporte corporativo para minha empresa."
  );

  return (
    <>
      <PageHeader
        eyebrow="Soluções para empresas"
        title="Transporte corporativo com a logística que sua empresa precisa"
        description="Convenções, congressos, feiras, transporte de equipes e eventos internos — sua empresa foca no evento, a Fox cuida do trajeto."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-navy-900/10 bg-sand-50 p-7 transition-all hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl hover:shadow-navy-900/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="h-4 w-4" /> Por que empresas escolhem a Fox
          </p>
          <ul className="mx-auto mt-8 max-w-2xl space-y-4 text-left">
            {WHY_FOX.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/85">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.03] hover:bg-amber-400"
          >
            Solicitar proposta corporativa
          </a>
        </div>
      </section>
    </>
  );
}
