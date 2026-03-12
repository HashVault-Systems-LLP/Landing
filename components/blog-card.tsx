import Link from "next/link";
import { Card, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getExcerpt } from "@/lib/mdx";
import type { BlogPost } from "@/types/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <Card className="h-full hover:ring-primary/30 transition-all cursor-pointer">
        {frontmatter.image ? (
          <div className="h-44 w-full overflow-hidden">
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="hash-panel flex h-44 items-center justify-center">
            <span className="section-kicker">HashVault</span>
          </div>
        )}
        <CardHeader>
          <div className="text-sm font-medium text-foreground leading-snug">
            {frontmatter.title}
          </div>
          <CardDescription>{getExcerpt(post)}</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
          <span className="section-kicker">
            {frontmatter.author} · {frontmatter.date}
          </span>
          <div className="flex flex-wrap gap-1">
            {frontmatter.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
