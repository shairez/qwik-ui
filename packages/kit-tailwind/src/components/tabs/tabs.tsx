import { component$, Slot } from '@builder.io/qwik';
import {
  Tabs as HeadlessTabs,
  type TabsProps as HeadlessTabsProps
} from '@qwik-ui/headless';

interface TabsProps extends HeadlessTabsProps {
  boxed?: boolean;
}

export const Tabs = component$(({ boxed = false, ...props }: TabsProps) => {
  return (
    <HeadlessTabs
      class={`
      
      tabs ${boxed ? 'tabs-boxed' : ''}`}
      {...props}
    >
      <Slot />
    </HeadlessTabs>
  );
});
