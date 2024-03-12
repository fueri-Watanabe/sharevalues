"use client";

import {
  Dialog,
  DialogClose,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { getData, getNames } from "country-list";
import Registered from "./registered";

const ageSelect = [
  { value: 10, age: "20歳未満" },
  { value: 20, age: "20-29歳" },
  { value: 30, age: "30-39歳" },
  { value: 40, age: "40-49歳" },
  { value: 50, age: "50-59歳" },
  { value: 60, age: "60-69歳" },
  { value: 70, age: "70-79歳" },
  { value: 80, age: "80歳以上" },
];

const UserSchema = z.object({
  age: z.string({ required_error: "年齢を選択してください。" }),
  country: z.string({ required_error: "移住国を選択してください。" }),
});

export type PostSchemaType = z.infer<typeof UserSchema>;

const UserModal = () => {
  let userData: { age: string; country: string } | undefined;
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem("user");
    userData = storedValue && JSON.parse(storedValue);
  }
  console.log(userData);
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      age: userData ? userData.age : undefined,
      country: "JP",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [handleContents, setHandleContents] = useState(true);
  const [open, setOpen] = useState(false);
  const setUserData = (data: PostSchemaType) => {
    startTransition(async () => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
    });
    setHandleContents(false);
  };

  useEffect(() => setOpen(true), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <form
              onSubmit={form.handleSubmit(setUserData)}
              // className="flex flex-col items-center"
            >
              <div className="flex flex-col justify-center items-center gap-4 h-60">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>年齢</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={userData ? userData.age : undefined}
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
                      <Select onValueChange={field.onChange} defaultValue="JP">
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
                <Button
                  className="w-24"
                  onClick={() => localStorage.removeItem("user")}
                >
                  reset
                </Button>
                <Button type="submit" disabled={isPending} className="w-24">
                  登録
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Registered />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default UserModal;
