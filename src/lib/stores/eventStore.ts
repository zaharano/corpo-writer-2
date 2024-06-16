import { writable } from "svelte/store";
import { Event } from "$lib/classes/eventClasses";
import { browser } from "$app/environment"
import settings from "$lib/settings";

let init : Event[] = [];

if (browser) {
  const data = window.localStorage.getItem(settings.gameID);
  if (data) {
    init = JSON.parse(data);
  }
}

export let eventStore = createEventStore(init);

eventStore.subscribe((events) => {
  if (browser) {
    window.localStorage.setItem(settings.gameID, JSON.stringify(events));
  }
});

export function createEventStore(init : Event[] = []) {
  const { subscribe, update, set } = writable(init);

  const loadSavedEvents = (events : Event[]) => {
    set(events);
  }

  const addEvent = (event: Event) => {
    update(events => [...events, event]);
  }

  const removeEvent = (id: ReturnType<typeof crypto.randomUUID>) => {
    update(events => events.filter((e) => e.id !== id));
  }

  const editEvent = (id: ReturnType<typeof crypto.randomUUID>, event: Event) => {
    update(events => events.map((e) => (e.id === id ? event : e)));
  }

  const allEventNames = () => {
    return subscribe((events) => {
      return events.map((e) => e.meta.title);
    });
  }

  return {
    subscribe,
    addEvent,
    removeEvent,
    editEvent,
    loadSavedEvents,
    allEventNames
  };
}