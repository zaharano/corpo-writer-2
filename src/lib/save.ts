// this is unused (this code is in the root page, mostly)

import { Event, Flag } from "$lib/classes/eventClasses";
import { browser } from "$app/environment"
import settings from "$lib/settings";
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

export default { initEvents, initFlags }

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