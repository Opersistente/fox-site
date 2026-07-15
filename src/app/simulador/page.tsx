"use client";

import { useState, type FormEvent } from "react";
import { Loader2, MapPin, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { buildWhatsAppUrl } from "@/lib/site";
import { geocodeAddress, estimateRoadDistanceKm, estimateTravelHours, formatHours } from "@/lib/distance";
import { suggestVehicle } from "@/lib/vehicleSuggestion";
import { calculateTripCost, formatBRL } from "@/lib/pricing";

const VEHICLE_OPTIONS = ["Sugestão automática", "Van", "Micro-ônibus", "Ônibus executivo", "Múltiplos veículos"];

type Result = {
  distanceKm: number;
  hours: number;
  vehicleLabel: string;
  vehicleNote?: string;
  total: number;
};

export default function SimuladorPage() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [passageiros, setPassageiros] = useState("");
  const [tipoVeiculo, setTipoVeiculo] = useState(VEHICLE_OPTIONS[0]);
  const [dias, setDias] = useState("1");
  const [pedagios, setPedagios] = useState("");
  const [hospedagem, setHospedagem] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    const passengerCount = Number(passageiros);
    const dayCount = Math.max(Number(dias) || 1, 1);

    if (!origem.trim() || !destino.trim()) {
      setError("Informe origem e destino.");
      return;
    }
    if (!passengerCount || passengerCount <= 0) {
      setError("Informe a quantidade de passageiros.");
      return;
    }

    setLoading(true);
    try {
      const [originGeo, destGeo] = await Promise.all([
        geocodeAddress(origem),
        geocodeAddress(destino),
      ]);

      const distanceKm = estimateRoadDistanceKm(originGeo, destGeo);
      const hours = estimateTravelHours(distanceKm);
      const suggestion = suggestVehicle(passengerCount);
      const vehicleLabel = tipoVeiculo === VEHICLE_OPTIONS[0] ? suggestion.label : tipoVeiculo;

      const tollsValue = pedagios.trim() ? Number(pedagios) : undefined;
      const { total } = calculateTripCost({
        distanceKm,
        days: dayCount,
        tolls: tollsValue,
        includeDriverLodging: hospedagem,
      });

      setResult({
        distanceKm,
        hours,
        vehicleLabel,
        vehicleNote: tipoVeiculo === VEHICLE_OPTIONS[0] ? suggestion.note : undefined,
        total,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível calcular a viagem.");
    } finally {
      setLoading(false);
    }
  }

  const whatsappHref = result
    ? buildWhatsAppUrl(
        `Olá! Fiz uma simulação de viagem no site e gostaria de um orçamento oficial:\n` +
          `Origem: ${origem}\n` +
          `Destino: ${destino}\n` +
          `Passageiros: ${passageiros}\n` +
          `Dias de viagem: ${dias}\n` +
          `Veículo sugerido: ${result.vehicleLabel}\n` +
          `Distância estimada: ${Math.round(result.distanceKm)} km\n` +
          `Valor estimado: ${formatBRL(result.total)}`
      )
    : "#";

  return (
    <>
      <PageHeader
        eyebrow="Ferramenta gratuita"
        title="Simulador de Preço de Viagem"
        description="Preencha os dados da sua viagem e veja uma estimativa de distância, veículo recomendado e valor — em segundos."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="origem">Origem</Label>
                <Input
                  id="origem"
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  placeholder="Blumenau, SC"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="destino">Destino</Label>
                <Input
                  id="destino"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  placeholder="Florianópolis, SC"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="passageiros">Quantidade de passageiros</Label>
                <Input
                  id="passageiros"
                  type="number"
                  min={1}
                  value={passageiros}
                  onChange={(e) => setPassageiros(e.target.value)}
                  placeholder="30"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipoVeiculo">Tipo de veículo</Label>
                <select
                  id="tipoVeiculo"
                  value={tipoVeiculo}
                  onChange={(e) => setTipoVeiculo(e.target.value)}
                  className="mt-1.5 h-9 w-full rounded-lg border border-navy-900/15 bg-transparent px-3 text-sm text-navy-900 outline-none focus:border-amber-500"
                >
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="dias">Dias de viagem</Label>
                <Input
                  id="dias"
                  type="number"
                  min={1}
                  value={dias}
                  onChange={(e) => setDias(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="pedagios">Pedágios (R$, opcional)</Label>
                <Input
                  id="pedagios"
                  type="number"
                  min={0}
                  value={pedagios}
                  onChange={(e) => setPedagios(e.target.value)}
                  placeholder="Deixe em branco para estimar"
                  className="mt-1.5"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-navy-800">
              <Checkbox checked={hospedagem} onCheckedChange={(v) => setHospedagem(v === true)} />
              Incluir hospedagem do motorista (viagens com mais de 1 dia)
            </label>

            {error && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-600">
                <TriangleAlert className="h-4 w-4" /> {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-white hover:bg-amber-400 sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Calculando...
                </>
              ) : (
                "Calcular estimativa"
              )}
            </Button>
          </form>

          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-2xl border border-navy-900/10 bg-sand-50 p-7">
              <h2 className="font-display text-lg font-semibold text-navy-900">Resultado da simulação</h2>

              {!result && (
                <p className="mt-3 flex items-start gap-2 text-sm text-navy-700/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Preencha o formulário para ver a distância, o veículo sugerido e o valor estimado da viagem.
                </p>
              )}

              {result && (
                <div className="mt-4 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-navy-900/10 pb-3">
                    <span className="text-navy-700/70">Distância estimada</span>
                    <span className="font-semibold text-navy-900">{Math.round(result.distanceKm)} km</span>
                  </div>
                  <div className="flex justify-between border-b border-navy-900/10 pb-3">
                    <span className="text-navy-700/70">Tempo estimado</span>
                    <span className="font-semibold text-navy-900">{formatHours(result.hours)}</span>
                  </div>
                  <div className="flex justify-between border-b border-navy-900/10 pb-3">
                    <span className="text-navy-700/70">Veículo sugerido</span>
                    <span className="font-semibold text-navy-900">{result.vehicleLabel}</span>
                  </div>
                  {result.vehicleNote && (
                    <p className="-mt-2 text-xs text-navy-700/60">{result.vehicleNote}</p>
                  )}
                  <div className="flex justify-between pb-1">
                    <span className="text-navy-700/70">Valor estimado</span>
                    <span className="font-display text-xl font-semibold text-amber-600">
                      {formatBRL(result.total)}
                    </span>
                  </div>
                  <p className="text-xs text-navy-700/60">
                    Estimativa por distância em linha reta, sujeita a confirmação. O valor final é definido após
                    análise da rota real, pedágios e disponibilidade da frota.
                  </p>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block rounded-full bg-navy-900 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                  >
                    Solicitar orçamento oficial
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
