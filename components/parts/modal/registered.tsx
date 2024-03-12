import { Button } from "@/components/ui/button";
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

const Registered = () => {
  return (
    <>
      <div className="flex justify-center items-center h-60">
        <p>ユーザーデータを登録しました。</p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button">閉じる</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
export default Registered;
