
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithGameRequirements, checkIfGameRequirements } from "./game-requirements-fields.svelte";
  import { setFlagSchema } from "$lib/components/eventInputs/effects/effects-fields.svelte";

  const requires = objWithGameRequirements.extend({
      flags: z.array(setFlagSchema),
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

  export let form
  export let context = "event";

  const { form: formData } = form;
</script>

<!-- <Form.Field {form} name="flags">
  <Form.Control let:attrs>
    <Form.Label>Flags</Form.Label>
    <Form.Description>Any flags that must be set for this {context} to be available.</Form.Description>
      <input type="text" {...attrs} bind:value={$formData.requires.flags} />
    </Form.Field>
  </Form.Control>
  <Form.FieldErrors />
</Form.Field> -->

<GameRequirementsForm {form} context={context} />

<!-- ComboBox of allFlags, no option to add -->