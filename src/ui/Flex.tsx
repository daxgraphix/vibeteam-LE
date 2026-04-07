import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '../utils';

interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      xs: 'h-2',
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
      xl: 'h-12',
      '2xl': 'h-16',
    };

    return <div ref={ref} className={cn(sizeClasses[size], className)} {...props} />;
  }
);

Spacer.displayName = 'Spacer';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  children: ReactNode;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction = 'row', align = 'center', justify = 'start', gap = 'md', wrap = false, children, ...props }, ref) => {
    const directionClasses = direction === 'row' ? 'flex-row' : 'flex-col';
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };
    const gapClasses = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses,
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';