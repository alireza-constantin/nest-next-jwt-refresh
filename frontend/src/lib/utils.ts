import { ClassValue, clsx } from "clsx"
import jwtDecode from "jwt-decode";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const accessToken = {
    setToken(newToken: string) {
        localStorage.setItem("at", newToken)
    },
    getToken() {
        return localStorage.getItem("at");
    },
};

export function isAtValid(at: string): boolean{
  if(at) {
    return jwtDecode<{ sub: string, exp: number }>(at).exp > Date.now() / 1000
  }
  return false
}
