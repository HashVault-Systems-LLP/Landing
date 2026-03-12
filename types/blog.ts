import type React from "react";

export interface BlogFrontmatter {
  title: string;
  author: string;
  date: string;
  tags: string[];
  image?: string;
  excerpt?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  rawContent: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: React.ReactElement;
}
