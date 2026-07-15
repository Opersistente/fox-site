import { PRICING_CONFIG } from "./pricingConfig";

export type Coordinates = { lat: number; lon: number };

export type GeocodeResult = Coordinates & { displayName: string };

export async function geocodeAddress(query: string): Promise<GeocodeResult> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Não foi possível localizar o endereço.");
  }

  return data as GeocodeResult;
}

/** Distância em linha reta (km) entre duas coordenadas, pela fórmula de Haversine. */
function haversineKm(a: Coordinates, b: Coordinates): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return R * c;
}

/** Estimativa de distância rodoviária (km): linha reta × fator de rota. */
export function estimateRoadDistanceKm(a: Coordinates, b: Coordinates): number {
  return haversineKm(a, b) * PRICING_CONFIG.fatorRota;
}

/** Tempo estimado de viagem (em horas), a partir da distância e da velocidade média considerada. */
export function estimateTravelHours(distanceKm: number): number {
  return distanceKm / PRICING_CONFIG.velocidadeMediaKmh;
}

export function formatHours(hours: number): string {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, "0")}`;
}
