<script lang="ts" context="module">
	import { z } from "zod";
  import { gameVFXFormSchema } from "$lib/components/eventInputs/effects/vfx-fields.svelte";

  export const gameEffectsFormSchema = z.object({
    performance: z.coerce.number().int().min(-100).max(100).default(0).optional(),
    time: z.coerce.number().int().min(0).max(100).default(0).optional(),
    newEnemy: z.string().optional(),
    newDepartment: z.string().optional(),
    promotion: z.string().optional(),
    demotion: z.string().optional(),
    VFX: gameVFXFormSchema.optional(),
  })
</script>

<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import VFXFields from "./vfx-fields.svelte";

  export let form;

  const { form: formData } = form;
</script>

<div class="space-y-6">
  <Form.Field {form} name="performance">
    <Form.Control let:attrs>
      <Form.Label>Performance</Form.Label>
      <Input placeholder="0" {...attrs} bind:value={$formData.effects.gameEffects.performance} />
    </Form.Control>
    <Form.Description>
      Alter the player's current job performance rating. Job performance is a value between 0 and 100. A higher value is better. If the player's job performance hits 0, they will be fired (game over). If it reaches 100, they will be promoted.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="time">
    <Form.Control let:attrs>
      <Form.Label>Time</Form.Label>
      <Input {...attrs} bind:value={$formData.effects.gameEffects.time} />
    </Form.Control>
    <Form.Description>
      Set to simulate the player spending extra time on a task or needing to wait longer for a result. Every 10 units of 'time' are a year. Every option selected adds 1 unit of time by default, replaced by this value if set.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="newEnemy">
    <Form.Control let:attrs>
      <Form.Label>New Enemy</Form.Label>
      <Input placeholder="New Enemy" {...attrs} bind:value={$formData.effects.gameEffects.newEnemy} />
    </Form.Control>
    <Form.Description>
      Adds a new enemy for the player. Enemies will be used by certain events to flavor the conflict, but otherwise have no effect. Enter the enemy or enter 'auto' to have a random name generated at runtime.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="newDepartment">
    <Form.Control let:attrs>
      <Form.Label>New Department</Form.Label>
      <Input placeholder="New Department" {...attrs} bind:value={$formData.effects.gameEffects.newDepartment} />
    </Form.Control>
    <Form.Description>
      Places the player in a new Department at Megacorp. Departments are just flavor text and have no effect. Enter 'auto' to have a random new department generated at runtime.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="promotion">
    <Form.Control let:attrs>
      <Form.Label>Promotion</Form.Label>
      <Input placeholder="Promotion" {...attrs} bind:value={$formData.effects.gameEffects.promotion} />
    </Form.Control>
    <Form.Description>
      The player is promoted immediately. The string entered here will be displayed as an alert to the player.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="demotion">
    <Form.Control let:attrs>
      <Form.Label>Demotion</Form.Label>
      <Input placeholder="Demotion" {...attrs} bind:value={$formData.effects.gameEffects.demotion} />
    </Form.Control>
    <Form.Description>
      The player is demoted immediately. The string entered here will be displayed as an alert to the player.
    </Form.Description>
  </Form.Field>

  <VFXFields {form} />
</div>