import { Reveal } from "./Reveal";

const STEPS = [
  {
    number: "1",
    title: "Solicite orçamento",
    description: "Informe destino, data e quantidade de passageiros.",
  },
  {
    number: "2",
    title: "Receba a proposta",
    description: "Montamos a melhor solução de veículo e roteiro para o seu grupo.",
  },
  {
    number: "3",
    title: "Confirme sua reserva",
    description: "Nossa equipe acompanha todo o processo até o dia da viagem.",
  },
  {
    number: "4",
    title: "Aproveite sua viagem",
    description: "Segurança e conforto garantidos do início ao fim.",
  },
];

export function Process() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Como funciona
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Do orçamento à viagem, em 4 passos simples
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-semibold text-amber-400">
                {step.number}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/80">
                {step.description}
              </p>
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-6 hidden h-px w-full -translate-y-1/2 translate-x-1/2 bg-navy-900/10 lg:block" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
