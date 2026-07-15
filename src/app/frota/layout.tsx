import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossa Frota",
  description:
    "Conheça a frota própria da Fox Viagens e Turismo: ônibus executivo, micro-ônibus e veículos acessíveis para fretamento, excursões, turismo escolar e transporte corporativo em Blumenau.",
  alternates: { canonical: "/frota" },
};

export default function FrotaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
