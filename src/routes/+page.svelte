<script lang='ts'>
  import Heading from "$lib/components/ui/typography/heading.svelte";
  import settings from "$lib/settings";
	import EventTable from "$lib/components/eventDisplay/event-table.svelte";
  import NewThingDialog from "$lib/components/eventInputs/event/new-thing-dialog.svelte";

  import { Event, Flag } from "$lib/classes/eventClasses";
  import { browser } from "$app/environment"
  import { get } from "svelte/store";
  import { eventStore, flagStore } from "$lib/stores";

  let initEvents : Event[] = [];
  let initFlags : Flag[] = [];

  if (browser) {
    const data = window.localStorage.getItem(settings.gameID);
    if (data) {
      initEvents = JSON.parse(data)?.events || [];
      initFlags = JSON.parse(data)?.flags || [];
    }
  }

  eventStore.load(initEvents);
  flagStore.load(initFlags);

  eventStore.subscribe((events) => {
    if (browser) {
      window.localStorage.setItem(settings.gameID, JSON.stringify({events, flags: get(flagStore)}));
    }
    eventStore.updateLists();
  });

  flagStore.subscribe((flags) => {
    if (browser) {
      window.localStorage.setItem(settings.gameID, JSON.stringify({events: get(eventStore), flags}));
    }
  });
    
  const { gameTitle } = settings;



</script>

<Heading className="my-10 text-center" level={1}>Let's write <em>{gameTitle}</em></Heading>

<EventTable />

<div class="w-full flex items-center justify-center">
  <div class="w-1/2">
    <NewThingDialog purpose="event" />
  </div>
</div>