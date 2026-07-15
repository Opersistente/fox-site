"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Images, MapIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FLEET, vehicleWhatsAppMessage, type Vehicle } from "@/lib/fleet";
import { buildWhatsAppUrl } from "@/lib/site";

const CAPACITY_FILTERS = ["Todos", "28", "30", "32", "46"] as const;

function VehicleGalleryDialog({
  vehicle,
  open,
  onOpenChange,
}: {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!vehicle) return null;
  const whatsappHref = buildWhatsAppUrl(vehicleWhatsAppMessage(vehicle));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-full max-w-4xl overflow-y-auto sm:max-w-4xl">
        <DialogTitle className="font-display text-xl font-semibold text-navy-900">
          {vehicle.name}
        </DialogTitle>
        <DialogDescription>{vehicle.seatsLabel} · {vehicle.tagline}</DialogDescription>

        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {vehicle.images.map((img) => (
            <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-navy-950">
              <Image src={img} alt={vehicle.name} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-navy-900/10 bg-sand-50 p-4 sm:flex-row sm:items-center">
          <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border border-navy-900/10 bg-white">
            <Image src={vehicle.seatMap} alt={`Mapa de poltronas ${vehicle.name}`} fill className="object-contain" />
          </div>
          <div className="flex-1 text-sm text-navy-700/80">
            <p className="flex items-center gap-1.5 font-semibold text-navy-900">
              <MapIcon className="h-4 w-4 text-amber-500" /> Mapa de poltronas
            </p>
            <p className="mt-1">
              Esquema numerado para organizar o embarque de cada passageiro — ótimo para enviar à escola, empresa ou grupo.
            </p>
          </div>
          <a
            href={vehicle.seatMap}
            download
            className="shrink-0 rounded-full border border-navy-900/15 px-4 py-2 text-center text-xs font-semibold text-navy-800 transition-colors hover:border-amber-500 hover:text-amber-600"
          >
            Baixar mapa
          </a>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block rounded-full bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-400"
        >
          Solicitar orçamento para este veículo
        </a>
      </DialogContent>
    </Dialog>
  );
}

export default function FrotaPage() {
  const [filter, setFilter] = useState<(typeof CAPACITY_FILTERS)[number]>("Todos");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "Todos") return FLEET;
    return FLEET.filter((v) => String(v.seats) === filter);
  }, [filter]);

  return (
    <>
      <PageHeader
        eyebrow="Frota própria desde 1996"
        title="Cinco veículos, um só padrão de segurança e conforto"
        description="Não terceirizamos o veículo que leva seu grupo. Manutenção acompanhada de perto, motoristas que conhecem cada carro, e um modelo certo para cada tamanho de viagem."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {CAPACITY_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-navy-900/15 text-navy-800 hover:border-amber-500 hover:text-amber-600"
                }`}
              >
                {f === "Todos" ? "Todos" : `${f} lugares`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <div
                key={vehicle.id}
                className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full bg-navy-950">
                  <Image
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm font-medium text-amber-600">{vehicle.seatsLabel}</p>
                  <p className="mt-2 text-sm text-navy-700/80">{vehicle.tagline}</p>
                  <ul className="mt-4 space-y-1.5">
                    {vehicle.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-navy-800/90">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setSelected(vehicle);
                      setDialogOpen(true);
                    }}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-amber-500 hover:text-amber-600"
                  >
                    <Images className="h-4 w-4" /> Ver galeria completa
                  </button>
                  <a
                    href={buildWhatsAppUrl(vehicleWhatsAppMessage(vehicle))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block rounded-full bg-navy-900 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                  >
                    Solicitar orçamento
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VehicleGalleryDialog vehicle={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
