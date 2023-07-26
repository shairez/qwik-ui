import { Slot, component$ } from '@builder.io/qwik';
import { Tab as HeadlessTab, type TabProps as HeadlessTabProps } from '@qwik-ui/headless';

export type TabProps = {
  isLifted?: boolean;
  isBordered?: boolean;
} & HeadlessTabProps;

export const Tab = component$(({ isBordered, isLifted, ...props }: TabProps) => {
  return (
    <HeadlessTab
      class={`  
      tab ${isBordered ? 'tab-bordered' : ''} ${isLifted ? 'tab-lifted' : ''}`}
      selectedClassName="tab-active"
      {...props}
    >
      <Slot />
    </HeadlessTab>
  );
});
