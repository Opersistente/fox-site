"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/frota", label: "Frota" },
  { href: "/empresas", label: "Empresas" },
  { href: "/turismo-escolar", label: "Turismo Escolar" },
  { href: "/simulador", label: "Simulador" },
  { href: "/lista-passageiros", label: "Lista de Passageiros" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Fecha o menu mobile ao trocar de rota, sem depender de um efeito
  // (ver https://react.dev/learn/you-might-not-need-an-effect#adjusting-state-based-on-a-prop-change).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" aria-label="Fox Viagens - Início">
          <Logo variant={scrolled ? "dark" : "light"} />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium whitespace-nowrap transition-colors hover:text-amber-500 ${
                  active
                    ? "text-amber-500"
                    : scrolled
                      ? "text-navy-800"
                      : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/contato"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-amber-400"
          >
            Solicitar Orçamento
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          className={`flex h-10 w-10 items-center justify-center rounded-full xl:hidden ${
            scrolled ? "text-navy-900" : "text-white"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100svh-60px)] overflow-y-auto border-t border-navy-100 bg-white px-5 py-4 xl:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium ${
                  pathname === link.href ? "text-amber-500" : "text-navy-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Solicitar Orçamento
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
