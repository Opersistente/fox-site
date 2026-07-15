import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Excursões, turismo escolar, transporte corporativo, eventos, traslados e fretamento de ônibus em Blumenau e todo o Brasil. Conheça os serviços da Fox Viagens e Turismo.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
