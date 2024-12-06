import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const copyText = (text: string) => {
  navigator.clipboard.writeText(text);

  toast.success("Copied");
};

export { cn, copyText, toast };
