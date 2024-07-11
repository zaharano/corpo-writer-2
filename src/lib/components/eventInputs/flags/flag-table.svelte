<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check, Edit, Eye } from "lucide-svelte";

  import { flagStore } from "$lib/stores";
	import DeleteDialog from "$lib/components/eventInputs/event/delete-dialog.svelte"

  console.log($flagStore);
</script>

<Table.Root>
  <Table.Caption>{$flagStore.length > 0 ? '' : 'No flags yet'}</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-7/8">Title</Table.Head>
      <Table.Head class="w-8 text-center">Description</Table.Head>
      <Table.Head class="w-8 text-center">Default</Table.Head>
      <Table.Head class="w-8 text-center whitespace-nowrap">Set By</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $flagStore as flag, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">
          {flag.title} <Button size="icon" variant="ghost"><Edit size='18'/></Button></Table.Cell>
        <Table.Cell>
          <Button size="icon" variant="ghost"><Edit /></Button>
          <!-- make desc popover   -->
        </Table.Cell>
        <Table.Cell class="text-center">
          {#if flag.defaultValue}
            <Check class="m-auto"/>
          {/if}
        </Table.Cell>
        <Table.Cell class="text-right">
          <Eye />
          <!-- make set by display on hover -->
        </Table.Cell>
        <Table.Cell class="max-w-3">
          <DeleteDialog handleDelete={() => {
            flagStore.removeFlag(flag.id);
          }} />
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>