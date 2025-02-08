import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const nameArray = name.split(" ");

  return nameArray
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
