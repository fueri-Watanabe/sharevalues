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
import { ModeToggle } from "@/components/tools/modeToggle";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CornersIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        {showData && (
          <CardContent className="flex flex-col gap-2">
            <Accordion type="single" defaultValue="item" collapsible>
              <AccordionItem value="item">
                <AccordionTrigger>結果</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    className="flex w-fit rounded-xl border px-2 py-1"
                    defaultValue="ratio"
                  >
                    <div>
                      <RadioGroupItem
                        value="ratio"
                        id="1"
                        className="peer hidden"
                      />
                      <Label
                        htmlFor="1"
                        className="px-2 peer-aria-checked:bg-white peer-aria-checked:text-slate-800 rounded-lg select-none"
                      >
                        割合
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="age"
                        id="2"
                        className="peer hidden"
                      />
                      <Label
                        htmlFor="2"
                        className="px-2 peer-aria-checked:bg-white peer-aria-checked:text-slate-800 rounded-lg select-none"
                      >
                        年代別
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="date"
                        id="3"
                        className="peer hidden"
                      />
                      <Label
                        htmlFor="3"
                        className="px-2 peer-aria-checked:bg-white peer-aria-checked:text-slate-800 rounded-lg select-none"
                      >
                        投票日別
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="region"
                        id="4"
                        className="peer hidden"
                      />
                      <Label
                        htmlFor="4"
                        className="px-2 peer-aria-checked:bg-white peer-aria-checked:text-slate-800 rounded-lg select-none"
                      >
                        地域別
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="w-full h-80 border"></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        )}
        <CardFooter className="relative flex flex-col justify-center items-center gap-4 select-none">
          <div className="flex">
            <Button
              onClick={postValue}
              className="w-40 bg-red-800 hover:bg-red-900 active:bg-red-950 text-white rounded-r-none"
              disabled={disabled}
            >
              <ArrowDownIcon />
              低い
            </Button>
            <Button
              onClick={postValue}
              className="w-40 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white rounded-l-none"
              disabled={disabled}
            >
              <ArrowUpIcon />
              高い
            </Button>
          </div>
          <div className="absolute">
            <Button
              onClick={postValue}
              className="flex justify-center items-end text-[9px] w-20 h-10 bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white rounded-t-full"
              disabled={disabled}
            >
              <CornersIcon />
              フィット
            </Button>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
export default PostCard;
