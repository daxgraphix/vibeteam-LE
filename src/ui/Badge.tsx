import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('badge', `badge-${variant}`, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';