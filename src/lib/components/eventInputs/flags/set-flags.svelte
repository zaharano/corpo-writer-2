<script lang='ts' context='module'>
  import { z } from 'zod';

  export const setFlagSchema = z.array(z.object({
    id: z.string().uuid(),
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
	import { slide } from 'svelte/transition';

  export let setFlags: SetFlag[];

  let addedFlag: ID | undefined = undefined;
  $: addedFlag && addFlag(addedFlag);

  function addFlag(add: ID) {
    setFlags = [...setFlags, { id: add, value: true }];
    addedFlag = undefined;
  }

  $: flagOptions = $flagStore.map((f) => {return {id: f.id, title: f.title}}).filter(f => !setFlags.map(f => f.id).includes(f.id));

</script>

<ComboBox bind:value={addedFlag} purpose='flag' targets={flagOptions}/>
{#if setFlags.length > 0}
  <div transition:slide>
    {#each setFlags as flag, i (flag.id)}
      {#if i > 0}
        <Separator />
      {/if}
      <div transition:slide class='flex items-center gap-x-4'>
        <span class='flex-grow text-sm font-medium leading-none'>{flagStore.getFlagTitle(flag.id)}</span>
        <span class='flex items-center gap-2'><Label>True?</Label> <Switch bind:checked={setFlags[i].value} /></span>
        <Button size='icon' variant='ghost' on:click={() => setFlags = setFlags.filter(f => f.id !== flag.id)}><CircleXIcon /></Button>
      </div>
    {/each}
  </div>

{/if}