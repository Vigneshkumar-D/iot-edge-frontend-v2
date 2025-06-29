// // import { twMerge } from "tailwind-merge";
// // import { clsx, type ClassValue } from "clsx";

// // export function cn(...inputs: ClassValue[]) {
// // 	return twMerge(clsx(inputs));
// // }
// export function cn(...classes: (string | false | null | undefined)[]): string {
// 	return classes.filter(Boolean).join(" ");
//   }

// utils.ts
import { clsx } from "clsx";

export function cn(...inputs: Parameters<typeof clsx>) {
	return clsx(...inputs);
}
