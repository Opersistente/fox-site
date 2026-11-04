import Image from "next/image";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Image
      src={variant === "light" ? "/images/fox-logo-clara.png" : "/images/fox-logo-escura.png"}
      alt="Fox Viagens e Turismo"
      width={610}
      height={151}
      priority
      className="h-9 w-auto select-none"
    />
  );
}
