import React from 'react';
import { cn } from "@/lib/utils";

// Define the type for a single social media item
export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  icon: React.ReactNode; 
  color: string; // Color for customization
}

// Define the props for the SocialTooltip component
export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    // Base styles for the component
    const baseIconStyles =
      "relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-black/10 overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg";
    const baseSvgStyles =
      "relative z-10 text-black transition-colors duration-300 ease-in-out group-hover:text-white flex items-center justify-center";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute bottom-[-32px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-xs text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-40px]";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-2", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <span className={cn(baseSvgStyles)}>
                {item.icon}
              </span>
            </a>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
