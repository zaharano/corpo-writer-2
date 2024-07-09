import { get, writable } from "svelte/store";
import { Flag } from "../classes/eventClasses";
import type { ID } from "$lib/classes/eventClasses";
import { flagStore } from ".";

export function createFlagStore(init: Flag[] = []) {
  const { subscribe, update, set } = writable(init);

  const load = (flags: Flag[]) => {
    set(flags);
  }

  const addFlag = (title: string, slug: string) => {
    update(flags => [...flags, new Flag(title, slug)]);
  }

  const removeFlag = (id: ID) => {
    // TODO: prevent removal of flags if they are used
    update(flags => flags.filter((f) => f.id !== id));
  }

  const allSimplifiedFlags = () => {
    const flags = get(flagStore);
    return flags.map((f) => ({id: f.id, name: f.name}));
  }

  return {
    subscribe,
    update,
    set,
    load,
    addFlag,
    removeFlag,
    allSimplifiedFlags,
  }
}