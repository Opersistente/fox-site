"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, Search, ArrowUpDown, FileDown, FileText, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatCpf, formatPhone, isValidCpf, onlyDigits } from "@/lib/cpf";
import { downloadCsv, type Passenger } from "@/lib/exportCsv";
import { downloadPassengersPdf } from "@/lib/exportPdf";
import { buildWhatsAppUrl } from "@/lib/site";

const STORAGE_KEY = "fox-passenger-list";
const WHATSAPP_PREVIEW_LIMIT = 40;

function emptyForm() {
  return { nome: "", cpf: "", telefone: "", nascimento: "" };
}

function PassengerFormDialog({
  passenger,
  open,
  onOpenChange,
  onSave,
}: {
  passenger: Passenger | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (passenger: Passenger) => void;
}) {
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reseta o formulário sempre que o modal abre, sem depender de um efeito
  // (ver https://react.dev/learn/you-might-not-need-an-effect#adjusting-state-based-on-a-prop-change).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setForm(
        passenger
          ? {
              nome: passenger.nome,
              cpf: passenger.cpf,
              telefone: passenger.telefone,
              nascimento: passenger.nascimento,
            }
          : emptyForm()
      );
      setErrors({});
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!form.nome.trim()) nextErrors.nome = "Informe o nome completo.";
    if (!isValidCpf(form.cpf)) nextErrors.cpf = "CPF inválido.";
    if (onlyDigits(form.telefone).length < 10) nextErrors.telefone = "Telefone inválido.";
    if (!form.nascimento) nextErrors.nascimento = "Informe a data de nascimento.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      id: passenger?.id ?? crypto.randomUUID(),
      nome: form.nome.trim(),
      cpf: formatCpf(form.cpf),
      telefone: formatPhone(form.telefone),
      nascimento: form.nascimento,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>{passenger ? "Editar passageiro" : "Adicionar passageiro"}</DialogTitle>
        <DialogDescription>
          Preencha os dados do passageiro para a lista da viagem.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
              className="mt-1.5"
            />
            {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome}</p>}
          </div>

          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={form.cpf}
              onChange={(e) => setForm((f) => ({ ...f, cpf: formatCpf(e.target.value) }))}
              placeholder="000.000.000-00"
              className="mt-1.5"
            />
            {errors.cpf && <p className="mt-1 text-xs text-red-600">{errors.cpf}</p>}
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={form.telefone}
              onChange={(e) => setForm((f) => ({ ...f, telefone: formatPhone(e.target.value) }))}
              placeholder="(47) 99999-9999"
              className="mt-1.5"
            />
            {errors.telefone && <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>}
          </div>

          <div>
            <Label htmlFor="nascimento">Data de nascimento</Label>
            <Input
              id="nascimento"
              type="date"
              value={form.nascimento}
              onChange={(e) => setForm((f) => ({ ...f, nascimento: e.target.value }))}
              className="mt-1.5"
            />
            {errors.nascimento && <p className="mt-1 text-xs text-red-600">{errors.nascimento}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-amber-500 text-white hover:bg-amber-400">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ListaPassageirosPage() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Passenger | null>(null);

  useEffect(() => {
    // Sincroniza com o localStorage (sistema externo, indisponível durante o SSR),
    // por isso não dá para usar um inicializador preguiçoso do useState aqui.
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPassengers(JSON.parse(saved));
      } catch {
        // ignora dados corrompidos
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(passengers));
  }, [passengers, loaded]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = passengers;
    if (term) {
      list = list.filter(
        (p) => p.nome.toLowerCase().includes(term) || onlyDigits(p.cpf).includes(onlyDigits(term))
      );
    }
    return [...list].sort((a, b) =>
      sortAsc ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome)
    );
  }, [passengers, search, sortAsc]);

  function handleSave(passenger: Passenger) {
    setPassengers((prev) => {
      const exists = prev.some((p) => p.id === passenger.id);
      return exists ? prev.map((p) => (p.id === passenger.id ? passenger : p)) : [...prev, passenger];
    });
  }

  function handleDelete(id: string) {
    if (confirm("Remover este passageiro da lista?")) {
      setPassengers((prev) => prev.filter((p) => p.id !== id));
    }
  }

  function handleWhatsAppShare() {
    if (passengers.length === 0) return;
    const preview = passengers.slice(0, WHATSAPP_PREVIEW_LIMIT);
    const lines = preview.map((p, i) => `${i + 1}. ${p.nome} — ${p.cpf}`);
    const suffix =
      passengers.length > WHATSAPP_PREVIEW_LIMIT
        ? `\n\n(+${passengers.length - WHATSAPP_PREVIEW_LIMIT} passageiros — para a lista completa, use a exportação em CSV ou PDF)`
        : "";
    const message = `Lista de Passageiros (${passengers.length}):\n\n${lines.join("\n")}${suffix}`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageHeader
        eyebrow="Ferramenta gratuita"
        title="Gerador de Lista de Passageiros"
        description="Monte a lista de passageiros da sua excursão ou viagem em grupo, com validação de CPF, exportação em CSV/PDF e envio direto pelo WhatsApp."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/40" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome ou CPF..."
                className="pl-9"
              />
            </div>
            <Button
              onClick={() => {
                setEditing(null);
                setDialogOpen(true);
              }}
              className="bg-navy-900 text-white hover:bg-navy-800"
            >
              <Plus className="h-4 w-4" /> Adicionar passageiro
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-navy-900/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button
                      onClick={() => setSortAsc((v) => !v)}
                      className="flex items-center gap-1.5 font-semibold text-navy-900"
                    >
                      Nome <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Nascimento</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-navy-700/60">
                      Nenhum passageiro cadastrado ainda.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-navy-900">{p.nome}</TableCell>
                    <TableCell>{p.cpf}</TableCell>
                    <TableCell>{p.telefone}</TableCell>
                    <TableCell>{p.nascimento.split("-").reverse().join("/")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(p);
                            setDialogOpen(true);
                          }}
                          aria-label={`Editar ${p.nome}`}
                          className="rounded-md p-1.5 text-navy-700 hover:bg-sand-100 hover:text-amber-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          aria-label={`Excluir ${p.nome}`}
                          className="rounded-md p-1.5 text-navy-700 hover:bg-sand-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="outline"
              disabled={passengers.length === 0}
              onClick={() => downloadCsv(passengers)}
            >
              <FileDown className="h-4 w-4" /> Exportar CSV
            </Button>
            <Button
              variant="outline"
              disabled={passengers.length === 0}
              onClick={() => downloadPassengersPdf(passengers)}
            >
              <FileText className="h-4 w-4" /> Gerar PDF
            </Button>
            <Button
              disabled={passengers.length === 0}
              onClick={handleWhatsAppShare}
              className="bg-[#25D366] text-white hover:bg-[#1ebe57]"
            >
              <MessageCircle className="h-4 w-4" /> Compartilhar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <PassengerFormDialog
        passenger={editing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
      />
    </>
  );
}
