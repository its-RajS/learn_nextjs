"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/prisma";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/register");

  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: image as string,
      authorId: user?.id as string,
      authorImg: user?.picture as string,
      authorName: user?.given_name as string,
    },
  });

  return redirect("/dashboard");
}
