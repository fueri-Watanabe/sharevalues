import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { atom } from "jotai";

export const postDocsAtom = atom<
  QueryDocumentSnapshot<DocumentData, DocumentData>[] | null
>(null);
export const postHistoryAtom = atom<string[]>([]);
