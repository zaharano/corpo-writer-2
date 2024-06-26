<script lang='ts'>
  import Heading from "$lib/components/ui/typography/heading.svelte";
  import settings from "$lib/settings";
	import EventTable from "$lib/components/eventDisplay/event-table.svelte";
  import NewThingDialog from "$lib/components/eventInputs/event/new-thing-dialog.svelte";
  
  const { gameTitle } = settings;

</script>

<Heading className="mt-10 text-center" level={1}>Let's write <em>{gameTitle}</em></Heading>

<div class="my-4 w-full flex items-center justify-center">
  <NewThingDialog purpose="event" />
</div>

<EventTable />