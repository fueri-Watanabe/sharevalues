"use client";

import { RESET } from "jotai/utils";
import { Button } from "../ui/button";
import { useSetAtom } from "jotai";
import { postHistoryAtom, userAtom } from "@/atoms/atom";

const ResetLocalStorageButton = () => {
  const setUser = useSetAtom(userAtom);
  const setPostHistory = useSetAtom(postHistoryAtom);

  return (
    <Button
      type="button"
      onClick={() => {
        setUser(RESET);
        setPostHistory(RESET);
      }}
    >
      リセット
    </Button>
  );
};
export default ResetLocalStorageButton;
