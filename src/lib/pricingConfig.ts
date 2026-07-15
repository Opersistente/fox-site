/**
 * Parâmetros de custo do simulador de viagem.
 * Valores padrão de referência — ajuste com os números reais de operação da Fox.
 */
export const PRICING_CONFIG = {
  /** Valor cobrado por km rodado (ida + volta), em reais. */
  valorPorKm: 4.5,
  /** Margem operacional aplicada sobre o custo total, em percentual (0-100). */
  margemOperacionalPct: 20,
  /** Pedágio médio estimado a cada 100km rodados, em reais. */
  pedagioMedioPor100Km: 18,
  /** Diária de hospedagem do motorista, quando aplicável, em reais. */
  diariaHospedagemMotorista: 250,
  /** Velocidade média considerada para estimar o tempo de viagem, em km/h. */
  velocidadeMediaKmh: 60,
  /** Fator aplicado sobre a distância em linha reta para aproximar a distância rodoviária real. */
  fatorRota: 1.35,
} as const;
