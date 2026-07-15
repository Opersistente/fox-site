export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 sm:pt-40">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-950" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {eyebrow && (
          <p className="animate-fade-up mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-fade-up font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
          style={{ animationDelay: "0.05s" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="animate-fade-up mx-auto mt-5 max-w-2xl text-white/80"
            style={{ animationDelay: "0.1s" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
