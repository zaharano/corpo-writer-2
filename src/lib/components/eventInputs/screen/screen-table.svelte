<script lang='ts'>
  import { currentEvent } from "$lib/stores/eventStore";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";
	import DeleteDialog from "../event/delete-dialog.svelte";
	import StatusBadge from "$lib/components/eventDisplay/status-badge.svelte";

</script>

<Table.Root>
  <!-- <Table.Caption>{$currentEvent.screens.length > 0 ? 'All screens for this event' : 'No screens yet'}</Table.Caption> -->
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-3/5">Title</Table.Head>
      <Table.Head class="w-[100px] text-center">Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $currentEvent.screens as screen, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{screen.title}</Table.Cell>
        <Table.Cell>
          <StatusBadge status={screen.writerMeta.status} handleChange={(status) => {
            currentEvent.editScreen(screen.id, {
              ...screen,
              writerMeta: {
                status,
              }
            });
          }} />
        </Table.Cell>
        <Table.Cell class="max-w-8">
           
          <a href={"screens/" + screen.slug}>
            <Button>Edit</Button>
          </a>

          <DeleteDialog handleDelete={() => {
            currentEvent.removeScreen(screen.id);
          }} />

        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>