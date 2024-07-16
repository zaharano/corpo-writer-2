<script lang="ts">
  // LTTODO - this is largely a copy component. It should be refactored to be a shared component.
  // Perhaps just the 'selected line items' should be their own things given the different data needed for each
  import ComboBox from "$lib/components/eventInputs/comboBox.svelte";
	import { Button } from "$lib/components/ui/button";

	import { CircleXIcon } from "lucide-svelte";

  import { eventStore } from "$lib/stores";

	import type { ID } from "$lib/classes/eventClasses";
	import { Separator } from "$lib/components/ui/separator";
	import { slide } from 'svelte/transition';

  export let value: ID[]

  let eventToAdd: ID | undefined = undefined;
  $: eventToAdd && addEvent(eventToAdd);

  function addEvent(add: ID) {
    value = [...value, add];
    eventToAdd = undefined;
  }

  $: eventOptions = $eventStore.map((e) => {return {id: e.id, title: e.meta.title}}).filter(e => !value.includes(e.id));

</script>

<ComboBox bind:value={eventToAdd} purpose='event' targets={eventOptions}/>
{#if value.length > 0}
  <div transition:slide>
    {#each value as event, i (event)}
      {#if i > 0}
        <Separator />
      {/if}
      <div transition:slide class='flex items-center gap-x-4'>
        <span class='flex-grow text-sm font-medium leading-none'>{eventStore.getEventTitle(event)}</span>
        <Button size='icon' variant='ghost' on:click={() => value = value.filter(e => e !== event)}><CircleXIcon /></Button>
      </div>
    {/each}
  </div>

{/if}