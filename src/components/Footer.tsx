import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/frota", label: "Nossa Frota" },
  { href: "/servicos", label: "Serviços" },
  { href: "/empresas", label: "Empresas" },
  { href: "/turismo-escolar", label: "Turismo Escolar" },
  { href: "/simulador", label: "Simulador de Preço" },
  { href: "/lista-passageiros", label: "Lista de Passageiros" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

const SERVICES = [
  "Viagens Corporativas",
  "Excursões",
  "Eventos",
  "Turismo Escolar",
  "Fretamento",
];

export function Footer() {
  return (
    <footer className="bg-navy-950 py-14 text-white/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Sua agência de viagens e turismo de confiança. Oferecemos os
              melhores serviços para tornar sua viagem inesquecível.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Links rápidos
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Serviços
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contato
            </p>
            <div className="mt-4 space-y-2.5 text-sm">
              <p>{SITE.address}</p>
              <p>{SITE.phoneDisplay}</p>
              <p>{SITE.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fox Viagens e Turismo Ltda. Todos os direitos reservados.</p>
          <p>Desenvolvido por Luis Oliveira</p>
        </div>
      </div>
    </footer>
  );
}
