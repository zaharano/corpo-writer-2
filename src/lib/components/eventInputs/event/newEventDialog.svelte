<script lang="ts">
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { Event } from "$lib/classes/eventClasses.js";
  import { goto } from '$app/navigation';
  import { cn } from "$lib/utils";

  import { eventStore } from "$lib/stores/eventStore.js";

  let title: string;
  let slug: string;

  let dialogOpen = false;
  let message = '';

  function handleSaveAndEdit() {
    if (!validateNewEvent()) {
      message = 'Please enter a unique title and slug.';
      return;
    }
    eventStore.addEvent(new Event(title, slug));
    dialogOpen = false;
    goto(`/events/${slug}`);
  }

  function handleSaveAndClose() {
    if (!validateNewEvent()) {
      message = 'Please enter a unique title and slug.';
      return;
    }
    eventStore.addEvent(new Event(title, slug));
    dialogOpen = false;
  }

  function generateSlug() {
    slug = title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  function validateNewEvent() {
    if (title.length > 3) {
      if (eventStore.allEventNames().includes(title)) {
        return false;
      }
    } else {
      return false;
    }
    if (slug.length > 3) {
      if (eventStore.allEventSlugs().includes(slug)) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }
  
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger class={cn('w-40', buttonVariants({ variant: "default" }))}
    >New Event</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add an Event</Dialog.Title>
      {#if message}
        <Alert.Root variant="destructive">
          <ExclamationTriangle class="h-4 w-4" />
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{message}</Alert.Description>
        </Alert.Root>
      {/if}
      <Dialog.Description>
        Add a new event to the game. A title is required to get started.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="title" class="text-right">Title</Label>
        <Input id="title" bind:value={title} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="slug" class="text-right">Slug</Label>
        <Input id="slug" on:focus={generateSlug} bind:value={slug} class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <!-- <Dialog.Close>
        <Button type="button" class={buttonVariants({ variant: "destructive" })}>Cancel</Button>
      </Dialog.Close> -->
      <Button type="button" class={buttonVariants({ variant: "secondary" })} on:click={handleSaveAndClose}>
        Save and close
      </Button>
      <Button type="submit" on:click={handleSaveAndEdit}>Save and edit</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
