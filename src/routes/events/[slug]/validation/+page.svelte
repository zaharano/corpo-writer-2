<script lang='ts'>
	import Heading from "$lib/components/ui/typography/heading.svelte";
  import {Separator} from "$lib/components/ui/separator/index";
  import ScreenTable from "$lib/components/eventInputs/screen/screen-table.svelte";
	import NewThingDialog from "$lib/components/eventInputs/event/new-thing-dialog.svelte";
	import SuperDebug from "sveltekit-superforms";
  import { currentEvent } from "$lib/stores";
</script>

<div class="space-y-6">
  <div>
    <Heading level={3}>Validation</Heading>
    <p class="text-sm text-muted-foreground">Check logged errors and </p>
  </div>
  <Separator />
  <SuperDebug data={$currentEvent.writerMeta.errors} />
</div>