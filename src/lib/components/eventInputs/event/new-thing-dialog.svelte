<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { newEventSchema, newScreenSchema } from "$lib/types/formSchemas";

  import { eventStore, currentEvent } from "$lib/stores/eventStore.js";

  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  
  import { cn } from "$lib/utils";
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let purpose: 'event' | 'screen' = 'event';
  export let stub: boolean = false;
  export let variant: 'default' | 'secondary' = 'default';
  let eventSlug = $page.params?.slug;

  const description = {
    event: 'Add a new event to the game.',
    screen: 'Add a new screen to the current event.',
  }[purpose] + stub ? `This stub ${purpose} will be available to flesh out later - for now just enter a title and slug to point to.` : '';
  const schema = {
    event: newEventSchema,
    screen: newScreenSchema,
  }[purpose];

  const form = superForm( { title: '', slug: '' }, {
    validators: zodClient(schema),
  });
  const { form: formData, enhance } = form;

  let dialogOpen = false;
  let message = '';

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSave(edit: boolean) {
    if (!schema.safeParse($formData).success) {
      message = 'Please enter a unique title and slug.';
      return;
    } else {
      message = '';
      dialogOpen = false;
      if (purpose === 'event') {
        eventStore.addEvent($formData.title, $formData.slug);
        if (edit) {
          goto(`/events/${$formData.slug}`);
        }
        reset()
      } else if (purpose === 'screen') {
        currentEvent.addScreen($formData.title, $formData.slug);
        if (edit) {
          goto(`/events/${eventSlug}/screens/${$formData.slug}`);
        }
        reset()
      }
    }
  }

  function reset() {
    $formData.title = '';
    $formData.slug = '';
  }

  // dry this up
  function slugGen() {
    if ($formData.title && !$formData.slug) {
      $formData.slug = $formData.title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g,'-').slice(0, 30);
    }
  }
  
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger class={cn('w-full', buttonVariants({ variant: "outline" }))}
    >New {capitalize(purpose)}</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add an {capitalize(purpose)}</Dialog.Title>
      {#if message}
        <Alert.Root variant="destructive">
          <ExclamationTriangle class="h-4 w-4" />
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{message}</Alert.Description>
        </Alert.Root>
      {/if}
      <Dialog.Description>
        {description}
      </Dialog.Description>
    </Dialog.Header>

    <form method="POST" class="" id="new-form" use:enhance>
      <Form.Field {form} name="title">
        <Form.Control let:attrs>
          <Form.Label>Title</Form.Label>
          <Input placeholder="A Shortcut to Mushrooms" {...attrs} bind:value={$formData.title} />
        </Form.Control>
        <Form.Description>
          The title for this {purpose}.
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
          A unique identifier for this {purpose}. Must be unique and contain only lowercase letters, numbers, and hyphens.
        </Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </form>

    <Dialog.Footer>
      <Button type="button" class={buttonVariants({ variant: "secondary" })} on:click={() => handleSave(false)}>
        Save and close
      </Button>
      {#if purpose === 'event' || purpose === 'screen'}
        <Button type="submit" on:click={() => handleSave(true)}>Save and edit</Button>
      {/if}
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>