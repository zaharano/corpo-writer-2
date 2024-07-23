<script lang='ts'>
	import Heading from "$lib/components/ui/typography/heading.svelte";
  import {Separator} from "$lib/components/ui/separator/index";
  import ScreenTable from "$lib/components/eventInputs/screen/screen-table.svelte";
	import NewThingDialog from "$lib/components/eventInputs/event/new-thing-dialog.svelte";
</script>

<div class="space-y-6">
  <div>
    <Heading level={3}>Screens</Heading>
    <p class="text-sm text-muted-foreground">The screens that make up this event</p>
  </div>
  <Separator />
  <ScreenTable />
  <NewThingDialog purpose="screen"/>
</div>