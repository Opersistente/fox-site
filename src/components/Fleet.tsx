"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { FLEET, vehicleWhatsAppMessage, type Vehicle } from "@/lib/fleet";
import { buildWhatsAppUrl } from "@/lib/site";

function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const whatsappHref = buildWhatsAppUrl(vehicleWhatsAppMessage(vehicle));

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-navy-950">
        <Image
          src={vehicle.images[active]}
          alt={`${vehicle.name} - ${vehicle.seatsLabel}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {vehicle.images.length > 1 && (
        <div className="flex gap-1.5 bg-navy-950 px-3 pb-3 pt-1">
          {vehicle.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${vehicle.name}`}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i === active ? "bg-amber-400" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      )}

      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-navy-900">{vehicle.name}</h3>
        <p className="text-sm font-medium text-amber-600">{vehicle.seatsLabel}</p>
        <p className="mt-2 text-sm text-navy-700/80">{vehicle.tagline}</p>
        <ul className="mt-4 space-y-1.5">
          {vehicle.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-navy-800/90">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded-full bg-navy-900 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Solicitar orçamento
        </a>
      </div>
    </div>
  );
}

export function Fleet() {
  return (
    <section id="frota" className="bg-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Nossa frota
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Veículos próprios, revisados e prontos para qualquer trajeto
          </h2>
          <p className="mt-4 text-navy-700/80">
            Da excursão de fim de semana ao evento corporativo: um modelo para
            cada tamanho de grupo, sempre com segurança e conforto.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FLEET.slice(0, 4).map((vehicle, i) => (
            <Reveal key={vehicle.id} delay={(i % 4) * 0.08}>
              <FleetCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/frota"
            className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-colors hover:border-amber-500 hover:text-amber-600"
          >
            Ver frota completa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
