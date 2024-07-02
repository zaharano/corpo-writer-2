
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithGameRequirements, checkIfGameRequirements } from "./game-requirements-fields.svelte";

  const requires = objWithGameRequirements.extend({
      flags: z.array(z.string()),
    });

	export const objWithRequirements = z.object({
		requires: requires,
	});

  type Requirements = z.infer<typeof requires>;

  export function checkIfRequirements(obj: Requirements | undefined) {
    if (!obj) return false;
    return obj.flags.length > 0 || checkIfGameRequirements(obj.gameReqs);
  }
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
	import Heading from "../../ui/typography/heading.svelte";
	import GameRequirementsForm from "./game-requirements-fields.svelte";

  export let form
  export let context = "event";

  const { form: formData } = form;
</script>

<div>
  <Heading level={4}>Requirements</Heading>
  <p class="text-sm text-muted-foreground">Does this event have requirements to be available?</p>
</div>

<GameRequirementsForm {form} context={context} />

<!-- ComboBox of allFlags, no option to add -->