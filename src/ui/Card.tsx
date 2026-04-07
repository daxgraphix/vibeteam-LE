import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === 'default' && 'card',
          variant === 'elevated' && 'card-elevated',
          variant === 'interactive' && 'card hover:cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';