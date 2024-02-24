"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { getDatabase, set, ref } from "@firebase/database";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";

const PostSchema = z.object({
  message: z
    .string({ required_error: "投稿を入力してください。" })
    .min(3, "3文字以上で記入してください。")
    .max(80, "80文字以内で記入してください。"),
});

export type PostSchemaType = z.infer<typeof PostSchema>;

const PostModal = () => {
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });
  const [isPending, startTransition] = useTransition();
  // TODO FirebaseDBに登録処理を作成
  const sendPost = async (data: PostSchemaType) => {
    startTransition(async () => {
      console.log(data);
      // const db = getDatabase();
      // const dbRef = ref(db, "post");
      // await set(dbRef, { posts: data.message });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>投稿</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>あなたの価値観を共有しましょう</DialogTitle>
          <DialogDescription>1日3回まで 残り回数：〇回</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendPost)}>
            <div className="grid w-full gap-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        // id="message"
                        placeholder="例）600円のタバコ"
                        // {...register("message", { required: true })}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground">
                      80文字以内で記入してください。
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Send message
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PostModal;
