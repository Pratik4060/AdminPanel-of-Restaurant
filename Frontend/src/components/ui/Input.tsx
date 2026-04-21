import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "h-9 w-full rounded-md border border-[#e3ddd4] bg-[#fafafa] px-3 text-[12px] text-[#1f1f1f] outline-none transition focus:border-brand-400 focus:bg-white",
        className
      )}
      {...props}
    />
  );
}
