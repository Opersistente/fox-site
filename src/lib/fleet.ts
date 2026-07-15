export type Vehicle = {
  id: string;
  name: string;
  seats: number;
  seatsLabel: string;
  tagline: string;
  features: string[];
  images: string[];
  seatMap: string;
};

export const FLEET: Vehicle[] = [
  {
    id: "executivo-46",
    name: "Marcopolo Paradiso G7 Executivo",
    seats: 46,
    seatsLabel: "46 lugares + WC",
    tagline: "O carro-chefe para excursões e viagens de longa distância",
    features: [
      "Banheiro a bordo",
      "Poltronas semi-leito reclináveis",
      "Ar-condicionado",
      "Bagageiro amplo",
    ],
    images: [
      "/images/frota/executivo-46-01.jpg",
      "/images/frota/executivo-46-02.jpg",
      "/images/frota/executivo-46-03.jpg",
      "/images/frota/executivo-46-04.jpg",
      "/images/frota/executivo-46-05.jpg",
      "/images/frota/executivo-46-interno-01.jpg",
      "/images/frota/executivo-46-interno-02.jpg",
    ],
    seatMap: "/images/frota/mapa-executivo-46.png",
  },
  {
    id: "w9-elevador-32",
    name: "Volare W9 com Elevador",
    seats: 32,
    seatsLabel: "32 lugares · acessível",
    tagline: "Plataforma elevatória para acessibilidade total",
    features: [
      "Elevador de acessibilidade",
      "Ar-condicionado",
      "Ideal para turismo escolar inclusivo",
      "Bagageiro amplo",
    ],
    images: [
      "/images/frota/w9-elevador-32-01.jpg",
      "/images/frota/w9-elevador-32-02.jpg",
      "/images/frota/w9-elevador-32-interno.jpg",
    ],
    seatMap: "/images/frota/mapa-w9-elevador-32.png",
  },
  {
    id: "senior-28",
    name: "Senior Executivo",
    seats: 28,
    seatsLabel: "28 lugares + WC",
    tagline: "Conforto de rodoviário em um veículo mais ágil",
    features: ["Banheiro a bordo", "Ar-condicionado", "Ótimo para grupos médios"],
    images: [
      "/images/frota/senior-28-externo.jpg",
      "/images/frota/senior-28-hero.jpg",
      "/images/frota/senior-28-interno.jpg",
    ],
    seatMap: "/images/frota/mapa-senior-28.png",
  },
  {
    id: "w9-30",
    name: "Volare W9",
    seats: 30,
    seatsLabel: "30 lugares",
    tagline: "Equilíbrio entre espaço e agilidade para grupos médios",
    features: ["Ar-condicionado", "Bagageiro amplo", "Motorista experiente"],
    images: [
      "/images/frota/w9-30-01.jpg",
      "/images/frota/w9-30-02.jpg",
      "/images/frota/w9-30-interno.jpg",
    ],
    seatMap: "/images/frota/mapa-w9-30.png",
  },
  {
    id: "w8-28",
    name: "Volare W8",
    seats: 28,
    seatsLabel: "28 lugares",
    tagline: "Compacto, ágil e ideal para centros urbanos",
    features: ["Ar-condicionado", "Bagageiro", "Ideal para turismo escolar e transfers"],
    images: [
      "/images/frota/w8-28-01.jpg",
      "/images/frota/w8-28-02.jpg",
      "/images/frota/w8-28-03.jpg",
      "/images/frota/w8-28-04.jpg",
      "/images/frota/w8-28-interno.jpg",
    ],
    seatMap: "/images/frota/mapa-w8-28.png",
  },
];

export function vehicleWhatsAppMessage(vehicle: Vehicle) {
  return `Olá! Gostaria de um orçamento para o veículo ${vehicle.name} (${vehicle.seatsLabel}).`;
}
