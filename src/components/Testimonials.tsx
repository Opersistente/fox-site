// NOTA PARA O CLIENTE: os depoimentos abaixo são exemplos ilustrativos de
// estrutura/tom, usados como placeholder. Assim que a Fox tiver avaliações
// reais do Google ou depoimentos de clientes, substitua os itens de TESTIMONIALS
// por texto, nome e (se possível) foto reais.
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "Atendimento impecável do início ao fim.",
    context: "Excursão em grupo",
  },
  {
    quote: "Ônibus extremamente confortável, viagem longa sem cansaço.",
    context: "Viagem corporativa",
  },
  {
    quote: "Pontualidade e organização excelentes, recomendo para escolas.",
    context: "Turismo escolar",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Prova social
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Quem viaja com a Fox recomenda
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.quote} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7">
                <div className="mb-4 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p className="font-display text-lg italic leading-relaxed text-navy-900">
                  “{item.quote}”
                </p>
                <p className="mt-4 text-sm text-navy-700/70">{item.context}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
