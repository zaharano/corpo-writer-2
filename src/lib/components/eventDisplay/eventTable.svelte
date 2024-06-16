<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import StatusBadge from "$lib/components/eventDisplay/statusBadge.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";

  import type { Event } from "$lib/classes/eventClasses";

  import { eventStore } from "$lib/stores/eventStore";

</script>
 
<Table.Root>
  <Table.Caption>{$eventStore.length > 0 ? 'A table of events' : 'No events yet'}</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>Title</Table.Head>
      <Table.Head class="w-[80px]">Status</Table.Head>
      <Table.Head class="w-[80px]">Random</Table.Head>
      <Table.Head class="text-right">Screen #</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $eventStore as event, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">{event.meta.title}</Table.Cell>
        <Table.Cell>
          <StatusBadge status={event.writerMeta.status} />
        </Table.Cell>
        <Table.Cell class="text-center">
          {#if !event.meta.random}
            <Check />
          {/if}
        </Table.Cell>
        <Table.Cell class="text-right">{Object.keys(event.screens).length}</Table.Cell>
        <Table.Cell>
          <Button on:click={() => eventStore.removeEvent(event.id)}>Delete</Button>
          <a href={"/events/"+ event.meta.slug}>
            <Button>Edit</Button>
          </a>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>