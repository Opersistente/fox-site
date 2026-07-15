import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de Passageiros",
  description:
    "Monte a lista de passageiros da sua excursão ou viagem em grupo: adicione, edite e valide CPFs, exporte em CSV ou PDF e compartilhe direto pelo WhatsApp.",
  alternates: { canonical: "/lista-passageiros" },
};

export default function ListaPassageirosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
