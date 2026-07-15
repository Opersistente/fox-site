import { NextResponse } from "next/server";

// Geocodificação gratuita via Nominatim (OpenStreetMap). Sem custo, sem API key.
// Respeita a política de uso da Nominatim (User-Agent identificado, 1 requisição por vez).
// Ver: https://operations.osmfoundation.org/policies/nominatim/

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length < 3) {
    return NextResponse.json({ error: "Informe um endereço válido." }, { status: 400 });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", `${query}, Brasil`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "br");

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "FoxViagensSite/1.0 (contato@foxagencia.com.br)",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Não foi possível localizar este endereço agora." },
        { status: 502 }
      );
    }

    const results = (await res.json()) as Array<{
      lat: string;
      lon: string;
      display_name: string;
    }>;

    if (results.length === 0) {
      return NextResponse.json(
        { error: `Endereço não encontrado: "${query}". Tente incluir cidade e estado.` },
        { status: 404 }
      );
    }

    const [result] = results;
    return NextResponse.json({
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      displayName: result.display_name,
    });
  } catch {
    return NextResponse.json(
      { error: "Falha ao consultar o serviço de geocodificação." },
      { status: 500 }
    );
  }
}
