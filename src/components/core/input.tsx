import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils/shacn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full focus:border-primary rounded-md border border-primary-foreground bg-background px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 !outline-none',
          className,
          isError && '!border-red-500 !text-red-500 placeholder:text-red-500',
        )}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
