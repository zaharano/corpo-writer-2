<script lang='ts'>
  import Heading from "$lib/components/ui/typography/heading.svelte";
  import settings from "$lib/settings";
	import EventTable from "$lib/components/eventDisplay/eventTable.svelte";
	import NewEventDialog from "$lib/components/eventInputs/event/newEventDialog.svelte";

  const { gameTitle } = settings;

</script>

<Heading className="text-center" level={1}>Let's write <em>{gameTitle}</em></Heading>

<div class="my-4 w-full flex items-center justify-center">
  <NewEventDialog />
</div>

<EventTable />