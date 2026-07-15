export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
          isLight ? "bg-amber-400 text-navy-950" : "bg-navy-900 text-amber-400"
        }`}
      >
        F
      </span>
      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          isLight ? "text-white" : "text-navy-900"
        }`}
      >
        Fox <span className="text-amber-500">Viagens</span>
      </span>
    </span>
  );
}
