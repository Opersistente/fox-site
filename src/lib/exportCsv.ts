export type Passenger = {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  nascimento: string;
};

export function passengersToCsv(passengers: Passenger[]): string {
  const header = "Nome;CPF;Telefone;Nascimento";
  const rows = passengers.map(
    (p) => `${p.nome};${p.cpf};${p.telefone};${p.nascimento}`
  );
  return [header, ...rows].join("\r\n");
}

export function downloadCsv(passengers: Passenger[], filename = "lista-passageiros.csv") {
  const csv = passengersToCsv(passengers);
  // BOM para o Excel reconhecer acentuação em UTF-8 corretamente.
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
