<script lang="ts" context="module">
	import { z } from "zod";

  const gameVFXFormSchema = z.object({
    typeSpeed: z.coerce.number().int().min(1).max(100),
    tracker: z.boolean(),
    enhancedTracker: z.boolean(),
    flicker: z.boolean(),
    curruption: z.boolean(),
    ghost: z.boolean(),
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
    if (obj.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one event",
      })
    }
  })

  // TODO: low priority
  const removeFlagSchema = z.array(z.string()).superRefine((obj, ctx) => {
    // rewrite to check that all flags exist
    if (obj.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one flag",
      })
    }
  })
  
  const scheduleEventSchema = z.object({
    add: z.array(addEventSchema).optional(),
    remove: eventListSchema.optional(),
  })

  const eventChangeSchema = z.object({
    schedule: z.array(scheduleEventSchema).optional(),
    lock: eventListSchema.optional(),
    unlock: eventListSchema.optional(),
  })

  export const effectsFormSchema = z.object({
    addFlags: z.array(z.string().min(5).max(20)).optional(),
    removeFlags: removeFlagSchema.optional(),
    editEvents: eventChangeSchema.optional(),
  }).merge(gameEffectsFormSchema)
</script>

<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Separator } from "$lib/components/ui/separator/index";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { Option } from "$lib/classes/eventClasses";
	import ScreenComboBox from "../screen/screenComboBox.svelte";
	import type { Effects } from "$lib/classes/eventClasses";

  export let effects: Effects;

  const form = superForm( { ...effects }, {
    dataType: 'json',
    validators: zodClient(effectsFormSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-4" id="effects-form" use:enhance on:change={() => {}}>
  <Form.Field {form} name="addFlags">
    <Form.Control let:attrs>
      <Form.Label>Add Flags</Form.Label>
      <Input placeholder="flag1, flag2, flag3" {...attrs} bind:value={$formData.addFlags} />
    </Form.Control>
    <Form.Description>
      Selecting this option will add these flags. Separate flags with commas.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="removeFlags">
    <Form.Control let:attrs>
      <Form.Label>Remove Flags</Form.Label>
      <Input placeholder="flag1, flag2, flag3" {...attrs} bind:value={$formData.removeFlags} />
    </Form.Control>
    <Form.Description>
      Selecting this option will remove these flags. Separate flags with commas.
    </Form.Description>
  </Form.Field>

  <Separator />

  <Form.Field {form} name="editEvents">
    <Form.Control let:attrs>
      <Form.Label>Edit Events</Form.Label>
      <Input placeholder="event1, event2, event3" {...attrs} bind:value={$formData.editEvents} />
    </Form.Control>
    <Form.Description>
      Edit events in the game.
    </Form.Description>
  </Form.Field>
</form>

<!-- add event stuff -->