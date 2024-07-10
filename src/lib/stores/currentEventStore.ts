import { writable, get } from "svelte/store";
import { Event, Screen } from "../classes/eventClasses";
import type { ID } from "../classes/eventClasses";
import { eventStore } from "./eventStore";

export const currentEvent = createCurrentEventStore(null);

export function createCurrentEventStore(initEvent : Event | null = null) {
  // not sure if this is necessary -
  if (initEvent === null) {
    initEvent = new Event("New Event", "new-event");
  }
  const { subscribe, update, set } = writable(initEvent);

  const save = () => {
    const event = get(currentEvent);
    eventStore.editEvent(event.id, event);
  }

  const load = (event: Event) => {
    set(event);
  }

  const addScreen = (title: string, slug: string) => {
    update((e) => {
      e.screens = [...e.screens, new Screen(title, slug)];
      console.log(e)
      return e;
    })
  }

  const removeScreen = (id: ID) => {
    update((e) => {
      if (e.startScreen === id) {
        // message - can't delete start screen
        return e;
      }
      e.screens = e.screens.filter((s) => s.id !== id);
      return e;
    })
  }

  const editScreen = (id: ID, screen: Screen) => {
    update((e) => {
      e.screens = e.screens.map((s) => (s.id === id ? screen : s));
      return e;
    })
  }

  const getScreenBySlug = (slug: string) => {
    const event = get(currentEvent);
    return event.screens.find((s) => s.slug === slug);
  }

  const allSimplifiedScreens = () => {
    const event = get(currentEvent);
    return event.screens.map((s) => ({id: s.id, name: s.title}));
  }

  const allScreenTitles = () => {
    const event = get(currentEvent);
    return event.screens.map((s) => s.title);
  }

  const allScreenSlugs = () => {
    const event = get(currentEvent);
    return event.screens.map((s) => s.slug);
  }

  return {
    subscribe,
    load,
    save,
    update,
    set,
    addScreen,
    removeScreen,
    editScreen,
    getScreenBySlug,
    allSimplifiedScreens,
    allScreenTitles,
    allScreenSlugs,
  };
}