
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithGameRequirements } from "./game-requirements-form.svelte";

	export const objWithRequirements = z.object({
		requires: objWithGameRequirements.extend({
      flags: z.record(z.string(), z.boolean()),
    }),
	});

	export type ObjWithRequirements = typeof objWithRequirements;
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import {Input} from "$lib/components/ui/input/index.js";
	import { Description } from "formsnap";
  import type { SuperForm } from "sveltekit-superforms";


  export let form: SuperForm<ObjWithRequirements>;

  const { form: formData } = form;
</script>

<Form.Field {form} name="minLevel">
  <Form.Control let:attrs>
    <Form.Label>Min Level</Form.Label>
    <Input type="number" {...attrs} bind:value={$formData.requires.gameReqs.minLevel}/>
  </Form.Control>
  <Form.Description>
    <Description>Minimum player level required to access this event</Description>
  </Form.Description>
  <Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="maxLevel">
  <Form.Control let:attrs>
    <Form.Label>Max Level</Form.Label>
    <Input type="number" {...attrs} bind:value={$formData.requires.gameReqs.maxLevel}/>
  </Form.Control>
  <Form.Description>
    <Description>Maximum player level required to access this event</Description>
  </Form.Description>
  <Form.FieldErrors />
</Form.Field>