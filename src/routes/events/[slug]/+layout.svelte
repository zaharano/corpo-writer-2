<script lang="ts">
	import SidebarNav from "$lib/components/ui/nav/sidebarnav.svelte";
	import { Separator } from "$lib/components/ui/separator/index.js";
  import { page } from "$app/stores";
  import { eventStore, currentEvent } from "$lib/stores/eventStore";
  import { valid } from "$lib/stores/uiStore";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button/index";
	import DeleteDialog from "$lib/components/eventInputs/event/delete-dialog.svelte";

  const { slug } = $page.params;

  // use slug to load current event store
  // if slug is not found, redirect to events page
  const ce = eventStore.getEventBySlug(slug);
  if (ce === undefined) {
    goto("/");
  } else {
    currentEvent.load(ce);
  }

  function saveEvent() {
    currentEvent.save();
    goto("/");
  }


	const sidebarNavItems = [
		{
			title: "Meta",
			href: `/events/${slug}`,
		},
		{
			title: "Screens",
			href: `/events/${slug}/screens`,
		},
	];
</script>

<div class="space-y-6 p-10 pb-16">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Editing <span class="bg-muted text-muted-foreground rounded-sm px-2 py-1">{ce?.meta.title}</span></h2>
		<p class="text-muted-foreground">
			Changes are not automatically saved - make sure to save your changes before leaving.
		</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
      <div class="flex flex-col gap-4 p-4">
        <div>
          <Button disabled={!$valid} class="w-full" variant="default" on:click={saveEvent}>Save Changes</Button>
          {#if $valid === false}
            <p class="text-destructive text-xs text-center">All errors must be fixed to save.</p>
          {/if}
        </div>
        <Button class="w-full" variant="secondary" on:click={() => goto("/")}>Back (without save)</Button>
				<DeleteDialog class="w-full" handleDelete={() => {
					eventStore.removeEvent($currentEvent.id);
					goto("/");
				}} />
      </div>
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</div>