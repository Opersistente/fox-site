import { PRICING_CONFIG } from "./pricingConfig";

export type TripCostInput = {
  distanceKm: number;
  days: number;
  tolls?: number;
  includeDriverLodging: boolean;
};

export type TripCostBreakdown = {
  kmCost: number;
  tollsCost: number;
  lodgingCost: number;
  subtotal: number;
  margin: number;
  total: number;
};

export function calculateTripCost({
  distanceKm,
  days,
  tolls,
  includeDriverLodging,
}: TripCostInput): TripCostBreakdown {
  const kmCost = distanceKm * PRICING_CONFIG.valorPorKm;
  const tollsCost = tolls ?? (distanceKm / 100) * PRICING_CONFIG.pedagioMedioPor100Km;
  const nights = Math.max(days - 1, 0);
  const lodgingCost = includeDriverLodging
    ? nights * PRICING_CONFIG.diariaHospedagemMotorista
    : 0;

  const subtotal = kmCost + tollsCost + lodgingCost;
  const margin = subtotal * (PRICING_CONFIG.margemOperacionalPct / 100);
  const total = subtotal + margin;

  return { kmCost, tollsCost, lodgingCost, subtotal, margin, total };
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
