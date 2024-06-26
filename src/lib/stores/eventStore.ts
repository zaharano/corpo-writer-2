import { writable, get } from "svelte/store";
import { Event, Screen } from "$lib/classes/eventClasses";
import type { ID } from "$lib/classes/eventClasses";
import { browser } from "$app/environment"
import settings from "$lib/settings";

let init : Event[] = [];
let initEvent : Event | undefined;

if (browser) {
  const data = window.localStorage.getItem(settings.gameID);
  if (data) {
    init = JSON.parse(data);
  }
}

// confirm: runs once?
// Decide - loading from store means new Event(event) for each, or just the data?
// methods on Event class requires the former. 
export const eventStore = createEventStore(init);
export const currentEvent = createCurrentEventStore(initEvent);

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

  const allEventNames = () => {
    const events = get(eventStore);
    return events.map((e) => e.meta.title);
  }

  const allEventSlugs = () => {
    const events = get(eventStore);
    return events.map((e) => e.meta.slug);
  }

  // Flag set is determined from all flag setting events and options
  const allPossibleFlags = () => {
    const events = get(eventStore);
    const flags = new Set<string>();
    events.forEach((e) => {
      if (e.effects?.onStart?.addFlags) {
        e.effects.onStart.addFlags.forEach((f) => {
          flags.add(f);
        });
      }
      if (e.effects?.onEnd?.addFlags) {
        e.effects.onEnd.addFlags.forEach((f) => {
          flags.add(f);
        });
      }
      e.screens.forEach((screen) =>{
        screen.options.forEach((o) => {
          o?.effects?.addFlags?.forEach((f) => {
            flags.add(f);
          });
        });
      });
    });
    return Array.from(flags);
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
    allPossibleFlags,
  };
}

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
    allScreenTitles,
    allScreenSlugs,
  };
}