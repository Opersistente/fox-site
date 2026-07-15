import { Reveal } from "./Reveal";
import { ShinyLink } from "./ui/shiny-button";

const CORPORATE_ITEMS = [
  "Convenções e feiras",
  "Congressos e conferências",
  "Transporte de equipes",
  "Eventos internos e confraternizações",
];

const SCHOOL_ITEMS = [
  "Motoristas treinados e experientes",
  "Veículos regulamentados pelos órgãos de transporte",
  "Seguro para todos os passageiros",
  "Atendimento dedicado às coordenações escolares",
];

function Panel({
  eyebrow,
  title,
  description,
  items,
  ctaLabel,
  ctaHref,
  tone,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  tone: "navy" | "amber";
}) {
  const isAmber = tone === "amber";
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl p-8 sm:p-10 ${
        isAmber ? "bg-gradient-to-br from-amber-500 to-amber-600 text-navy-950" : "bg-navy-900 text-white"
      }`}
    >
      <div>
        <p
          className={`text-sm font-semibold uppercase tracking-wider ${
            isAmber ? "text-navy-950/70" : "text-amber-400"
          }`}
        >
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{title}</h3>
        <p className={`mt-4 leading-relaxed ${isAmber ? "text-navy-950/80" : "text-white/80"}`}>
          {description}
        </p>
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isAmber ? "bg-navy-950/15" : "bg-amber-400/20"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10.5l3.5 3.5L16 5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={isAmber ? "text-navy-950/85" : "text-white/85"}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <ShinyLink
        href={ctaHref}
        className={`mt-8 px-6 py-3 ${isAmber ? "bg-navy-950 shadow-black/20 hover:shadow-black/30" : ""}`}
      >
        {ctaLabel}
      </ShinyLink>
    </div>
  );
}

export function CorporateAndSchool() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <Panel
              eyebrow="Para empresas"
              title="Soluções para empresas"
              description="Logística completa de transporte para que sua empresa foque no evento — a gente cuida do trajeto."
              items={CORPORATE_ITEMS}
              ctaLabel="Ver soluções para empresas"
              ctaHref="/empresas"
              tone="navy"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Panel
              eyebrow="Para escolas e universidades"
              title="Segurança para escolas e universidades"
              description="Excursões e viagens pedagógicas com todo o cuidado que pais e coordenadores esperam."
              items={SCHOOL_ITEMS}
              ctaLabel="Ver turismo escolar"
              ctaHref="/turismo-escolar"
              tone="amber"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
