<script lang='ts'>
	import type { Event, EventMeta } from "$lib/classes/eventClasses";
  import {Switch} from "$lib/components/ui/switch/index.js";
  import {Label} from "$lib/components/ui/label/index.js";
  import {Input} from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";

  import { currentEvent } from "$lib/stores/eventStore.js";
	import { get } from "svelte/store";
	import Heading from "../ui/typography/heading.svelte";
	import Separator from "../ui/separator/separator.svelte";
	import MetaForm from "../../../routes/events/[slug]/meta-form.svelte";

  let { title, slug, repeatable, random, priority, rarity, requires } = $currentEvent.meta;

  function saveMeta() {
    let ce = get(currentEvent);
    ce.meta = { title, slug, repeatable, random, priority, rarity, requires };
    currentEvent.set(ce);
  }
</script>

<div class="space-y-6">
  <div>
    <Heading level={3}>Meta</Heading>
    <p class="text-sm text-muted-foreground">The event's metadata</p>
  </div>
<Separator />
</div>
<MetaForm />
<!-- 
<div class="space-y-8">
  <div class="space-y-1">
    <Label for="title">Title</Label>
    <Input 
      type="text" 
      id="title" 
      bind:value={title} 
      on:change={saveMeta}
    />
    <p class="muted text-sm">
      The title of the event. Must be unique.
    </p>
  </div>
  <div class="space-y-1">
    <Label for="slug">Slug</Label>
    <Input type="text" id="slug" bind:value={slug} on:change={saveMeta}/>
  </div>
  <div class="content-center">
    <Label for="repeatable">Repeatable</Label>
    <Switch id="repeatable" bind:checked={repeatable} on:click={saveMeta}/>
  </div>
  <div class="content-center">
    <Label for="random">Random</Label>
    <Switch id="random" bind:checked={random} on:click={saveMeta}/>
  </div>
  <div>
    <Label for="priority">Priority</Label>
    <Input type="number" id="priority" bind:value={priority} on:change={saveMeta}/>
  </div>
  <div>
    <Label for="rarity">Rarity</Label>
    <Input type="number" id="rarity" bind:value={rarity} on:change={saveMeta}/>
  </div>
  <div> -->
    <!-- <Requires {requires} /> -->
  <!-- </div>
</div> -->