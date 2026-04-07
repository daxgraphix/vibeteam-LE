import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', center = true, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          center && 'mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';