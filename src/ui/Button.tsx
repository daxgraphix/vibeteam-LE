import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          `btn-${variant}`,
          size === 'sm' && 'px-3 py-2 text-sm',
          size === 'md' && 'px-4 py-2.5',
          size === 'lg' && 'px-6 py-3 text-lg',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';