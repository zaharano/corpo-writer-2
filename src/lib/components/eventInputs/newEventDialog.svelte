	
<script lang="ts">
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Event } from "$lib/classes/eventClasses.js";
  import { goto } from '$app/navigation';

  let title: string;
  let slug: string;

  let dialogOpen = false;

  function handleSaveAndEdit() {
    eventStore.addEvent(new Event(title, slug));
    dialogOpen = false;
    console.log(slug)
    goto(`/events/${slug}`);
  }

  function handleSaveAndClose() {
    eventStore.addEvent(new Event(title, slug));
    dialogOpen = false;
  }
  
  import { eventStore } from "$lib/stores/eventStore.js";
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >New Event</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add an Event</Dialog.Title>
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
        <Label for="username" class="text-right">Slug</Label>
        <Input id="username" bind:value={slug} class="col-span-3" />
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
