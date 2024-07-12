<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";

	import NewThingDialog from "./event/new-thing-dialog.svelte";
 
  let open = false;
  export let value = "";
  export let targets: {id: string, title: string}[] = [];
  export let purpose: 'screen' | 'event' | 'flag' = "screen";
  // the below is a hack
  export let width: string = 'w-full';
 
  $: selectedValue =
    targets.find((f) => f.id === value)?.title ??
    `Select a ${purpose}...`;
 
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>
 
<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-full justify-between"
    >
      {selectedValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class={`${width} max-w-[42rem] p-0`}>
    <Command.Root filter={(value, search) => {
      const item = targets.find(item => item.id === value)
       if (!item) return 0
       if (item.title.toLowerCase().includes(search.toLowerCase()))
         return 1
       return 0
     }}>
      <Command.Input placeholder={`Search ${purpose}s...`} />
      <Command.Empty class="text-left p-1"><NewThingDialog {purpose} stub/></Command.Empty>
      <Command.Group>
        {#each targets as target}
          <Command.Item
            value={target.id}
            onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                value !== target.id && "text-transparent"
              )}
            />
            {target.title}
          </Command.Item>
        {/each}
      </Command.Group>
      <Command.Separator />
      <Command.Group>
        <NewThingDialog {purpose} stub />
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>