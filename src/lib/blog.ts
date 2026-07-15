import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  keywords: string[];
  cover: string;
  contentHtml: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    keywords: data.keywords ?? [],
    cover: data.cover,
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category)));
}
