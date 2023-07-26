import { Slot, component$ } from '@builder.io/qwik';
import {
  TabList as HeadlessTabList,
  type TabListProps as HeadlessTabListProps
} from '@qwik-ui/headless';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TabListProps extends HeadlessTabListProps {}

export const TabList = component$((props: TabListProps) => {
  return (
    <HeadlessTabList {...props}>
      <Slot />
    </HeadlessTabList>
  );
});
