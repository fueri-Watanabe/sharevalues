"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { getData } from "country-list";
import Registered from "./registered";
import { ageSelect } from "@/const/data";
import { useAtom } from "jotai";
import { userAtom, userModalAtom } from "@/atoms/atom";

const UserSchema = z.object({
  age: z.string({ required_error: "年齢を選択してください。" }),
  country: z.string({ required_error: "移住国を選択してください。" }),
});

export type PostSchemaType = z.infer<typeof UserSchema>;

const UserModal = () => {
  const [isPending, startTransition] = useTransition();
  const [handleContents, setHandleContents] = useState(true);
  const [handleUserModal, setHandleUserModal] = useAtom(userModalAtom);
  const [user, setUser] = useAtom(userAtom);

  const form = useForm<PostSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      age: user ? user.age : undefined,
      country: user ? user.country : "JP",
    },
  });

  const setUserData = (data: PostSchemaType) => {
    startTransition(async () => {
      setUser(data);
      setHandleContents(false);
    });
  };

  return (
    <Dialog open={handleUserModal} onOpenChange={setHandleUserModal}>
      <DialogTrigger asChild>
        <Button type="button" onClick={() => setHandleContents(true)}>
          ユーザー
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>統計データ用ユーザー情報</DialogTitle>
          <DialogDescription>投票結果にのみ使用されます。</DialogDescription>
        </DialogHeader>
        {handleContents ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(setUserData)}>
              <div className="flex flex-col justify-center items-center gap-4 h-60">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>年齢</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={user ? user.age : undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="w-60">
                            <SelectValue placeholder="年齢を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {ageSelect.map((ageValue, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  value={ageValue.value.toString()}
                                >
                                  {ageValue.age}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>居住国</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={user ? user.country : "JP"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-60">
                            <SelectValue placeholder="国名を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {getData().map((country, index) => {
                              return (
                                <SelectItem key={index} value={country.code}>
                                  {country.name}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit" disabled={isPending} className="w-24">
                  登録
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Registered modalType={"user"} />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default UserModal;
