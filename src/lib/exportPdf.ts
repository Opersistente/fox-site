import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Passenger } from "./exportCsv";

export function downloadPassengersPdf(passengers: Passenger[], tripLabel = "Lista de Passageiros") {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Fox Agência de Viagens e Turismo", 14, 18);
  doc.setFontSize(11);
  doc.text(tripLabel, 14, 26);

  autoTable(doc, {
    startY: 32,
    head: [["#", "Nome completo", "CPF", "Telefone", "Nascimento"]],
    body: passengers.map((p, i) => [String(i + 1), p.nome, p.cpf, p.telefone, p.nascimento]),
    headStyles: { fillColor: [11, 46, 89] },
    styles: { fontSize: 9 },
  });

  doc.save("lista-passageiros.pdf");
}
