import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { prisma } from "../utils/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogCard from "../components/general/BlogCard";

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user?.id as string);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href={"/dashboard/create"}>
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data.map((item) => (
          <BlogCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default page;
