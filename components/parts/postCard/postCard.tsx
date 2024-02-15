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

const PostCard = () => {
  const [showData, setShowData] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const postValue = () => {
    setShowData(true);
    setDisabled(true);
  };
  return (
    <Card className="w-[540px]">
      <CardHeader>
        <CardTitle className="text-center">600円のタバコ</CardTitle>
      </CardHeader>
      {showData && (
        <CardContent className="flex flex-col gap-2">
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
        </CardContent>
      )}
      {!disabled && (
        <CardFooter className="relative flex flex-col justify-center items-center gap-4 select-none">
          <div className="flex">
            <Button
              onClick={postValue}
              className="w-40 bg-red-500 dark:bg-red-800 hover:bg-red-600 dark:hover:bg-red-900 active:bg-red-700 dark:active:bg-red-950 text-white rounded-r-none"
              disabled={disabled}
            >
              <ArrowDownIcon />
              低い
            </Button>
            <Button
              onClick={postValue}
              className="w-40 bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-900 active:bg-blue-700 dark:active:bg-blue-950 text-white rounded-l-none"
              disabled={disabled}
            >
              <ArrowUpIcon />
              高い
            </Button>
          </div>
          <div className="absolute">
            <Button
              onClick={postValue}
              className="flex justify-center items-end text-[9px] w-20 h-10 bg-slate-500 dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-900 active:bg-slate-700 dark:active:bg-slate-950 text-white rounded-t-full"
              disabled={disabled}
            >
              <CornersIcon />
              フィット
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
export default PostCard;
