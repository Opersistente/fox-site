import { Reveal } from "./Reveal";

const STATS = [
  { value: "29+", label: "Anos de experiência" },
  { value: "5.000+", label: "Passageiros atendidos" },
  { value: "300+", label: "Destinos percorridos" },
  { value: "100%", label: "Frota própria e segurada" },
];

export function Stats() {
  return (
    <section className="bg-navy-900 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Mais de duas décadas conectando pessoas a experiências inesquecíveis
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-3xl font-semibold text-amber-400 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-white/70">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
