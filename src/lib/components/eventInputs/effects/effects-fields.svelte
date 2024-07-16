<script lang="ts" context="module">
	import { z } from "zod";
  import SetFlags, { setFlagSchema } from "$lib/components/eventInputs/flags/set-flags.svelte";
  import { addEventSchema, eventListSchema } from "$lib/components/eventInputs/event/schedule-event.svelte";
  import { gameEffectsFormSchema } from "$lib/components/eventInputs/effects/game-effects-fields.svelte";
  
  const eventChangeSchema = z.object({
    schedule: z.array(addEventSchema).optional(),
    lock: eventListSchema.optional(),
    unlock: eventListSchema.optional(),
  })

  export const effectsFormSchema = z.object({
    setFlags: setFlagSchema.optional(),
    editEvents: eventChangeSchema.optional(),
    gameEffects: gameEffectsFormSchema.optional(),
  });
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Separator } from "$lib/components/ui/separator/index";
	import ScheduleEvent from "../event/schedule-event.svelte";
	import GameEffectsFields from "./game-effects-fields.svelte";
	import SelectEvents from "../event/select-events.svelte";

  export let form;

  const { form: formData } = form;
</script>

<div class="space-y-6">
  <Form.Field {form} name="setFlags">
    <Form.Control let:attrs>
      <Form.Label>Flags to set</Form.Label><br>
      <SetFlags bind:setFlags={$formData.effects.setFlags} />
    </Form.Control>
    <Form.Description>
      Any flags that this are set as part of this set of effects.
    </Form.Description>
    <Form.FormFieldErrors />
  </Form.Field>

  <Separator />

  <Form.Field {form} name="schedule">
    <Form.Control let:attrs>
      <Form.Label>Schedule Events</Form.Label>
      <ScheduleEvent bind:selectedEvents={$formData.effects.editEvents.schedule} />
    </Form.Control>
    <Form.Description>
      Add specific events to the schedule. The time is the number of other events the player will see before the scheduled event (setting to 1 will attempt to schedule the event next). If there is already an event scheduled for the specified time, the event with higher priority will take that time slot and the other will be rescheduled for the next available time.
    </Form.Description>
  </Form.Field>

  <Separator />

  <Form.Field {form} name="unlock">
    <Form.Control let:attrs>
      <Form.Label>Unlock Event</Form.Label>
      <SelectEvents {...attrs} bind:value={$formData.effects.editEvents.unlock} />
    </Form.Control>
    <Form.Description>
      Unlocked events will be added to the event pool if they are not already there, making them available for random selection.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="lock">
    <Form.Control let:attrs>
      <Form.Label>Lock Event</Form.Label>
      <SelectEvents {...attrs} bind:value={$formData.effects.editEvents.lock} />
    </Form.Control>
    <Form.Description>
      Locked events will be removed from the event pool if they are present, making them unavailable for random selection.
    </Form.Description>
  </Form.Field>

  <Separator />

  <GameEffectsFields {form} />
</div>