import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<User | null>("user", null);
export const postHistoryAtom = atomWithStorage<string[]>("postHistory", []);

export const userModalAtom = atom(false);
export const postDocsAtom = atom<
  QueryDocumentSnapshot<DocumentData, DocumentData>[] | null
>(null);
