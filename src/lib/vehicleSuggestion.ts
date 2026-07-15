export type SuggestedVehicle = {
  label: string;
  note?: string;
};

/** Sugere o tipo de veículo com base na quantidade de passageiros, seguindo as faixas de capacidade da frota. */
export function suggestVehicle(passengers: number): SuggestedVehicle {
  if (passengers <= 0) {
    return { label: "Informe a quantidade de passageiros" };
  }
  if (passengers <= 20) {
    return { label: "Van" };
  }
  if (passengers <= 32) {
    return { label: "Micro-ônibus" };
  }
  if (passengers <= 46) {
    return { label: "Ônibus executivo" };
  }
  const vehicles = Math.ceil(passengers / 46);
  return {
    label: "Múltiplos veículos",
    note: `Sugestão: ${vehicles} ônibus executivos para atender ${passengers} passageiros.`,
  };
}
