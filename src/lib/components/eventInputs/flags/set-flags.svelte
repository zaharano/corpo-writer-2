<script lang='ts' context='module'>
  import { z } from 'zod';

  export const setFlagSchema = z.array(z.object({
    id: z.string(),
    value: z.boolean(),
  }));
</script>

<script lang="ts">  
  import ComboBox from "$lib/components/eventInputs/comboBox.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Switch } from "$lib/components/ui/switch";
  import { Label } from "$lib/components/ui/label";

	import { CircleXIcon } from "lucide-svelte";

  import { flagStore } from "$lib/stores";

	import type { ID, SetFlag } from "$lib/classes/eventClasses";
	import { Separator } from "$lib/components/ui/separator";

  export let setFlags: SetFlag[];

  let addedFlag: ID | undefined = undefined;
  $: addedFlag && addFlag(addedFlag);

  function addFlag(add: ID) {
    setFlags = [...setFlags, { id: add, value: true }];
    addedFlag = undefined;
  }

  // TODO: keep flags in combobox synced with the store
</script>

<ComboBox bind:value={addedFlag} purpose='flag' targets={flagStore.allSimplifiedFlags()}/>
{#if setFlags.length > 0}
  {#each setFlags as flag, i}
    {#if i > 0}
      <Separator />
    {/if}
    <div class='flex items-center gap-x-4'>
      <span class='flex-grow text-sm font-medium leading-none'>{flagStore.getFlagTitle(flag.id)}</span>
      <span class='flex items-center gap-2'><Label>True?</Label> <Switch bind:checked={setFlags[i].value} /></span>
      <Button size='icon' variant='ghost' on:click={() => setFlags = setFlags.filter(f => f.id !== flag.id)}><CircleXIcon /></Button>
    </div>
  {/each}
{/if}