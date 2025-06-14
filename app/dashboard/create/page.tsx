import { handleSubmission } from "@/app/actions";
import SubmitButton from "@/app/components/general/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function page() {
  return (
    <div className="mt-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new Post to share to the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmission} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input name="title" required placeholder="Title " />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea name="content" required placeholder="Content" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Image</Label>
              <Input
                name="image"
                required
                type="url"
                placeholder="Image url "
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
