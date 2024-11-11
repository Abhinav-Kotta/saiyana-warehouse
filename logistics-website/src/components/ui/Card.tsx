'use client';

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-white shadow-sm transition-all",
        {
          'border border-gray-200': variant === 'default',
          'border-2 border-primary-500': variant === 'outline',
          'p-4': size === 'sm',
          'p-6': size === 'md',
          'p-8': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;