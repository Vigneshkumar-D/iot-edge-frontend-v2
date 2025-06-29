// // import { twMerge } from "tailwind-merge";
// // import { clsx, type ClassValue } from "clsx";

// // export function cn(...inputs: ClassValue[]) {
// // 	return twMerge(clsx(inputs));
// // }
// export function cn(...classes: (string | false | null | undefined)[]): string {
// 	return classes.filter(Boolean).join(" ");
//   }

// utils.ts

// utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
