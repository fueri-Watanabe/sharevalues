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
import { Button } from "../../ui/button";
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
import { Textarea } from "../../ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { db } from "@/firebase/client";
import { doc, setDoc, collection } from "firebase/firestore";
import { postCollName } from "@/const/const";
import Registered from "./registered";

const PostSchema = z.object({
  message: z
    .string({ required_error: "投稿を入力してください。" })
    .min(3, "3文字以上で記入してください。")
    .max(80, "80文字以内で記入してください。"),
});

export type PostSchemaType = z.infer<typeof PostSchema>;

const PostModal = () => {
  const [isPending, startTransition] = useTransition();
  const [handleContents, setHandleContents] = useState(true);

  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const sendPost = (data: PostSchemaType) => {
    startTransition(async () => {
      const obj = {
        ...data,
        createdAt: new Date().getTime(),
      };
      const newPost = doc(collection(db, postCollName));
      await setDoc(newPost, obj);
      form.reset();
      setHandleContents(false);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" onClick={() => setHandleContents(true)}>
          投稿
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>あなたの価値観を共有しましょう</DialogTitle>
          <DialogDescription>1日3回まで 残り回数：〇回</DialogDescription>
        </DialogHeader>
        {handleContents ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendPost)}>
              <div className="grid w-full gap-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="例）600円のタバコ" {...field} />
                      </FormControl>
                      <FormDescription className="text-sm text-muted-foreground">
                        80文字以内で記入してください。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  投稿する
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Registered modalType={"post"} />
        )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PostModal;
