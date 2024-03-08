import { format } from "date-fns";

// 記日付の表を（yyyy年MM月dd日）に変換
// エラー防止のためタイムゾーンを変更する処理を含む
export const convertDate_yMd_JP = (value: Date) => {
  const reparseDate = (value: Date) =>
    value.toLocaleDateString("en-US", {
      timeZone: "Asia/Tokyo",
    });
  const date = format(reparseDate(value), "yyyy年MM月dd日");
  return date;
};
