
<script lang="ts" context="module">
	import { z } from "zod";
	export const metaFormSchema = z.object({
		title: z
			.string()
			.min(6, "Title must be at least 6 characters.")
			.max(60, "Title must not be longer than 60 characters"),
		slug: z
      .string({ required_error: "Set a valid slug" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only be lowercase letters and numbers separated by hyphens")
      .min(6, "Slug must be at least 6 characters")
      .max(60, "Slug must not be longer than 60 characters"),
    repeatable: z.boolean(),
    random: z.boolean(),
    priority: z.number().int().min(0).max(100),
    rarity: z.number().int().min(0).max(100),
	});

  // I think something here is uneccessary because of no serverside
	export type MetaFormSchema = typeof metaFormSchema;
</script>

<script lang='ts'>
  import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import {Input} from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import {Slider} from "$lib/components/ui/slider/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { cn } from "$lib/utils.js";
	import { browser } from "$app/environment";

  import { currentEvent } from "$lib/stores/eventStore.js";
  import { valid } from "$lib/stores/uiStore";
	import { ExclamationTriangle } from "svelte-radix";
	import { tick } from "svelte";

  // export let data: SuperValidated<Infer<MetaFormSchema>>;

  let { title, slug, repeatable, random, priority, rarity, requires } = $currentEvent.meta;

  const form = superForm({ title, slug, repeatable, random, priority, rarity }, {
		validators: zodClient(metaFormSchema),
	});

	const { form: formData, enhance } = form;

  let saveTimer: ReturnType<typeof setTimeout>;
  function saveMeta() {
    clearTimeout(saveTimer);
    tick().then(() => {
      saveTimer = setTimeout(() => {
        if (metaFormSchema.safeParse($formData).success) {
          let ce = $currentEvent;
          ce.meta = { ...ce.meta, ...$formData};
          currentEvent.set(ce);
          valid.set(true);
        } else {
          valid.set(false);
        }
      }, 50);
    });
  }

  function slugGen() {
    if ($formData.title && !$formData.slug) {
      $formData.slug = $formData.title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g,'-');
    }
  }

  function handleSlider() {
    tick().then(() => {
      $formData.priority = aPriority ? aPriority[0] : undefined;
      $formData.rarity = aRarity ? aRarity[0] : undefined;
      saveMeta();
    });
  }

  // these workarounds because slider uses [number] and not number
  // also, now odd with the value being close but not the same -
  let aPriority = $formData.priority ? [$formData.priority] : undefined;
  let aRarity = $formData.rarity ? [$formData.rarity] : undefined;
</script>

<form method="POST" class="mt-8 space-y-8" id="meta-form" use:enhance on:change={saveMeta}>
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
</form>

<Form.Field {form} name="repeatable">
  <Form.Control let:attrs>
    <Form.Label>Repeatable</Form.Label>
    <Switch 
      {...attrs} 
      bind:checked={$formData.repeatable}
      on:click={saveMeta}
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
      on:click={saveMeta}
      
    />
  </Form.Control>
  <Form.Description>
    Whether or not this event can be selected at random in the game when event is scheduled.
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

{#if browser}
	<SuperDebug data={$formData} />
{/if}