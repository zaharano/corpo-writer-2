<script lang='ts'>
  import Heading from "$lib/components/ui/typography/heading.svelte";
  import settings from "$lib/settings";
	import EventTable from "$lib/components/eventDisplay/event-table.svelte";
  import NewThingDialog from "$lib/components/eventInputs/event/new-thing-dialog.svelte";

 
</script>

<Heading className="my-10 text-center" level={1}>Let's write <em>{settings.gameTitle}</em></Heading>

<EventTable />

<div class="w-full flex items-center justify-center">
  <div class="w-1/2">
    <NewThingDialog purpose="event" />
  </div>
</div>