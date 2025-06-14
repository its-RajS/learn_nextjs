import { Suspense } from "react";
import BlogCard from "./components/general/BlogCard";
import { prisma } from "./utils/prisma";
import { Skeleton } from "@/components/ui/skeleton";

// Move getData function inside the component or make it a separate utility
async function getData() {
  try {
    const data = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        authorId: true,
        authorName: true,
        authorImg: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export default function Home() {
  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Latest Blog Posts
      </h1>
      <Suspense fallback={<BlogPostsGrid />}>
        <BlogPost />
      </Suspense>
    </div>
  );
}

async function BlogPost() {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => {
        return <BlogCard data={item} key={item.id} />;
      })}
    </div>
  );
}

// Blog posts grid with loading state
function BlogPostsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden"
          key={index}
        >
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />

            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
