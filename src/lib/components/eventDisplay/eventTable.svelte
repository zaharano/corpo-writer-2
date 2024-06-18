<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import StatusBadge from "$lib/components/eventDisplay/statusBadge.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";

  import { eventStore } from "$lib/stores/eventStore";

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
          <Popover.Root>
            <Popover.Trigger>
              <StatusBadge className="mx-auto" status={event.writerMeta.status} />
            </Popover.Trigger >
            <Popover.Content class='w-44'>
              <Select.Root
                onSelectedChange={() => {
                  eventStore.editEvent(event.id, {
                    ...event,
                    writerMeta: {
                      status: event.writerMeta.status,
                    }
                  });
                }}
              >
                <Select.Trigger class="w-full">
                  <Select.Value placeholder="Select status" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Status</Select.Label>
                    {#each statuses as status}
                      <Select.Item value={status.label} label={status.label}
                        >{status.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="status" />
              </Select.Root>
            </Popover.Content>
          </Popover.Root>
        </Table.Cell>
        <Table.Cell class="text-center">
          {#if !event.meta.random}
            <Check class="m-auto"/>
          {/if}
        </Table.Cell>
        <Table.Cell class="text-right">{Object.keys(event.screens).length}</Table.Cell>
        <Table.Cell class="max-w-8">
          <Button on:click={() => eventStore.removeEvent(event.id)}>Delete</Button>
          <a href={"/events/"+ event.meta.slug}>
            <Button>Edit</Button>
          </a>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>