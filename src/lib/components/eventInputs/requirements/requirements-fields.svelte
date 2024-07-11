
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithGameRequirements, checkIfGameRequirements } from "./game-requirements-fields.svelte";
  import { setFlagSchema } from "$lib/components/eventInputs/flags/set-flags.svelte";

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
  import ComboBox from "../comboBox.svelte";

  import { flagStore } from "$lib/stores";
	import type { ID, SetFlag } from "$lib/classes/eventClasses";
	import { Button } from "$lib/components/ui/button";
	import { Switch } from "$lib/components/ui/switch";
	import { CircleXIcon } from "lucide-svelte";
	import { Label } from "$lib/components/ui/label";
	import SetFlags from "../flags/set-flags.svelte";
	import { set } from "zod";

  export let form;
  export let context = "event";

  const { form: formData } = form;

  let addedFlag: ID | undefined = undefined;
  $: addedFlag && addFlag();

  function addFlag() {
    $formData.requires.flags = [...$formData.requires.flags, { id: addedFlag, value: false }];
    addedFlag = undefined;
  }

  // let allFlags = flagStore.allSimplifiedFlags();
</script>

<Form.Field {form} name="flags">
  <Form.Control let:attrs>
    <Form.Label>Flags</Form.Label><br>
    <!-- <ComboBox bind:value={addedFlag} purpose='flag' targets={flagStore.allSimplifiedFlags()}/>
    {#if $formData.requires.flags.length > 0}
      {#each $formData.requires.flags as flag, i}
        <div class='flex items-center gap-x-4'>
          <span class='flex-grow'>{flagStore.getFlagTitle(flag.id)}</span>
          <span><Label>True?</Label> <Switch bind:checked={$formData.requires.flags[i].value} /></span>
          <Button size='icon' variant='ghost' on:click={() => $formData.requires.flags = $formData.requires.flags.filter(f => f.id !== flag.id)}><CircleXIcon /></Button>
        </div>
      {/each}
    {/if} -->
    <SetFlags bind:setFlags={$formData.requires.flags} />
  </Form.Control>
  <Form.Description>
    Any flags that must be set for this {context} to be available.
  </Form.Description>
  <Form.FormFieldErrors />
</Form.Field>

<GameRequirementsForm {form} context={context} />