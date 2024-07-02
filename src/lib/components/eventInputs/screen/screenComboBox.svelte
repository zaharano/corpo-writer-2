<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";

  import { currentEvent } from "$lib/stores/eventStore";
	import NewThingDialog from "../event/new-thing-dialog.svelte";
 
  let screens = currentEvent.allSimplifiedScreens();
  currentEvent.subscribe((_) => {
    screens = currentEvent.allSimplifiedScreens();
  });
 
  let open = false;
  export let value = "";
 
  $: selectedValue =
    screens.find((f) => f.id === value)?.name ??
    "Select next screen...";
 
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
  <Popover.Content class="w-full p-0">
    <Command.Root filter={(value, search) => {
      const item = screens.find(item => item.id === value)
       if (!item) return 0
       if (item.name.toLowerCase().includes(search.toLowerCase()))
         return 1
       return 0
     }}>
      <Command.Input placeholder="Search screens..." />
      <Command.Empty><NewThingDialog purpose='stubScreen' /></Command.Empty>
      <Command.Group>
        {#each screens as screen}
          <Command.Item
            value={screen.id}
            onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                value !== screen.id && "text-transparent"
              )}
            />
            {screen.name}
          </Command.Item>
        {/each}
      </Command.Group>
      <Command.Separator />
      <Command.Group>
        <NewThingDialog purpose='stubScreen' />
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>