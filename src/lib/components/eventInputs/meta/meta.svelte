<script lang='ts'>
  import { currentEvent } from "$lib/stores";
	import { get } from "svelte/store";
	import Heading from "../../ui/typography/heading.svelte";
	import Separator from "../../ui/separator/separator.svelte";
	import MetaForm from "./meta-form.svelte";

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