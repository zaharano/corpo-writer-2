<script lang="ts" context="module">
	import { z } from "zod";
  import SetFlags, { setFlagSchema } from "$lib/components/eventInputs/flags/set-flags.svelte";
  import { addEventSchema, eventListSchema } from "$lib/components/eventInputs/event/schedule-event.svelte";

  const gameVFXFormSchema = z.object({
    typeSpeed: z.coerce.number().int().min(1).max(100).optional(),
    tracker: z.boolean().optional(),
    enhancedTracker: z.boolean().optional(),
    flicker: z.boolean().optional(),
    corruption: z.boolean().optional(),
    ghost: z.boolean().optional(),
  })

  const gameEffectsFormSchema = gameVFXFormSchema.extend({
    performance: z.coerce.number().int().min(-100).max(100).default(0).optional(),
    time: z.coerce.number().int().min(0).max(100).default(0).optional(),
    newEnemy: z.string().optional(),
    newDepartment: z.string().optional(),
    promotion: z.string().optional(),
    demotion: z.string().optional(),
  })
  
  const eventChangeSchema = z.object({
    schedule: z.array(addEventSchema).optional(),
    lock: eventListSchema.optional(),
    unlock: eventListSchema.optional(),
  })

  export const effectsFormSchema = z.object({
    setFlags: setFlagSchema.optional(),
    editEvents: eventChangeSchema.optional(),
  }).merge(gameEffectsFormSchema)
</script>

<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Separator } from "$lib/components/ui/separator/index";
	import { Button } from "$lib/components/ui/button";
	import ScheduleEvent from "../event/schedule-event.svelte";

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

  <!-- schedule events
  remove from schedule (less important rn)
  lock event (remove from pool by ID)
  unlock event (add to pool by ID) -->

  <Form.Field {form} name="schedule">
    <Form.Control let:attrs>
      <Form.Label>Schedule Events</Form.Label>
      <ScheduleEvent bind:scheduledEvents={$formData.effects.editEvents.schedule} />
    </Form.Control>
    <Form.Description>
      Add specific events to the schedule. The time is the number of other events the player will see before the scheduled event (setting to 1 will attempt to schedule the event next). If there is already an event scheduled for the specified time, the event with higher priority will take that time slot and the other will be rescheduled for the next available time.
    </Form.Description>
  </Form.Field>

  <Separator />

  <Form.Field {form} name="unlock">
    <Form.Control let:attrs>
      <Form.Label>Unlock Event</Form.Label>
      <Input placeholder="event1" {...attrs} bind:value={$formData.effects.editEvents.unlock} />
    </Form.Control>
    <Form.Description>
      Select the event to unlock. THIS MUST BECOME AN EVENT COMBOBOX.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="lock">
    <Form.Control let:attrs>
      <Form.Label>Lock Event</Form.Label>
      <Input placeholder="event1" {...attrs} bind:value={$formData.effects.editEvents.lock} />
    </Form.Control>
    <Form.Description>
      Select the event to lock. THIS MUST BECOME AN EVENT COMBOBOX.
    </Form.Description>
  </Form.Field>
</div>