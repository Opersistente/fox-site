import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dicas de viagem, turismo em Blumenau e no Vale Europeu, transporte corporativo e turismo escolar. Conteúdo da Fox Agência de Viagens e Turismo.",
  alternates: { canonical: "/blog" },
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const posts = getAllPosts();
  const categories = getAllCategories();
  const filtered = categoria ? posts.filter((p) => p.category === categoria) : posts;

  return (
    <>
      <PageHeader
        eyebrow="Blog Fox Viagens"
        title="Turismo, excursões e dicas de viagem"
        description="Conteúdo sobre turismo em Blumenau e no Vale Europeu, excursões, viagens corporativas e turismo escolar."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                !categoria
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-navy-900/15 text-navy-800 hover:border-amber-500 hover:text-amber-600"
              }`}
            >
              Todos
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog?categoria=${encodeURIComponent(c)}`}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  categoria === c
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-navy-900/15 text-navy-800 hover:border-amber-500 hover:text-amber-600"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5"
              >
                <div className="relative aspect-[16/10] w-full bg-navy-950">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                    {post.category} · {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-navy-900">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
