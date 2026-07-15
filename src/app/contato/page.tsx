import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Fox Agência de Viagens e Turismo em Blumenau. Solicite seu orçamento de fretamento de ônibus, excursões, turismo escolar ou transporte corporativo.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fale com a gente"
        title="Vamos planejar sua próxima viagem"
        description="Preencha o formulário ou fale direto pelo WhatsApp. Nossa equipe responde rápido com uma proposta sob medida para o seu grupo."
      />
      <ContactSection />
    </>
  );
}
