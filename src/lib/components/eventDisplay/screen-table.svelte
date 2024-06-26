<script lang='ts'>
  import { currentEvent } from "$lib/stores/eventStore";
  import * as Table from "$lib/components/ui/table/index.js";
  import StatusBadge from "$lib/components/eventDisplay/statusBadge.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";
  import StatusPopover from "../eventInputs/meta/status-popover.svelte";


  let { screens } = $currentEvent;


</script>

<Table.Root>
  <Table.Caption>{screens.length > 0 ? 'All screens for this event' : 'No screens yet'}</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-1/2">Title</Table.Head>
      <Table.Head class="w-[70px] text-center">Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each screens as screen, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{screen.title}</Table.Cell>
        <Table.Cell>
          <StatusPopover status={screen.writerMeta.status} handleChange={(status) => {
            $currentEvent.editScreen(screen.id, {
              ...screen,
              writerMeta: {
                status,
              }
            });
          }} />
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>