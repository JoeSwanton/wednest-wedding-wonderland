
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
  'aria-label'?: string;
}

export function Loading({ 
  size = 'md', 
  className, 
  text, 
  variant = 'spinner',
  'aria-label': ariaLabel = 'Loading content'
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (variant === 'dots') {
    return (
      <div 
        className={cn('flex items-center justify-center p-8', className)}
        role="status"
        aria-label={ariaLabel}
      >
        <div className="flex space-x-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full bg-theme-brown animate-bounce',
                size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        {text && (
          <p className={cn('ml-3 text-theme-brown', textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div 
        className={cn('flex items-center justify-center p-8', className)}
        role="status"
        aria-label={ariaLabel}
      >
        <div className="flex flex-col items-center space-y-3">
          <div 
            className={cn(
              'rounded-full bg-theme-brown animate-pulse',
              sizeClasses[size]
            )}
            aria-hidden="true"
          />
          {text && (
            <p className={cn('text-theme-brown', textSizeClasses[size])}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn('flex items-center justify-center p-8', className)}
      role="status"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col items-center space-y-2">
        <Loader2 
          className={cn('animate-spin text-theme-brown', sizeClasses[size])} 
          aria-hidden="true"
        />
        {text && (
          <p className={cn('text-theme-brown', textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

// Skeleton loading component for content placeholders
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200',
        className
      )}
      role="status"
      aria-label="Loading content"
      {...props}
    />
  );
}

// Page loading component
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="lg" text="Loading..." aria-label="Loading page content" />
    </div>
  );
}
