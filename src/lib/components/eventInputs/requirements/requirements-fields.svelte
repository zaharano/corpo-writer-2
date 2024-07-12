
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

  // this type Requirements isn't working because of schema vs class differences
  export function checkIfRequirements(obj: Requirements | undefined) {
    if (!obj) return false;
    return obj.flags.length > 0 || checkIfGameRequirements(obj.gameReqs);
  }
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
	import GameRequirementsForm from "./game-requirements-fields.svelte";
	import SetFlags from "../flags/set-flags.svelte";

  export let form;
  export let context = "event";

  const { form: formData } = form;

  $: console.log($formData.requires.flags);
</script>

<Form.Field {form} name="flags">
  <Form.Control let:attrs>
    <Form.Label>Flags</Form.Label><br>
    <SetFlags bind:setFlags={$formData.requires.flags} />
  </Form.Control>
  <Form.Description>
    Any flags that must be set for this {context} to be available.
  </Form.Description>
  <Form.FormFieldErrors />
</Form.Field>

<GameRequirementsForm {form} {context} />