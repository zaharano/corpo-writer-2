<script lang='ts'>
	import Heading from "$lib/components/ui/typography/heading.svelte";
	// import Meta from "$lib/components/eventInputs/meta.svelte";
  import {Separator} from "$lib/components/ui/separator/index";
  import MetaForm from "$lib/components/eventInputs/meta/meta-form.svelte";

  // import type { PageData } from "./$types.js";
	// export let data: PageData;
</script>

<div class="space-y-6">
  <div>
    <Heading level={3}>Meta</Heading>
    <p class="text-sm text-muted-foreground">The event's metadata</p>
  </div>
  <Separator />
  <MetaForm />
</div>