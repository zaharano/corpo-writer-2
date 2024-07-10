import { Event, Flag } from "$lib/classes/eventClasses";
import { browser } from "$app/environment"
import settings from "$lib/settings";
import { createEventStore } from "./eventStore";
import { createFlagStore } from "./flagStore";
import { createCurrentEventStore } from "./currentEventStore";
import { get } from "svelte/store";

let initEvents : Event[] = [];
let initFlags : Flag[] = [];

if (browser) {
  const data = window.localStorage.getItem(settings.gameID);
  if (data) {
    initEvents = JSON.parse(data).events;
    initFlags = JSON.parse(data).flags;
  }
}

export const eventStore = createEventStore(initEvents);
export const flagStore = createFlagStore(initFlags);
export const currentEvent = createCurrentEventStore(null);

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

