import { component$, useSignal } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);

  return (
    <Select class="relative min-w-40">
      <p>This one is the disabled</p>
      <SelectTrigger class="w-full border-2 border-dashed border-red-400">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectListbox class="absolute w-full border-2 border-dashed border-green-400 bg-slate-900 p-2">
        {usersSig.value.map((user, index) => (
          <SelectOption
            class="border-dashed border-blue-400 data-[highlighted]:border-2 data-[disabled]:bg-slate-600 data-[disabled]:opacity-30"
            key={user}
            disabled={index === 0 || index === usersSig.value.length - 1 ? true : false}
          >
            {user}
          </SelectOption>
        ))}
      </SelectListbox>
    </Select>
  );
});
