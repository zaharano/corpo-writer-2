<script lang="ts" context="module">
	import { z } from "zod";

  export const setFlagSchema = z.object({
    id: z.string(),
    value: z.boolean(),
  });

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

  const addEventSchema = z.object({
    event: z.string(),
    time: z.coerce.number().int().min(0).max(50),
  }).superRefine((obj, ctx) => {
    // rewrite this to check that event exists.
    if (obj.event === "schedule" && obj.time === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Time must be greater than 0",
      })
    }
  })

  const eventListSchema = z.array(z.string()).superRefine((obj, ctx) => {
    // rewrite to check that all events exist
    if (false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Attempting to lock/unlock an event that doesn't exist",
      })
    }
  })
  
  const scheduleEventSchema = z.array(addEventSchema)

  const eventChangeSchema = z.object({
    schedule: scheduleEventSchema.optional(),
    lock: eventListSchema.optional(),
    unlock: eventListSchema.optional(),
  })

  export const effectsFormSchema = z.object({
    setFlags: z.array(z.string()).optional(),
    editEvents: eventChangeSchema.optional(),
  }).merge(gameEffectsFormSchema)
</script>

<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Separator } from "$lib/components/ui/separator/index";
	import { Button } from "$lib/components/ui/button";

  export let form;

  const { form: formData } = form;
</script>

<Form.Field {form} name="addFlags">
  <Form.Control let:attrs>
    <Form.Label>Add Flags</Form.Label>
    <Input placeholder="flag1, flag2, flag3" {...attrs} bind:value={$formData.effects.addFlags} />
  </Form.Control>
  <Form.Description>
    Selecting this option will add these flags. Separate flags with commas.
  </Form.Description>
</Form.Field>

<Form.Field {form} name="removeFlags">
  <Form.Control let:attrs>
    <Form.Label>Remove Flags</Form.Label>
    <Input placeholder="flag1, flag2, flag3" {...attrs} bind:value={$formData.effects.removeFlags} />
  </Form.Control>
  <Form.Description>
    Selecting this option will remove these flags. Separate flags with commas.
  </Form.Description>
</Form.Field>

<Separator />

<!-- schedule events
remove from schedule (less important rn)
lock event (remove from pool by ID)
unlock event (add to pool by ID) -->

{#each $formData.effects.editEvents.schedule as event, i}
  <Form.Field {form} name="event">
    <Form.Control let:attrs>
      <Form.Label>Event</Form.Label>
      <Input placeholder="event1" {...attrs} bind:value={event.event} />
    </Form.Control>
    <Form.Description>
      Select the event to schedule. THIS MUST BECOME AN EVENT COMBOBOX.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="time">
    <Form.Control let:attrs>
      <Form.Label>Time</Form.Label>
      <Input type="number" placeholder="1" {...attrs} bind:value={event.time} />
    </Form.Control>
    <Form.Description>
      Select number of turns in the future the event is to be scheduled for (setting to 1 will attempt to schedule the event for the next turn). If there is already an event scheduled for the specified time, the event with higher priority will retain that time slot and the other will be rescheduled for the next available time.
    </Form.Description>
  </Form.Field>

  <Button on:click={() => $formData.effects.editEvents.schedule.splice(i, 1)}>Remove</Button>

  <Separator />
{/each}
<Button on:click={() => $formData.effects.editEvents.schedule.push({ event: "", time: 0 })}>Add Event</Button>

<Separator />

<Form.Field {form} name="lock">
  <Form.Control let:attrs>
    <Form.Label>Lock Event</Form.Label>
    <Input placeholder="event1" {...attrs} bind:value={$formData.effects.editEvents.lock} />
  </Form.Control>
  <Form.Description>
    Select the event to lock. THIS MUST BECOME AN EVENT COMBOBOX.
  </Form.Description>
</Form.Field>

<Form.Field {form} name="unlock">
  <Form.Control let:attrs>
    <Form.Label>Unlock Event</Form.Label>
    <Input placeholder="event1" {...attrs} bind:value={$formData.effects.editEvents.unlock} />
  </Form.Control>
  <Form.Description>
    Select the event to unlock. THIS MUST BECOME AN EVENT COMBOBOX.
  </Form.Description>
</Form.Field>

<!-- add event stuff -->
 <!-- make subforms work off {form} prop -->