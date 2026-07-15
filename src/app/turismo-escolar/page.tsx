import type { Metadata } from "next";
import { ShieldCheck, GraduationCap, FileCheck2, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ShinyLink } from "@/components/ui/shiny-button";
import { buildWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Turismo Escolar",
  description:
    "Turismo escolar em Blumenau com segurança, seguro para passageiros e motoristas treinados. Viagens de estudo, formaturas e excursões pedagógicas para escolas e universidades.",
  alternates: { canonical: "/turismo-escolar" },
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    description:
      "Veículos regulamentados pelos órgãos de transporte e revisados periodicamente, para que pais e coordenadores viajem tranquilos.",
  },
  {
    icon: FileCheck2,
    title: "Seguro para passageiros",
    description:
      "Toda viagem escolar sai com cobertura de seguro para os passageiros, do embarque ao desembarque.",
  },
  {
    icon: GraduationCap,
    title: "Motoristas treinados",
    description:
      "Profissionais experientes e preparados para viagens com estudantes, com atenção redobrada durante todo o trajeto.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento dedicado",
    description:
      "Um ponto de contato direto com a coordenação da escola ou universidade, do planejamento até o retorno da viagem.",
  },
];

export default function TurismoEscolarPage() {
  const whatsappHref = buildWhatsAppUrl(
    "Olá! Gostaria de solicitar uma proposta de turismo escolar para minha instituição de ensino."
  );

  return (
    <>
      <PageHeader
        eyebrow="Para escolas e universidades"
        title="Segurança para escolas e universidades"
        description="Viagens de estudo, formaturas e excursões pedagógicas com todo o cuidado que pais, alunos e coordenadores esperam."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex gap-4 rounded-2xl border border-navy-900/10 bg-sand-50 p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-700/80">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-amber-500 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Planejando a próxima viagem da turma?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Fale com nossa equipe e receba uma proposta com o veículo ideal para o número
            de alunos, o roteiro e a data da viagem.
          </p>
          <ShinyLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-navy-950 px-8 py-3.5 shadow-black/20 hover:shadow-black/30"
          >
            Solicitar proposta escolar
          </ShinyLink>
        </div>
      </section>
    </>
  );
}
