import { User } from "@/types/user";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null)