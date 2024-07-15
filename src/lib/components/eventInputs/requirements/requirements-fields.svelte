
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithGameRequirements, checkIfGameRequirements } from "./game-requirements-fields.svelte";
  import { setFlagSchema } from "$lib/components/eventInputs/flags/set-flags.svelte";

  const requires = objWithGameRequirements.extend({
      flags: setFlagSchema,
    });

	export const objWithRequirements = z.object({
		requires: requires,
	});

  type Requirements = z.infer<typeof requires>;
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
	import GameRequirementsForm from "./game-requirements-fields.svelte";
	import SetFlags from "../flags/set-flags.svelte";

  export let form;
  export let context = "event";

  const { form: formData } = form;
</script>

<div class="space-y-6">
  <Form.Field {form} name="flags">
    <Form.Control let:attrs>
      <Form.Label>Flags required</Form.Label><br>
      <SetFlags bind:setFlags={$formData.requires.flags} />
    </Form.Control>
    <Form.Description>
      Any flags that must be set for this {context} to be available.
    </Form.Description>
    <Form.FormFieldErrors />
  </Form.Field>

  <GameRequirementsForm {form} {context} />
</div>