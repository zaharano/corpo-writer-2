import { writable, get } from "svelte/store";
import { Event } from "$lib/classes/eventClasses";
import { browser } from "$app/environment"
import settings from "$lib/settings";
import { page } from "$app/stores";

let init : Event[] = [];
let initEvent : Event | undefined;

if (browser) {
  const data = window.localStorage.getItem(settings.gameID);
  if (data) {
    init = JSON.parse(data);
  }
}

export let eventStore = createEventStore(init);
export let currentEvent = createCurrentEventStore(initEvent);

// Save any time the eventStore changes
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

  const getEventBySlug = (slug: string) => {
    const events = get(eventStore);
    return events.find((e) => e.meta.slug === slug);
  }

  const allEventNames = () => {
    const events = get(eventStore);
    return events.map((e) => e.meta.title);
  }

  const allEventSlugs = () => {
    const events = get(eventStore);
    return events.map((e) => e.meta.slug);
  }

  return {
    subscribe,
    addEvent,
    removeEvent,
    editEvent,
    loadSavedEvents,
    getEventBySlug,
    allEventNames,
    allEventSlugs
  };
}

export function createCurrentEventStore(initEvent : Event | null = null) {
  if (initEvent === null) {
    initEvent = new Event();
  }
  const { subscribe, update, set } = writable(initEvent);

  const save = () => {
    const event = get(currentEvent);
    eventStore.editEvent(event.id, event);
  }

  const load = (event: Event) => {
    set(event);
  }

  return {
    subscribe,
    load,
    save,
    update,
    set,
  };
}