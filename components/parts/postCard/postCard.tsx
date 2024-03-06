"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, CornersIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostData } from "@/types/post";
import { convertDate_yMd_JP } from "@/utils/convertDate";
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useTransition } from "react";
// TODO デプロイ後のエラーの修正
const PostCard = ({
  postData,
  postId,
}: {
  postData: PostData;
  postId: string;
}) => {
  const [showData, setShowData] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isPending, startTransition] = useTransition();

  const postValue = (value: string) => {
    startTransition(async () => {
      const valuesRef = doc(db, "posts", postId);
      await addDoc(collection(valuesRef, value), {
        createdAt: new Date().getTime(),
      });
      setShowData(true);
      setDisabled(true);
    });
  };
  // TODO 分析図を作成する。
  // TODO rechartのinstall、uiにchartフォルダを作成。
  return (
    <Card className="w-[540px]">
      <CardHeader>
        <CardTitle className="text-center">{postData.message}</CardTitle>
      </CardHeader>
      <CardContent>
        {showData && (
          <div className="flex flex-col gap-2">
            <Accordion type="single" defaultValue="item" collapsible>
              <AccordionItem value="item">
                <AccordionTrigger>結果</AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="ratio">
                    <TabsList>
                      <TabsTrigger value="ratio">割合</TabsTrigger>
                      <TabsTrigger value="age">年代別</TabsTrigger>
                      <TabsTrigger value="date">年代別</TabsTrigger>
                      <TabsTrigger value="region">地域別</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ratio" className="h-80 border">
                      割合
                    </TabsContent>
                    <TabsContent value="age" className="h-80 border">
                      年代別
                    </TabsContent>
                    <TabsContent value="date" className="h-80 border">
                      年代別
                    </TabsContent>
                    <TabsContent value="region" className="h-80 border">
                      地域別
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        {!disabled && (
          <div className="relative flex flex-col justify-center items-center gap-4 select-none">
            <div className="flex">
              <Button
                onClick={() => postValue("low")}
                className="w-40 bg-red-500 dark:bg-red-800 hover:bg-red-600 dark:hover:bg-red-900 active:bg-red-700 dark:active:bg-red-950 text-white rounded-r-none"
                disabled={isPending || disabled}
              >
                <ArrowDownIcon />
                低い
              </Button>
              <Button
                onClick={() => postValue("high")}
                className="w-40 bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-900 active:bg-blue-700 dark:active:bg-blue-950 text-white rounded-l-none"
                disabled={isPending || disabled}
              >
                <ArrowUpIcon />
                高い
              </Button>
            </div>
            <div className="absolute">
              <Button
                onClick={() => postValue("just")}
                className="flex justify-center items-end text-[9px] w-20 h-10 bg-slate-500 dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-900 active:bg-slate-700 dark:active:bg-slate-950 text-white rounded-t-full"
                disabled={isPending || disabled}
              >
                <CornersIcon />
                ジャスト
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <CardDescription>
          {/* {convertDate_yMd_JP(new Date(postData.createdAt))} */}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
