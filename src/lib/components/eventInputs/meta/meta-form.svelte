
<script lang="ts" context="module">
	import { z } from "zod";
  import { objWithRequirements } from "$lib/components/eventInputs/requirements/requirements-fields.svelte";
  import { newEventSchema } from "$lib/types/formSchemas";

  const partialSchema = objWithRequirements.merge(newEventSchema.innerType());
  export const metaFormSchema = partialSchema.extend({
    repeatable: z.boolean(),
    random: z.boolean(),
    priority: z.number().int().min(0).max(100),
    rarity: z.number().int().min(0).max(100),
  })

  // vestigial?
	// export type MetaFormSchema = typeof metaFormSchema;
</script>

<script lang='ts'>
  import { superForm } from "sveltekit-superforms";
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
	import { tick } from "svelte";
	import Heading from "$lib/components/ui/typography/heading.svelte";

  const form = superForm( { ...$currentEvent.meta }, {
    SPA: true,
    dataType: 'json',
    //@ts-ignore - same old thing
		validators: zodClient(metaFormSchema),
    resetForm: false,
    onUpdate: ({ form: f, cancel }) => {
      valid.set(f.valid);
      $currentEvent.writerMeta.valid = f.valid;
      $currentEvent.writerMeta.errors = {...$currentEvent.writerMeta.errors, meta: f.errors};
			currentEvent.set({...$currentEvent, meta: f.data});
      // cancel prevents focus loss, certainly better way to do this
      cancel();
    }
	});

	const { form: formData, enhance, validateForm } = form;
  // immediately validate the loaded data
  validateForm({ update: true});

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
    if ($formData.title && !$formData.slug) {
      $formData.slug = $formData.title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g,'-').slice(0, 30);
    }
  }

  function handleSlider() {
    tick().then(() => {
      $formData.priority = aPriority[0]
      $formData.rarity = aRarity[0];
      // saveMeta();
    });
  }

  // these workarounds because slider uses [number] and not number
  // also, now odd with the value being close but not the same -
  let aPriority = [$formData.priority];
  let aRarity = [$formData.rarity];
</script>

<form method="POST" class="mt-8 space-y-8" id="meta-form" use:enhance on:change={form.submit}>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input placeholder="A Shortcut to Mushrooms" {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>
			The title for this event.
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
      A unique identifier for this event. Must be unique and contain only lowercase letters, numbers, and hyphens.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="repeatable">
    <Form.Control let:attrs>
      <Form.Label>Repeatable</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.repeatable}
        on:click={form.submit}
      />
    </Form.Control>
    <Form.Description>
      Whether or not this event is repeatable (can be played multiple times in a single game)
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="random">
    <Form.Control let:attrs>
      <Form.Label>Random</Form.Label>
      <Switch 
        {...attrs} 
        bind:checked={$formData.random}
        on:click={form.submit}
      />
    </Form.Control>
    <Form.Description>
      Whether or not this event can be selected at random in the game when no event is scheduled.
    </Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="priority" on:click={handleSlider}>
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

  <Form.Field {form} name="rarity" on:click={handleSlider}>
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

  <RequirementsForm form={form} context='event'/>

</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}