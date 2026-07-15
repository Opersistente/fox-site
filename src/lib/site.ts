export const SITE = {
  name: "Fox Agência de Viagens e Turismo",
  foundingYear: 1996,
  whatsappNumber: "554799560826",
  phoneDisplay: "(47) 99956-0826",
  email: "foxagenciador@gmail.com",
  address: "Rua Butantã, 295, Sala 01 – Velha, Blumenau – SC",
  city: "Blumenau",
  state: "SC",
  url: "https://www.foxagencia.com.br",
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_URL = buildWhatsAppUrl(
  "Olá! Quero solicitar um orçamento de viagem."
);
