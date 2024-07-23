<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithRequirements } from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
  import { newEventSchema } from "$lib/types/formSchemas";
  import type { EventFormSchema } from "$lib/types/eventFormSchema";

  const partialSchema = objWithRequirements.merge(newEventSchema.innerType());
  export const metaFormSchema = partialSchema.extend({
    repeatable: z.boolean(),
    random: z.boolean(),
    priority: z.number().int().min(0).max(100),
    rarity: z.number().int().min(0).max(100),
  });

</script>

<script lang='ts'>
  import { superForm, type Infer, type SuperForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import {Input} from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import {Slider} from "$lib/components/ui/slider/index.js";
  import {Separator} from "$lib/components/ui/separator/index";
  import RequirementsForm from "$lib/components/eventInputs/requirements/requirements-fields.svelte";

  import { browser } from "$app/environment";

  import { currentEvent } from "$lib/stores";
  import { valid } from "$lib/stores";
	import { getContext, tick } from "svelte";
	import Heading from "$lib/components/ui/typography/heading.svelte";

  let form : SuperForm<Infer<EventFormSchema>> = getContext('form');

	const { form: formData } = form;

  // replace saveMeta? 
  // const form = superForm(data, {
  //   validators: zodClient(formSchema),
  //   onUpdated: ({ form: f }) => {
  //     if (f.valid) {
  //       toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
  //     } else {
  //       toast.error("Please fix the errors in the form.");
  //     }
  //   }
  // });

  // TODO: Generalize this to use elsewhere autosave to currentEvent
  // let saveTimer: ReturnType<typeof setTimeout>;
  // function saveMeta() {
  //   clearTimeout(saveTimer);
  //   tick().then(() => {
  //     saveTimer = setTimeout(() => {
  //       console.log(metaFormSchema.safeParse($formData));
  //       if (metaFormSchema.safeParse($formData).success) {
  //         let ce = $currentEvent;
  //         ce.meta = { ...ce.meta, ...$formData};
  //         currentEvent.set(ce);
  //         valid.set(true);
  //       } else {
  //         valid.set(false);
  //       }
  //     }, 50);
  //   });
  // }


  // function handleAutoSave(currentEvent: Event, editing: any, schema: any, data: any, timer: ReturnType<typeof setTimeout>) {
  //   clearTimeout(timer);
  //   tick().then(() => {
  //     timer = setTimeout(() => {
  //       if (schema.safeParse(data).success) {
  //         let ce = $currentEvent;
  //         editing = { ...editing, ...data};
  //         currentEvent.set(ce);
  //         valid.set(true);
  //       } else {
  //         valid.set(false);
  //       }
  //     }, 50);
  //   });
  // }

  function slugGen() {
    if ($formData.meta.title && !$formData.meta.slug) {
      $formData.meta.slug = $formData.meta.title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g,'-').slice(0, 30);
    }
  }


  function handleSlider() {
    tick().then(() => {
      $formData.meta.priority = aPriority[0]
      $formData.meta.rarity = aRarity[0];
      // saveMeta();
    });
  }

  // these workarounds because slider uses [number] and not number
  // also, now odd with the value being close but not the same -
  let aPriority = [$formData.meta.priority];
  let aRarity = [$formData.meta.rarity];
</script>

<div class="space-y-8">
	<Form.Field {form} name="meta.title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input placeholder="A Shortcut to Mushrooms" {...attrs} bind:value={$formData.meta.title} />
		</Form.Control>
		<Form.Description>
			The title for this event.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

  <Form.Field {form} name="meta.slug">
    <Form.Control let:attrs>
      <Form.Label>Slug</Form.Label>
      <Input 
        placeholder="a-shortcut-to-mushrooms" 
        {...attrs} 
        bind:value={$formData.meta.slug} 
        on:focus={slugGen} 
        on:blur={slugGen} 
      />
    </Form.Control>
    <Form.Description>
      A unique identifier for this event. Must be unique and contain only lowercase letters, numbers, and hyphens.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  
  <Form.Field {form} name="meta.repeatable">
    <Form.Control let:attrs>
      <Form.Label>Repeatable</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.meta.repeatable}
      />
    </Form.Control>
    <Form.Description>
      Whether or not this event is repeatable (can be played multiple times in a single game)
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="meta.random">
    <Form.Control let:attrs>
      <Form.Label>Random</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.meta.random}
      />
    </Form.Control>
    <Form.Description>
      Whether or not this event can be selected at random in the game when no event is scheduled.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="meta.priority" on:click={handleSlider}>
    <Form.Control let:attrs>
      <Form.Label>Priority</Form.Label> <span>{aPriority}</span>
      <Slider 
        max={100} 
        step={1}
        {...attrs}
        bind:value={aPriority}
        onValueChange={handleSlider}
      />
    </Form.Control>
    <Form.Description>
      The priority of this event. Higher priority events are more likely to be selected when random, and will take precedence in scheduling conflicts.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="meta.rarity" on:click={handleSlider}>
    <Form.Control let:attrs>
      <Form.Label>Rarity</Form.Label> <span>{aRarity}</span>
      <Slider 
        max={100} 
        step={1}
        {...attrs}
        bind:value={aRarity}
        onValueChange={handleSlider}
      />
    </Form.Control>
    <Form.Description>
      The rarity of this event. Higher rarity events are less likely to be selected at random.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Separator />
  <div>
    <Heading level={4}>Requirements</Heading>
    <p class="text-sm text-muted-foreground">Does this event have requirements to be available?</p>
  </div>

  <RequirementsForm {form} context='event'/>
</div>

{#if browser}
	<SuperDebug data={$formData} />
{/if}