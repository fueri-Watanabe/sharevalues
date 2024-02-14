import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/modeToggle";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  return (
    <>
      <header className="flex justify-between sticky top-0 bg-background/90 backdrop-blur-sm z-50 items-center h-16 gap-2 px-4">
        <div>
          <p>sharevalues</p>
        </div>
        <div className="flex items-center gap-6">
          <Button>投稿</Button>
          <ModeToggle />
        </div>
      </header>
      <div className="flex justify-center">
        <main>
          <Card className="w-[540px]">
            <CardHeader>
              <CardTitle>600円のタバコ</CardTitle>
              <CardContent>
                <Slider defaultValue={[50]} max={100} step={1} />
              </CardContent>
              <CardFooter></CardFooter>
            </CardHeader>
          </Card>
        </main>
      </div>
      <footer></footer>
    </>
  );
}
