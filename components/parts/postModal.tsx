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

const postSchema = z.object({
  message: z.string().min(2).max(80),
});

export type PostSchemaType = z.infer<typeof postSchema>;

const PostModal = () => {
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = form;
  const [isPending, startTransition] = useTransition();

  const sendPost: SubmitHandler<PostSchemaType> = async (data) => {
    startTransition(async () => {
      console.log(data);
      // const db = getDatabase();
      // const dbRef = ref(db, "post");
      // set(dbRef, {
      //   data,
      // });
    });
  };

  return (
    <Dialog>
      <Form {...form}>
        <form onSubmit={handleSubmit(sendPost)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <DialogTrigger asChild>
                  <Button>投稿</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>価値観を共有しましょう</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid w-full gap-2">
                    <FormControl>
                      <Textarea
                        // id="message"
                        placeholder="例）600円のタバコ"
                        // {...register("message", { required: true })}
                        {...field}
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      80文字以内で記入してください。
                    </p>
                    <Button type="submit" disabled={isPending}>
                      Send message
                    </Button>
                  </div>
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Dialog>
  );
};
export default PostModal;
