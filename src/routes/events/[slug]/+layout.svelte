<script lang="ts">
	import SidebarNav from "$lib/components/ui/nav/sidebarnav.svelte";
	import { Separator } from "$lib/components/ui/separator/index.js";
  import { page, navigating } from "$app/stores";
  import { eventStore, currentEvent, valid } from "$lib/stores";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button/index";
	import DeleteDialog from "$lib/components/eventInputs/event/delete-dialog.svelte";

  const slug = $page.params.slug;
	let screenSlug: string | undefined;
	$: if($navigating) screenSlug = $navigating?.to?.params?.screenSlug;

  // use slug to load current event store
  // if slug is not found, redirect to events page
  const ce = eventStore.getEventBySlug(slug);

	// use screenSlug to load current screen
	// const cs = currentEvent.getScreenBySlug($page.params.screenSlug);

  if (ce === undefined) {
    goto("/");
  } else {
    currentEvent.load(ce);
  }

	$: buttonText = screenSlug ? 'Back (changes auto-saved)' : 'Save Event';

  function save() {
		if (screenSlug) {
			// screen is constantly auto-saved to currentEvent - 
			// perhaps this should change to work like the event level save
		} else {
    	currentEvent.save();
		}
    back();
  }

	function back() {
		if ($page.params.screenSlug) {
			goto(`/events/${slug}/screens`);
		} else {
			goto("/");
		}
	}

	function del() {
		if ($page.params.screenSlug) {
			// TODO: screen delete
			// currentEvent.removeScreen(cs.id);
		} else {
			eventStore.removeEvent($currentEvent.id);
		}
		back();
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
		<h2 class="text-2xl font-bold tracking-tight">Editing the event <span class="bg-muted text-muted-foreground rounded-sm px-2 py-1">{ce?.meta.title}</span></h2>
		<p class="text-muted-foreground">
			Changes to this event are not automatically saved, make sure to save your changes before leaving.
		</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			{#if !$page.params.screenSlug}
				<SidebarNav items={sidebarNavItems} />
			{/if}
      <div class="flex flex-col gap-4 p-4">
        <div>
          <Button disabled={!$valid} class="w-full" variant="default" on:click={save}>{buttonText}</Button>
          {#if $valid === false}
            <p class="text-destructive text-xs text-center">All errors must be fixed.</p>
          {/if}
        </div>
				{#if !$page.params.screenSlug}
        	<Button class="w-full" variant="secondary" on:click={back}>Back (without save)</Button>
				{/if}
				<DeleteDialog class="w-full" handleDelete={del} />
      </div>
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</div>