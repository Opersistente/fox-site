import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Preço de Viagem",
  description:
    "Simule o valor estimado da sua viagem de fretamento ou excursão: informe origem, destino e quantidade de passageiros e veja a distância, o veículo sugerido e o valor estimado.",
  alternates: { canonical: "/simulador" },
};

export default function SimuladorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
