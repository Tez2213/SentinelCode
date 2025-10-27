import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "terminal"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm":
              variant === "default",
            "hover:bg-white/5 hover:text-emerald-400": variant === "ghost",
            "border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5":
              variant === "outline",
            "bg-black border border-emerald-500 text-emerald-400 font-mono hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]":
              variant === "terminal",
          },
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-4 py-2": size === "default",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
