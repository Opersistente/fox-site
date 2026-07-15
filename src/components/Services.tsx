import { Reveal } from "./Reveal";

const SERVICES = [
  {
    title: "Excursões Turísticas",
    description: "Passeios nacionais e regionais com roteiros pensados para grupos.",
    icon: (
      <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
    ),
  },
  {
    title: "Viagens Corporativas",
    description: "Transporte executivo para equipes, diretoria e eventos de empresas.",
    icon: (
      <path d="M4 21V7a1 1 0 011-1h5V4a1 1 0 011-1h2a1 1 0 011 1v2h5a1 1 0 011 1v14M9 21v-4h6v4M4 21h16M9 9h.01M9 13h.01M15 9h.01M15 13h.01" />
    ),
  },
  {
    title: "Turismo Escolar",
    description: "Segurança e acompanhamento dedicado para instituições de ensino.",
    icon: (
      <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3zM7 10.2V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-5.8" />
    ),
  },
  {
    title: "Eventos e Congressos",
    description: "Logística completa de transporte para participantes e convidados.",
    icon: (
      <path d="M4 4h16v4H4V4zm0 8h16M4 12v8h16v-8M9 16h6" />
    ),
  },
  {
    title: "Traslados",
    description: "Aeroportos, hotéis e eventos com pontualidade e conforto.",
    icon: (
      <path d="M5 17h14M6 17v-5l2-5h8l2 5v5M9 10h6M8 21h.01M16 21h.01" />
    ),
  },
  {
    title: "Fretamento",
    description: "Viagens exclusivas para grupos, com roteiro e horários sob medida.",
    icon: (
      <path d="M3 16V9a2 2 0 012-2h11l4 4v5a2 2 0 01-2 2H5a2 2 0 01-2-2zM7 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
    ),
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            O que fazemos
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Soluções completas para cada tipo de viagem
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-navy-900/10 bg-sand-50 p-7 transition-all hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl hover:shadow-navy-900/5">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-navy-950">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
