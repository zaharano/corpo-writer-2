<script lang="ts" context="module">
	import { z } from "zod";

  export const gameVFXFormSchema = z.object({
    typeSpeed: z.coerce.number().int().min(1).max(100).optional(),
    tracker: z.boolean().optional(),
    enhancedTracker: z.boolean().optional(),
    flicker: z.boolean().optional(),
    corruption: z.boolean().optional(),
    ghost: z.boolean().optional(),
  })
</script>

<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
	import { Switch } from "$lib/components/ui/switch";

  export let form;

  const { form: formData } = form;
</script>


<div class="space-y-6">
  <Form.Field {form} name="typeSpeed">
    <Form.Control let:attrs>
      <Form.Label>Type Speed</Form.Label>
      <Input placeholder="1" {...attrs} bind:value={$formData.effects.gameEffects.VFX.typeSpeed} />
    </Form.Control>
    <Form.Description>
      Alter speed at which the text is typed out.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="tracker">
    <Form.Control let:attrs>
      <Form.Label>Tracker</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.effects.gameEffects.VFX.tracker}
      />
    </Form.Control>
    <Form.Description>
      Toggle the tracker on or off.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="enhancedTracker">
    <Form.Control let:attrs>
      <Form.Label>Enhanced Tracker</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.effects.gameEffects.VFX.enhancedTracker}
      />
    </Form.Control>
    <Form.Description>
      Toggle the enhanced tracker on or off.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="flicker">
    <Form.Control let:attrs>
      <Form.Label>Flicker</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.effects.gameEffects.VFX.flicker}
      />
    </Form.Control>
    <Form.Description>
      Toggle the flicker effect on or off.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="corruption">
    <Form.Control let:attrs>
      <Form.Label>Corruption</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.effects.gameEffects.VFX.corruption}
      />
    </Form.Control>
    <Form.Description>
      Toggle the corruption effect on or off.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="ghost">
    <Form.Control let:attrs>
      <Form.Label>Ghost</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.effects.gameEffects.VFX.ghost}
      />
    </Form.Control>
    <Form.Description>
      Toggle the ghost effect on or off.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>
</div>

<!-- <SuperDebug data={$formData} /> -->
