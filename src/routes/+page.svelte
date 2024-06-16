<script lang='ts'>
  import Heading from "$lib/components/ui/typography/heading.svelte";
  import {Button} from "$lib/components/ui/button/index";
  import {onMount} from "svelte";
  import settings from "$lib/settings";
	import { Event } from "$lib/classes/eventClasses";
  import { eventStore } from "$lib/stores/eventStore";
	import EventTable from "$lib/components/eventDisplay/eventTable.svelte";
	import NewEventDialog from "$lib/components/eventInputs/newEventDialog.svelte";
  
  const { gameID, gameTitle } = settings;

  let events = eventStore;

  onMount(() => {
    const data = window.localStorage.getItem(gameID);
    if (data) {
      events.loadSavedEvents(JSON.parse(data));
    }
  });

</script>

<Heading level={1}>Let's write <em>{gameTitle}</em></Heading>

<Button class='mx-auto' on:click={() => events.addEvent(new Event)}>Add an Event</Button>
<NewEventDialog />

<EventTable />