import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex gap-3 items-center h-14 w-full rounded-md pl-3 bg-zinc-900 text-sm disabled:opacity-50",
          className
        )}
      >
        {props.icon && <div className="opacity-60">{props.icon}</div>}
        <input
          type={type}
          ref={ref}
          className="bg-transparent w-full h-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none pr-3 disabled:opacity-50 disabled:cursor-not-allowed"
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
