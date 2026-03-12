import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Community | HashVault",
};

const POSTS_PER_PAGE = 10;

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const posts = getAllBlogPosts();

  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);

  const paginatedPosts = posts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-frame border-b border-border py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="hash-panel px-8 py-16 text-center lg:px-16 lg:py-20">
              <p className="section-kicker mb-4">Community</p>
              <h1 className="display-title mx-auto max-w-3xl text-4xl text-foreground lg:text-5xl">
                Join a community of growing cyber enthusiasts
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
                Follow our research, practitioner insights, and field notes from real engagements.
              </p>
              <div className="mt-8">
                <Button
                  nativeButton={false}
                  render={<a href="https://discord.gg/vzkckMfD9B" target="_blank" rel="noopener noreferrer" />}
                  className="border border-primary bg-primary px-6 text-[0.72rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
                >
                  Join Discord
                  <ArrowRight weight="bold" className="ml-2 size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured — only on page 1 */}
        {posts.length > 0 && safePage === 1 && (
          <section className="section-frame border-b border-border py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="section-kicker mb-3">Featured</p>
              <h2 className="display-title text-3xl text-foreground lg:text-4xl">
                Latest from the field.
              </h2>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {posts.slice(0, 3).map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        {posts.length > 0 && (
          <section className="section-frame py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="section-kicker mb-3">All posts</p>
                  <h2 className="display-title text-3xl text-foreground lg:text-4xl">
                    Everything we&apos;ve published.
                  </h2>
                </div>
                {totalPages > 1 && (
                  <p className="section-kicker shrink-0 pb-1">
                    Page {safePage} of {totalPages}
                  </p>
                )}
              </div>

              <div className="mt-10 border border-border overflow-hidden">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2 border-b border-border px-6 py-5 hover:bg-accent/30 transition-colors last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
                  >
                    <div className="min-w-0 flex-1 sm:pr-4">
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {post.frontmatter.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {post.frontmatter.author} · {post.frontmatter.date}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-1">
                      {post.frontmatter.tags?.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    nativeButton={false}
                    render={
                      safePage > 1 ? (
                        <Link href={`/community?page=${safePage - 1}`} />
                      ) : (
                        <span aria-disabled="true" />
                      )
                    }
                    className="border border-border px-4 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground disabled:opacity-40 hover:border-border hover:bg-accent/50 hover:text-foreground"
                    disabled={safePage <= 1}
                  >
                    <ArrowLeft className="mr-2 size-3.5" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/community?page=${p}`}
                        className={`inline-flex h-7 w-7 items-center justify-center border text-[0.72rem] transition-colors ${
                          p === safePage
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-border hover:bg-accent/50 hover:text-foreground"
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    nativeButton={false}
                    render={
                      safePage < totalPages ? (
                        <Link href={`/community?page=${safePage + 1}`} />
                      ) : (
                        <span aria-disabled="true" />
                      )
                    }
                    className="border border-border px-4 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground disabled:opacity-40 hover:border-border hover:bg-accent/50 hover:text-foreground"
                    disabled={safePage >= totalPages}
                  >
                    Next
                    <ArrowRight weight="bold" className="ml-2 size-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
