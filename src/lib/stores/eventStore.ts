import { writable, get } from "svelte/store";
import { Event } from "$lib/classes/eventClasses";
import type { ID } from "$lib/classes/eventClasses";
import { eventStore } from ".";

// confirm: runs once?
// Decide - loading from store means new Event(event) for each, or just the data?
// methods on Event class requires the former. 
// export const eventStore = createEventStore(init);
// export const currentEvent = createCurrentEventStore(initEvent);
// export const currentScreen = createCurrentScreenStore();
// export const currentOption = createCurrentOptionStore();


export function createEventStore(init : Event[] = []) {
  const { subscribe, update, set } = writable(init);

  // Storing these when store changes in case performance is an issue
  // didn't want to think about putting list access method in a hot path
  let _allSimplifiedEvents = new Set<{id: ID, title: string}>();
  let _allEventTitles = new Set<string>();
  let _allSlugs = new Set<string>();

  const updateLists = () => {
    _allSimplifiedEvents = new Set<{id: ID, title: string}>();
    _allEventTitles = new Set<string>();
    _allSlugs = new Set<string>();
    const events = get(eventStore);
    events.forEach((e) => {
      _allSimplifiedEvents.add({id: e.id, title: e.meta.title});
      _allEventTitles.add(e.meta.title);
      _allSlugs.add(e.meta.slug);
    });
  }

  const loadSavedEvents = (events : Event[]) => {
    set(events);
  }

  const addEvent = (title: string, slug: string) => {
    update(events => [...events, new Event(title, slug)]);
  }

  const removeEvent = (id: ID) => {
    update(events => events.filter((e) => e.id !== id));
  }

  const editEvent = (id: ID, event: Event) => {
    update(events => events.map((e) => (e.id === id ? event : e)));
  }

  const getEventBySlug = (slug: string) => {
    const events = get(eventStore);
    return events.find((e) => e.meta.slug === slug);
  }

  const getEventById = (id: ID) => {
    const events = get(eventStore);
    return events.find((e) => e.id === id);
  }

  const allSimplifiedEvents = () => {
    // const events = get(eventStore);
    // return events.map((e) => ({id: e.id, name: e.meta.title}));
    return Array.from(_allSimplifiedEvents);
  }

  const allEventNames = () => {
    // const events = get(eventStore);
    // return events.map((e) => e.meta.title);
    return Array.from(_allEventTitles);
  }

  const allEventSlugs = () => {
    // const events = get(eventStore);
    // return events.map((e) => e.meta.slug);
    return Array.from(_allSlugs);
  }

  return {
    subscribe,
    addEvent,
    removeEvent,
    editEvent,
    loadSavedEvents,
    getEventBySlug,
    getEventById,
    allEventNames,
    allEventSlugs,
    allSimplifiedEvents,
    updateLists,
  };
}

