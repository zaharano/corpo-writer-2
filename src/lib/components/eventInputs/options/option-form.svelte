
<script lang="ts" context="module">
	import { z } from "zod";

  import { objWithRequirements } from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
  import { effectsFormSchema } from "$lib/components/eventInputs/effects/effects-fields.svelte";

  export const optionFormSchema = objWithRequirements.extend({
    text: z.string().min(4).max(400),
    next: z.string(),
    effects: effectsFormSchema,
  })

  export type OptionFormSchema = typeof optionFormSchema
</script>

<script lang="ts">
  // Components
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
	import ComboBox from "../comboBox.svelte";
  import ToggleSection from "$lib/components/ui/toggle-section/toggle-section.svelte";
	import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import DeleteDialog from "../event/delete-dialog.svelte"; 

  // Classes and Schema
  import { Option } from "$lib/classes/eventClasses";
  import RequirementsFields, {checkIfRequirements} from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
	import EffectsFields from "$lib/components/eventInputs/effects/effects-fields.svelte";

  // Form libs
	import SuperDebug, { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

  // State
	import { currentEvent } from "$lib/stores";


  export let option : Partial<Option>;
  export let open = true;
  export let handleDelete: () => void;

  let valid = true;

  const form = superForm( { ...option }, {
    dataType: 'json',
    //@ts-ignore - TODO figure out later
    validators: zodClient(optionFormSchema),
  });

  const { form: formData, enhance } = form;

  function saveOption() {
    console.log(optionFormSchema.safeParse($formData));
    if (optionFormSchema.safeParse($formData).success) {
      option = $formData;
      valid = true;
    } else {
      valid = false;
    }
  }
  // save changes directly to current event object
  formData.subscribe((value) => {
    // console.log(value);
  });

  let reqs = checkIfRequirements($formData.requires);

  let screens = currentEvent.allSimplifiedScreens();
  currentEvent.subscribe((_) => {
    screens = currentEvent.allSimplifiedScreens();
  });

</script>

<form method="POST" class="space-y-4 mb-4" id="option-form" use:enhance on:change={saveOption}>
  <Form.Field {form} name="text">
    <Form.Control let:attrs>
      <Form.Label>Text</Form.Label>
      <Input placeholder="Sally forth!" {...attrs} bind:value={$formData.text} />
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
      <ComboBox bind:value={$formData.next} purpose='screen' targets={screens} />
    </Form.Control>
    <Form.Description>
      Select the screen this option leads to.
    </Form.Description>
    <Form.FormFieldErrors />
  </Form.Field>

  <!-- upon toggling off these sections, the data should be cleared -->
   <!-- if data exists in these sections, the toggle should be on -->
  <ToggleSection toggle={reqs}>
    <span slot='label'>Requirements</span>
    <span slot='description'>Does this option have requirements? Flags or other game state.</span>
    <RequirementsFields slot='toggled' {form} context='option'/>
  </ToggleSection>

  <ToggleSection>
    <span slot='label'>Effects</span>
    <span slot='description'>Does the player choosing this option cause effects?<br>(Set flags, or change the game state)</span>
    <EffectsFields slot='toggled' {form}/>
  </ToggleSection>

  <Sheet.Close class='w-full'>
    <Button class='mt-4 w-full' disabled={!valid} on:click={() => {
      if (!optionFormSchema.safeParse($formData).success) {
        valid = false;
      } else {
        saveOption();
        open = false;
      }
    }}>Save and Close</Button>
  </Sheet.Close>
  
  <DeleteDialog {handleDelete} class='w-full' />
  
</form>

<SuperDebug data={$formData} />
