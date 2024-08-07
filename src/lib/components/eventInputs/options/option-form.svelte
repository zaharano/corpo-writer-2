
<script lang="ts" context="module">
	import { z } from "zod";

  import { objWithRequirements } from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
  import { effectsFormSchema } from "$lib/components/eventInputs/effects/effects-fields.svelte";

  export const optionFormSchema = objWithRequirements.extend({
    text: z.string().min(4).max(400),
    next: z.union([z.string().uuid(), z.literal('endEvent'), z.literal('endGame')]),
    effects: effectsFormSchema,
  })

  export type OptionFormSchema = typeof optionFormSchema
</script>

<script lang="ts">
  // Components
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
	import ComboBox from "../comboBox.svelte";
	import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import * as Accordion from "$lib/components/ui/accordion";
  import DeleteDialog from "../event/delete-dialog.svelte"; 

  // Classes and Schema
  import { Option } from "$lib/classes/eventClasses";
  import RequirementsFields from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
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

  // save changes directly to current event object?
  formData.subscribe((value) => {
    // console.log(value);
  });

  $: screens = [
    { id: 'endEvent', title: 'End the current event' },
    { id: 'endGame', title: 'End the game (game over man!)' },
    ...$currentEvent.screens.map((s) => ({ id: s.id, title: s.title }))];

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

  <Accordion.Root>
    <Accordion.Item value="item-1">
      <Accordion.Trigger>
        Requirements
      </Accordion.Trigger>
      <Form.Description class='mb-2'>
        Does this option have requirements? Flags or other game state.
      </Form.Description>
      <Accordion.Content>
        <RequirementsFields {form} context='option'/>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>
        Effects
      </Accordion.Trigger>
      <Form.Description class='mb-2'>
        Does the player choosing this option cause effects?<br>(Set flags, or change the game state)
      </Form.Description>
      <Accordion.Content>
        <EffectsFields {form}/>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>

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
