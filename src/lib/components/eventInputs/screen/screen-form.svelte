
<script lang="ts" context="module">
	import { z } from "zod";

  import { newScreenSchema } from "$lib/types/formSchemas";
  import { optionFormSchema } from "$lib/components/eventInputs/options/option-form.svelte";

  export const screenFormSchema = newScreenSchema.innerType().extend({
    text: z.string().min(4).max(600, "Keep screen text below 600 characters."),
    options: z.array(optionFormSchema),
  })

  
</script>

<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import SuperDebug from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import Button from "$lib/components/ui/button/button.svelte";
  import {Input} from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";

  import { currentEvent } from "$lib/stores/eventStore.js";
  import { browser } from "$app/environment";
  import { tick } from "svelte";
  import { valid } from "$lib/stores/uiStore";
	import { Option, type Screen } from "$lib/classes/eventClasses";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";

	import OptionTable from "$lib/components/eventInputs/options/option-table.svelte";

  export let screen: Screen;

  const form = superForm( { ...screen }, {
    dataType: 'json',
    validators: zodClient(screenFormSchema),
  });

  const { form: formData, enhance } = form;

  // TODO: Generalize this to use elsewhere autosave to currentEvent

  // function accepts thing {screen: stuff} then this gets spread into the set under currentEvent
  // save timer also passed in?
  function saveChanges(schema, newStuff, saveTimer) {
    clearTimeout(saveTimer);
    tick().then(() => {
      saveTimer = setTimeout(() => {
        // console.log(schema.safeParse($formData))
        if (schema.safeParse($formData).success) {
          currentEvent.set(
            { 
              ...$currentEvent, 
              ...newStuff 
            }
          );
          valid.set(true);
        } else {
          valid.set(false);
        }
      }, 50);
    });
  }

  function slugGen() {
    if ($formData.title && !$formData.slug) {
      $formData.slug = $formData.title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g,'-').slice(0, 30);
    }
  }

  function handleSlider() {
    tick().then(() => {
      // saveMeta();
    });
  }

  $: debugData = {
    ...$formData,
    options: `${$formData.options.length} option(s)`,
  }

  let saveTimer: ReturnType<typeof setTimeout>;
</script>

<form method="POST" class="mt-8 space-y-8" id="screen-form" use:enhance on:change={() => saveChanges(screenFormSchema, {screens: $currentEvent.screens.map(s => s.id === screen.id ? $formData : s)}, saveTimer)}>
  <Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input placeholder="A Shortcut to Mushrooms" {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>
			The title for this screen. 
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

  <Form.Field {form} name="slug">
    <Form.Control let:attrs>
      <Form.Label>Slug</Form.Label>
      <Input 
        placeholder="a-shortcut-to-mushrooms" 
        {...attrs} 
        bind:value={$formData.slug} 
        on:focus={slugGen} 
        on:blur={slugGen} 
      />
    </Form.Control>
    <Form.Description>
      A unique identifier for this screen. Must be unique and contain only lowercase letters, numbers, and hyphens.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="text">
    <Form.Control let:attrs>
      <Form.Label>Text</Form.Label>
      <Textarea placeholder="The text for this screen." {...attrs} bind:value={$formData.text} class="resize-none" />
    </Form.Control>
    <Form.Description>
      The text for this screen.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <OptionTable {form} {saveChanges} />
  <Button variant="outline" type="button" class="w-full" on:click={() => $formData.options = [...$formData.options, new Option()]}>Add Option</Button>
</form>

{#if browser}
	<SuperDebug data={debugData} />
{/if}