import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Siyah/altın buton sistemi. shadcn API'siyle uyumlu tutuldu; 21st.dev
 * kataloğundan gelen bileşenler `variant`/`size` sözleşmesini bozmadan
 * kullanılabilir.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Ana eylem — dolu altın */
        default:
          "bg-gradient-to-b from-gold-300 to-gold-600 text-royal-ink shadow-[0_10px_30px_-12px_rgba(212,175,55,0.65)] hover:from-gold-200 hover:to-gold-500 hover:shadow-[0_14px_40px_-12px_rgba(212,175,55,0.85)] active:translate-y-px",
        /** İkincil eylem — altın kenarlık */
        outline:
          "border border-gold-500/45 bg-transparent text-gold-200 hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-100",
        /** Koyu yüzeylerde nötr eylem */
        secondary:
          "border border-royal-border bg-royal-elevated text-royal-fg hover:border-gold-500/40 hover:bg-royal-surface",
        ghost: "text-royal-muted hover:bg-white/5 hover:text-gold-200",
        /** WhatsApp gibi dış eylemler */
        whatsapp:
          "bg-[#1f8f4e] text-white hover:bg-[#25a75c] shadow-[0_10px_30px_-14px_rgba(37,167,92,0.9)]",
        link: "text-gold-300 underline-offset-4 hover:text-gold-200 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-[0.9375rem] tracking-wide",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
