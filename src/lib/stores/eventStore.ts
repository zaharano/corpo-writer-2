import { writable, get } from "svelte/store";
import { Event, Screen, Option } from "$lib/classes/eventClasses";
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
export const currentScreen = createCurrentScreenStore();
export const currentOption = createCurrentOptionStore();

// Save any time the eventStore changes
eventStore.subscribe((events) => {
  if (browser) {
    window.localStorage.setItem(settings.gameID, JSON.stringify(events));
  }
  eventStore.updateLists();
});


export function createEventStore(init : Event[] = []) {
  const { subscribe, update, set } = writable(init);

  // Storing these when store changes in case performance is an issue
  // didn't want to think about putting list access method in a hot path
  let _allSimplifiedEvents = new Set<{id: ID, title: string}>();
  let _allEventTitles = new Set<string>();
  let _allSlugs = new Set<string>();
  let _allFlags = new Set<string>();

  const updateLists = () => {
    _allSimplifiedEvents = new Set<{id: ID, title: string}>();
    _allEventTitles = new Set<string>();
    _allSlugs = new Set<string>();
    _allFlags = new Set<string>();
    const events = get(eventStore);
    events.forEach((e) => {
      _allSimplifiedEvents.add({id: e.id, title: e.meta.title});
      _allEventTitles.add(e.meta.title);
      _allSlugs.add(e.meta.slug);
      if (e.effects?.onStart?.addFlags) {
        e.effects.onStart.addFlags.forEach((f) => {
          _allFlags.add(f);
        });
      }
      if (e.effects?.onEnd?.addFlags) {
        e.effects.onEnd.addFlags.forEach((f) => {
          _allFlags.add(f);
        });
      }
      e.screens.forEach((screen) =>{
        screen.options.forEach((o) => {
          o?.effects?.addFlags?.forEach((f) => {
            _allFlags.add(f);
          });
        });
      });
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

  // Flag set is determined from all flag setting events and options
  const allPossibleFlags = () => {
    // const events = get(eventStore);
    // const flags = new Set<string>();
    // events.forEach((e) => {
    //   if (e.effects?.onStart?.addFlags) {
    //     e.effects.onStart.addFlags.forEach((f) => {
    //       flags.add(f);
    //     });
    //   }
    //   if (e.effects?.onEnd?.addFlags) {
    //     e.effects.onEnd.addFlags.forEach((f) => {
    //       flags.add(f);
    //     });
    //   }
    //   e.screens.forEach((screen) =>{
    //     screen.options.forEach((o) => {
    //       o?.effects?.addFlags?.forEach((f) => {
    //         flags.add(f);
    //       });
    //     });
    //   });
    // });
    // return Array.from(flags);
    return Array.from(_allFlags);
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
    allSimplifiedEvents,
    updateLists,
  };
}

export function createCurrentEventStore(initEvent : Event | null = null) {
  // not sure if this is necessary -
  if (initEvent === null) {
    initEvent = new Event("New Event", "new-event");
  }
  const { subscribe, update, set } = writable(initEvent);

  // let _allSimplifiedScreens = new Set<{id: ID, title: string}>();
  // let _allScreenTitles = new Set<string>();
  // let _allSlugs = new Set<string>();

  // const updateLists = () => {
  //   _allSimplifiedScreens = new Set<{id: ID, title: string}>();
  //   _allScreenTitles = new Set<string>();
  //   _allSlugs = new Set<string>();
  //   const event = get(currentEvent);
  //   event.screens.forEach((s) => {
  //     _allSimplifiedScreens.add({id: s.id, title: s.title});
  //     _allScreenTitles.add(s.title);
  //     _allSlugs.add(s.slug);
  //   });
  // }

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
    allSimplifiedScreens,
    allScreenTitles,
    allScreenSlugs,
  };
}

function createCurrentScreenStore(screen: Screen | undefined = undefined) {
  const { subscribe, update, set } = writable(screen);

  const save = () => {
    const screen = get(currentScreen);
    if (!screen) return;
    currentEvent.editScreen(screen.id, screen);
  }

  const load = (screen: Screen) => {
    set(screen);
  }

  const editOption = (option: Option) => {
    update((s) => {
      s.options = s.options.map((o) => (o.id === option.id ? option : o));
      return s;
    })
  }

  return {
    subscribe,
    load,
    save,
    update,
    set,
    editOption
  };
}

function createCurrentOptionStore(option: Option | undefined = undefined) {
  const { subscribe, update, set } = writable(option);

  const save = () => {
    const option = get(currentOption);
    if (!option) return;
    currentScreen.editOption(option);
  }

  const load = (option: Option) => {
    set(option);
  }

  return {
    subscribe,
    load,
    save,
    update,
    set,
  };
}
