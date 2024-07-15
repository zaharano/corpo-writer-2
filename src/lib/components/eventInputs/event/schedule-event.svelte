<script lang="ts" context="module">
	import { z } from "zod";

  export const eventRefSchema = z.string().uuid().superRefine((obj, ctx) => {
    // rewrite this to check that event exists.
    if (false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Event must exist",
      })
    }
  })

  export const addEventSchema = z.object({
    id: eventRefSchema,
    time: z.coerce.number().int().min(1, "Time must be greater than zero").max(50, "Time must be less than or eqal to 50"),
  })

  export const eventListSchema = z.array(eventRefSchema)
</script>

<script lang="ts">
  // LTTODO - this is largely a copy of the setFlags component. It should be refactored to be a shared component.
  // Perhaps just the 'selected line items' should be their own things given the different data needed for each
  import ComboBox from "$lib/components/eventInputs/comboBox.svelte";
	import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";

	import { CircleXIcon } from "lucide-svelte";

  import { eventStore } from "$lib/stores";

	import type { ID } from "$lib/classes/eventClasses";
	import { Separator } from "$lib/components/ui/separator";
	import { slide } from 'svelte/transition';

  type AddEventType = {
    id: ID;
    time: number;
  } // z.infer does not produce formatted uuid string type
  

  export let scheduledEvents: AddEventType[];

  let eventToAdd: ID | undefined = undefined;
  $: eventToAdd && addEvent(eventToAdd);

  function addEvent(add: ID) {
    scheduledEvents = [...scheduledEvents, { id: add, time: 1 }];
    eventToAdd = undefined;
  }

  $: eventOptions = $eventStore.map((e) => {return {id: e.id, title: e.meta.title}}).filter(e => !scheduledEvents.map(e => e.id).includes(e.id));

</script>

<ComboBox bind:value={eventToAdd} purpose='event' targets={eventOptions}/>
{#if scheduledEvents.length > 0}
  <div transition:slide>
    {#each scheduledEvents as event, i (event.id)}
      {#if i > 0}
        <Separator />
      {/if}
      <div transition:slide class='flex items-center gap-x-4'>
        <span class='flex-grow text-sm font-medium leading-none'>{eventStore.getEventTitle(event.id)}</span>
        <span class='flex items-center gap-2'><Label>Time</Label>Number input here.</span>
        <Button size='icon' variant='ghost' on:click={() => scheduledEvents = scheduledEvents.filter(e => e.id !== event.id)}><CircleXIcon /></Button>
      </div>
    {/each}
  </div>

{/if}