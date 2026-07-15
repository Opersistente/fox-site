import { Reveal } from "./Reveal";

const VALUES = [
  "Segurança em primeiro lugar",
  "Excelência no atendimento",
  "Pontualidade e responsabilidade",
  "Respeito às pessoas e ao meio ambiente",
];

export function About() {
  return (
    <section id="quem-somos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
              Quem somos
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Uma história de quase 30 anos em Blumenau
            </h2>
            <p className="mt-5 leading-relaxed text-navy-700/85">
              A Fox Viagens e Turismo nasceu em 1996, em Blumenau (SC), de um
              sonho familiar. Desde o início, o propósito sempre foi levar
              pessoas com segurança, conforto e respeito.
            </p>
            <p className="mt-4 leading-relaxed text-navy-700/85">
              Com o tempo, a Fox cresceu, modernizou sua frota e ampliou os
              destinos, mas manteve seus valores: atendimento humano,
              pontualidade e cuidado em cada viagem — do fretamento escolar ao
              transporte corporativo.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-sand-50 p-4">
                <p className="font-display text-xl font-semibold text-navy-900">Missão</p>
                <p className="mt-1 text-sm text-navy-700/80">
                  Proporcionar experiências de viagem seguras, confortáveis e
                  memoráveis, conectando pessoas a novos destinos.
                </p>
              </div>
              <div className="rounded-xl bg-sand-50 p-4">
                <p className="font-display text-xl font-semibold text-navy-900">Visão</p>
                <p className="mt-1 text-sm text-navy-700/80">
                  Ser referência em transporte rodoviário de passageiros e
                  turismo, reconhecida pela qualidade e segurança.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-navy-900 p-8 sm:p-10">
              <p className="font-display text-lg font-semibold text-white">
                Nossos valores
              </p>
              <ul className="mt-5 space-y-4">
                {VALUES.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10.5l3.5 3.5L16 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-white/85">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
