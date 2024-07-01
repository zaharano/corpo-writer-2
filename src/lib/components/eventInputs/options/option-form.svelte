
<script lang="ts" context="module">
	import { z } from "zod";

  import RequirementsForm, { objWithRequirements } from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
  import { effectsFormSchema } from "$lib/components/eventInputs/effects/effects-fields.svelte";

  export const optionFormSchema = objWithRequirements.extend({
    text: z.string().min(4).max(400),
    next: z.string(),
    effects: effectsFormSchema,
  })
</script>

<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Option } from "$lib/classes/eventClasses";
	import ScreenComboBox from "../screen/screenComboBox.svelte";
	import EffectsForm from "../effects/effects-fields.svelte";
	import ToggleSection from "$lib/components/ui/toggle-section/toggle-section.svelte";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { Button } from "$lib/components/ui/button";
	import FormFieldErrors from "$lib/components/ui/form/form-field-errors.svelte";

  export let option : Option;

  const form = superForm( { ...option }, {
    dataType: 'json',
    validators: zodClient(optionFormSchema),
  });

  const { form: formData, enhance } = form;

  formData.subscribe((value) => {
    console.log(value);
  });

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
    <Form.FormFieldErrors />
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

  <ToggleSection>
    <span slot='label'>Requirements</span>
    <span slot='description'>Does this option have requirements? Flags or other game state.</span>
    <RequirementsForm slot='toggled' {form}/>
  </ToggleSection>

  <ToggleSection>
    <span slot='label'>Effects</span>
    <span slot='description'>Does the player choosing this option cause effects?<br>(Set flags, or change the game state)</span>
    <EffectsForm slot='toggled' effects={$formData.effects}/>
  </ToggleSection>

  <!-- <div class='space-y-2'>
    <Label>Effects</Label>
    <Switch bind:checked={effects} />
    <div class="text-[0.8rem] text-muted-foreground">
      Does this option have effects? <br>(Set flags, or change the game state)
    </div>
  </div>  

  {#if effects}
    <Separator />
    <EffectsForm effects={$formData.effects} />
  {/if}  -->

  <Button class='mt-4 w-full' on:click={() => {
    handleSave($formData);
  }}>Save and Close</Button>
  <Button class='mt-4 w-full' variant='destructive'>Delete Option</Button>
</form>