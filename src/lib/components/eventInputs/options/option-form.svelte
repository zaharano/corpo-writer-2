
<script lang="ts" context="module">
	import { z } from "zod";

  import { objWithRequirements } from "$lib/components/eventInputs/requirements/requirements-form.svelte";
  import { effectsFormSchema } from "$lib/components/eventInputs/effects/effects-form.svelte";

  export const optionFormSchema = objWithRequirements.extend({
    text: z.string().min(4).max(400),
    next: z.string(),
    // effects: effectsFormSchema,
  })
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

  export let option: Option;

  let effects = false;

  const form = superForm( { ...option }, {
    dataType: 'json',
    validators: zodClient(optionFormSchema),
  });

  const { form: formData, enhance } = form;

</script>

<form method="POST" class="space-y-4" id="option-form" use:enhance on:change={() => {}}>
  <Form.Field {form} name="text">
    <Form.Control let:attrs>
      <Form.Label>Text</Form.Label>
      <Input placeholder="You find a shiny rock." {...attrs} bind:value={$formData.text} />
    </Form.Control>
    <Form.Description>
      The text the user will be selecting.
    </Form.Description>
  </Form.Field>

  <!-- TODO: bind to what I need -->
  <Form.Field {form} name="next">
    <Form.Control let:attrs>
      <Form.Label>Next Screen</Form.Label><br>
      <ScreenComboBox />
    </Form.Control>
    <Form.Description>
      Select the screen this option leads to.
    </Form.Description>
  </Form.Field>

  <Form.Field {form} name="effects">
    <Form.Control let:attrs>
      <Form.Label>Effects</Form.Label>
      <Switch {...attrs} bind:checked={effects} />
    </Form.Control>
    <Form.Description>
      Does this option have effects?
    </Form.Description>
  </Form.Field>
</form>

  <Separator />