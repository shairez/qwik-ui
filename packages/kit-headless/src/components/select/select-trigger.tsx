import { component$, type PropsOf, useContext, sync$, $, Slot } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { getNextEnabledOptionIndex, getPrevEnabledOptionIndex } from './utils';
export type OpenKeys = 'ArrowUp' | 'Enter' | 'Space' | 'ArrowDown';

type SelectTriggerProps = PropsOf<'button'>;
export const SelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);
  const openKeys = ['ArrowUp', 'ArrowDown'];
  const closedKeys = [`Escape`];

  // Both the space and enter keys run with handleClick$
  const handleClick$ = $(() => {
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageDown', 'PageUp'];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $((e: KeyboardEvent) => {
    const shouldOpen = !context.isListboxOpenSig.value && openKeys.includes(e.key);
    const shouldClose = context.isListboxOpenSig.value && closedKeys.includes(e.key);
    if (!context.options) return;

    if (shouldOpen) {
      context.isListboxOpenSig.value = true;
    }

    if (shouldClose) {
      context.isListboxOpenSig.value = false;
    }

    if (e.key === 'Home') {
      context.highlightedIndexSig.value = getNextEnabledOptionIndex(-1, context.options);
    }

    if (e.key === 'End') {
      const lastEnabledOptionIndex = getPrevEnabledOptionIndex(
        context.options.length,
        context.options,
      );
      context.highlightedIndexSig.value = lastEnabledOptionIndex;
    }

    /** When initially opening the listbox, we want to grab the first enabled option index */
    if (context.highlightedIndexSig.value === null) {
      context.highlightedIndexSig.value = getNextEnabledOptionIndex(-1, context.options);
      return;
    }

    if (context.isListboxOpenSig.value && !shouldOpen) {
      if (e.key === 'ArrowDown') {
        context.highlightedIndexSig.value = getNextEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context.options,
        );
      }

      if (e.key === 'ArrowUp') {
        context.highlightedIndexSig.value = getPrevEnabledOptionIndex(
          context.highlightedIndexSig.value,
          context.options,
        );
      }

      // select options
      if (e.key === 'Enter' || e.key === ' ') {
        context.selectedIndexSig.value = context.highlightedIndexSig.value;
      }
    }
  });

  return (
    <button
      {...props}
      ref={context.triggerRef}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      aria-expanded={context.isListboxOpenSig.value}
    >
      <Slot />
    </button>
  );
});
