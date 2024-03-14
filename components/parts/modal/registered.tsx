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

const Registered = ({ modalType }: { modalType: string }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 h-60">
        <p>
          {modalType == "user"
            ? "ユーザーデータを登録しました。"
            : "価値観を投稿しました。"}
        </p>
        {modalType == "user" || <p>これからも共有していきましょう。</p>}
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
