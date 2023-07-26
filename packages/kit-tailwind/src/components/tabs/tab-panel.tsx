import { component$, Slot } from '@builder.io/qwik';
import {
  TabPanel as HeadlessTabPanel,
  type TabPanelProps as HeadlessTabPanelProps
} from '@qwik-ui/headless';

export type TabPanelProps = HeadlessTabPanelProps;

export const TabPanel = component$(({ ...props }: TabPanelProps) => {
  return (
    <HeadlessTabPanel {...props} class={``}>
      <Slot />
    </HeadlessTabPanel>
  );
});
