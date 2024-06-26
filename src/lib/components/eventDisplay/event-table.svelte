<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";
  import StatusPopover from "../eventInputs/meta/status-popover.svelte";

  import { eventStore } from "$lib/stores/eventStore";
	import DeleteDialog from "../eventInputs/event/delete-dialog.svelte";

  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' },
  ];
</script>

<Table.Root>
  <Table.Caption>{$eventStore.length > 0 ? 'A table of events' : 'No events yet'}</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-1/2">Title</Table.Head>
      <Table.Head class="w-[70px] text-center">Status</Table.Head>
      <Table.Head class="w-[70px] text-center">Random</Table.Head>
      <Table.Head class="text-right">Screen #</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $eventStore as event, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{event.meta.title}</Table.Cell>
        <Table.Cell>
          <StatusPopover status={event.writerMeta.status} handleChange={(status) => {
            eventStore.editEvent(event.id, {
              ...event,
              writerMeta: {
                status,
              }
            });
          }} />
        </Table.Cell>
        <Table.Cell class="text-center">
          {#if !event.meta.random}
            <Check class="m-auto"/>
          {/if}
        </Table.Cell>
        <Table.Cell class="text-right">{Object.keys(event.screens).length}</Table.Cell>
        <Table.Cell class="max-w-8">
           
          <a href={"/events/"+ event.meta.slug}>
            <Button>Edit</Button>
          </a>

          <DeleteDialog handleDelete={() => {
            eventStore.removeEvent(event.id);
          }} />

        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>