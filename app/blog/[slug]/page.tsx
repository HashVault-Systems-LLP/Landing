import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/mdx";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return {
    title: `${post.frontmatter.title} | HashVault`,
    description: post.frontmatter.excerpt,
    openGraph: post.frontmatter.image
      ? { images: [post.frontmatter.image] }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const { frontmatter, content } = post;

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <header className="section-frame border-b border-border py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="mb-4 flex flex-wrap gap-1.5">
              {frontmatter.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="display-title text-4xl text-foreground lg:text-5xl">
              {frontmatter.title}
            </h1>
            <p className="mt-5 text-xs text-muted-foreground">
              {frontmatter.author} · {frontmatter.date}
            </p>
            {frontmatter.image && (
              <div className="mt-10 h-72 w-full overflow-hidden border border-border">
                <img
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <article className="w-full">
            <div className="prose-mdx w-full">{content}</div>
          </article>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/community"
              className="section-kicker inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to Community
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
