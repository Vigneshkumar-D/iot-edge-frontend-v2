// import { twMerge } from "tailwind-merge";
// import { clsx, type ClassValue } from "clsx";

// export function cn(...inputs: ClassValue[]) {
// 	return twMerge(clsx(inputs));
// }
// A simple utility to conditionally join class names
export function cn(...classes: (string | false | null | undefined)[]): string {
	return classes.filter(Boolean).join(" ");
  }
  