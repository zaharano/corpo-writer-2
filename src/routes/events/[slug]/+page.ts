import { get } from 'svelte/store';

import { eventStore } from '$lib/stores/eventStore';

/** @type {import('./$types').PageLoad} */
export function load({params}) {
  const slug = params.slug;
  return {
    event: get(eventStore).find((e) => e.meta.slug === slug)
  }
}