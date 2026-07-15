import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return {};

  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [post.cover],
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();

  const post = getPostBySlug(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${SITE.url}${post.cover}`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="bg-white pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="relative h-[45vh] min-h-[320px] w-full bg-navy-950 pt-24">
        <Image src={post.cover} alt={post.title} fill sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
        <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-end px-5 pb-10 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            {post.category} · {formatDate(post.date)}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para o blog
        </Link>

        <div
          className="blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
