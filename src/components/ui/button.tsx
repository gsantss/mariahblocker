import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva('app-button', {
  variants: {
    variant: {
      primary: 'app-button--primary',
      outline: 'app-button--outline',
      danger: 'app-button--danger',
      ghost: 'app-button--ghost',
      ice: 'app-button--ice',
    },
    size: { default: 'app-button--md', sm: 'app-button--sm', lg: 'app-button--lg' },
  },
  defaultVariants: { variant: 'primary', size: 'default' },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
});
