
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithGameRequirements } from "./game-requirements-form.svelte";

  const requires = objWithGameRequirements.extend({
      flags: z.array(z.string()),
    });

	export const objWithRequirements = z.object({
		requires: requires,
	});

	export type ObjWithRequirements = typeof objWithRequirements;
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
	import Heading from "../ui/typography/heading.svelte";
	import GameRequirementsForm from "./game-requirements-form.svelte";

  export let form
  export let context = "event";

  const { form: formData } = form;
</script>

<div>
  <Heading level={4}>Requirements</Heading>
  <p class="text-sm text-muted-foreground">Does this event have requirements to be available?</p>
</div>

<GameRequirementsForm {form} context="event" />

<!-- ComboBox of allFlags, no option to add -->