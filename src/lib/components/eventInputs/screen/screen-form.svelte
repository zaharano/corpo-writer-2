
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
  import { slugGen } from "$lib/utils";
	import { Option, type Screen } from "$lib/classes/eventClasses";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";

	import OptionTable from "$lib/components/eventInputs/options/option-table.svelte";

  export let screen: Screen;

  const form = superForm( { ...screen }, {
    dataType: 'json',
    //@ts-ignore - TODO figure out later
    validators: zodClient(screenFormSchema),
  });

  const { form: formData, enhance } = form;

  // TODO: Generalize this to use elsewhere autosave to currentEvent?
  // function accepts thing {screen: stuff} then this gets spread into the set under currentEvent
  // save timer also passed in?

 
  let saveTimer: ReturnType<typeof setTimeout>;
  function saveScreen() {
    clearTimeout(saveTimer);
    tick().then(() => {
      saveTimer = setTimeout(() => {
        console.log(screenFormSchema.safeParse($formData))
        if (screenFormSchema.safeParse($formData).success) {
          currentEvent.set(
            { 
              ...$currentEvent,
              screens: $currentEvent.screens.map(s => s.id === screen.id ? $formData : s)
            }
          );
          valid.set(true);
        } else {
          valid.set(false);
        }
      }, 50);
    });
  }

  function handleSlider() {
    tick().then(() => {
      // saveMeta();
    });
  }

  // Avoid repeating arrow funcs for each event
  function slugHelper() {
    $formData.slug = slugGen($formData.title, $formData.slug);
  }

  // don't need ID or writerMeta to display in debug
  $: debugData = {
    title: $formData.title,
    slug: $formData.slug,
    text: $formData.text,
    options: `${$formData.options.length} option(s)`,
  }
</script>

<form method="POST" class="mt-8 space-y-8" id="screen-form" use:enhance on:change={saveScreen}>
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
        on:focus={slugHelper} 
        on:blur={slugHelper}
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
      <Textarea placeholder="Once upon a time..." {...attrs} bind:value={$formData.text} class="resize-none" />
    </Form.Control>
    <Form.Description>
      The primary text that displays when the player is on this screen.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  
  <OptionTable {form}/>
  <Button variant="outline" type="button" class="w-full" on:click={() => $formData.options = [...$formData.options, new Option()]}>Add Option</Button>
</form>

{#if browser}
	<SuperDebug data={debugData} />
{/if}