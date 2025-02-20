import { atom } from "jotai";

export const promptAtom = atom<string | "">("");
export const selectedTagAtom = atom<string | "">("");
export const subTagAtom = atom<string | "">("");
export const hashTagsAtom = atom<string[]>([]);
