<script lang='ts'>
  import { currentEvent } from "$lib/stores/eventStore";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";
	import DeleteDialog from "../event/delete-dialog.svelte";
	import OptionSheet from "./option-sheet.svelte";
	import Heading from "$lib/components/ui/typography/heading.svelte";

  export let options = [];
</script>


<div>
  <Heading level={4}>Options</Heading>
  <p class="text-sm text-muted-foreground">The options available to the player at this screen.</p>
</div>
<Table.Root>
  <!-- <Table.Caption>{$currentEvent.screens.length > 0 ? 'All screens for this event' : 'No screens yet'}</Table.Caption> -->
  <Table.Header>
    <Table.Row>
      <Table.Head class="">Text</Table.Head>
      <Table.Head class="w-[160px] text-right"></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each options as option, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{option.text.slice(0,20) + '...'}</Table.Cell>
        <Table.Cell>
          <OptionSheet option={option} />
          <DeleteDialog handleDelete={() => {
            currentEvent.removeScreen(screen.id);
          }} />
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>