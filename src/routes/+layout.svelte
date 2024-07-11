<script lang='ts'>
	import '../app.css';
	import { Event, Flag } from "$lib/classes/eventClasses";
  import { browser } from "$app/environment"
  import { get } from "svelte/store";
  import { eventStore, flagStore } from "$lib/stores";
  import settings from "$lib/settings";


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

<main class="container mx-auto px-4">
	<slot></slot>
</main>

<style></style>
