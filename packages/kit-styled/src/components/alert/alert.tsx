import { component$, Slot, PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      look: {
        neutral: 'bg-background text-foreground',
        alert: 'border-alert/60 text-alert [&>svg]:text-alert',
        primary: 'border-primary',
        secondary: 'border-secondary',
      },
    },
    defaultVariants: {
      look: 'neutral',
    },
  },
);

type AlertProps = PropsOf<'div'> & VariantProps<typeof alertVariants>;

const Alert = component$<AlertProps>(({ look, ...props }) => {
  return (
    <div {...props} role="alert" class={cn(alertVariants({ look }), props.class)}>
      <Slot />
    </div>
  );
});

const AlertTitle = component$<PropsOf<'h5'>>(({ ...props }) => {
  return (
    <h5
      {...props}
      class={cn('mb-1 font-medium leading-none tracking-tight', props.class)}
    >
      <Slot />
    </h5>
  );
});

const AlertDescription = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div {...props} class={cn('text-sm [&_p]:leading-relaxed', props.class)}>
      <Slot />
    </div>
  );
});

export { Alert, AlertTitle, AlertDescription };
