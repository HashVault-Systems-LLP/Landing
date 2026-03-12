import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { BlogPost, BlogPostWithContent, BlogFrontmatter } from "@/types/blog";

function getBlogsDirectory(): string {
  return path.join(process.cwd(), "Blogs");
}

export function getAllBlogSlugs(): string[] {
  const dir = getBlogsDirectory();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllBlogPosts(): BlogPost[] {
  const dir = getBlogsDirectory();
  if (!fs.existsSync(dir)) return [];

  const slugs = getAllBlogSlugs();
  const posts = slugs.map((slug): BlogPost => {
    const filePath = path.join(dir, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      rawContent: content,
    };
  });

  return posts.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date)
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithContent> {
  const dir = getBlogsDirectory();
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(raw);

  const { content } = await compileMDX<BlogFrontmatter>({
    source: rawContent,
    options: { parseFrontmatter: false },
  });

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    rawContent,
    content,
  };
}

export function getExcerpt(post: BlogPost, wordLimit = 15): string {
  if (post.frontmatter.excerpt) return post.frontmatter.excerpt;
  const stripped = post.rawContent
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/[*_>\[\]()!]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.split(" ").slice(0, wordLimit).join(" ") + "…";
}
