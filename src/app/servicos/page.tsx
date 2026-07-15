import {
  Compass,
  Briefcase,
  GraduationCap,
  CalendarDays,
  PlaneTakeoff,
  Bus,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { buildWhatsAppUrl } from "@/lib/site";

const SERVICES = [
  {
    id: "excursoes",
    title: "Excursões Turísticas",
    icon: Compass,
    description:
      "Passeios nacionais e regionais com roteiro, hospedagem e trajeto planejados para grupos — de fins de semana no Vale Europeu a viagens de vários dias por todo o Brasil.",
    highlights: [
      "Roteiros sob medida para grupos de qualquer tamanho",
      "Frota própria com poltronas reclináveis",
      "Motoristas experientes em viagens longas",
    ],
  },
  {
    id: "corporativo",
    title: "Transporte Corporativo",
    icon: Briefcase,
    description:
      "Transporte executivo para equipes, diretoria e visitas técnicas, com pontualidade e conforto para o dia a dia da sua empresa.",
    highlights: [
      "Traslados executivos e transporte de equipes",
      "Contratos recorrentes para empresas",
      "Veículos com ar-condicionado e Wi-Fi sob consulta",
    ],
  },
  {
    id: "turismo-escolar",
    title: "Turismo Escolar",
    icon: GraduationCap,
    description:
      "Segurança e acompanhamento dedicado para instituições de ensino, da educação infantil à universidade, em viagens de estudo e formaturas.",
    highlights: [
      "Motoristas treinados para viagens com estudantes",
      "Seguro para todos os passageiros",
      "Atendimento direto com a coordenação escolar",
    ],
  },
  {
    id: "eventos",
    title: "Eventos e Congressos",
    icon: CalendarDays,
    description:
      "Logística completa de transporte para participantes, convidados e equipes em convenções, feiras e congressos.",
    highlights: [
      "Coordenação de horários com a organização do evento",
      "Múltiplos veículos para grandes públicos",
      "Pontos de embarque e desembarque combinados",
    ],
  },
  {
    id: "traslados",
    title: "Traslados",
    icon: PlaneTakeoff,
    description:
      "Traslados de aeroportos, hotéis e eventos com pontualidade — para grupos, executivos ou convidados de peso.",
    highlights: [
      "Acompanhamento de horários de voo",
      "Veículos de diferentes capacidades",
      "Atendimento pontual porta a porta",
    ],
  },
  {
    id: "fretamento",
    title: "Fretamento",
    icon: Bus,
    description:
      "Viagens exclusivas para o seu grupo, com roteiro, horários e paradas sob medida — o veículo é só seu durante todo o trajeto.",
    highlights: [
      "Roteiro e horários definidos por você",
      "Ideal para grupos fechados e famílias",
      "Frota própria, sem intermediação de terceiros",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <PageHeader
        eyebrow="O que fazemos"
        title="Soluções completas para cada tipo de viagem"
        description="De uma excursão de fim de semana a um congresso com centenas de participantes: um serviço pensado para cada necessidade, sempre com a mesma frota própria e o mesmo padrão de segurança."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-6 px-5 sm:px-8">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const whatsappHref = buildWhatsAppUrl(
              `Olá! Gostaria de um orçamento para ${service.title}.`
            );
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid scroll-mt-28 grid-cols-1 gap-8 rounded-2xl border border-navy-900/10 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center ${
                  i % 2 === 0 ? "bg-sand-50" : "bg-white"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-amber-400">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-900">
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-navy-700/80">{service.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-800/90">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-amber-400"
                >
                  Solicitar orçamento
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
