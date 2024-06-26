<script lang="ts">
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import StatusBadge from "$lib/components/eventDisplay/statusBadge.svelte";

  export let status : 'draft' | 'published' | 'archived';
  export let handleChange: (status: 'draft' | 'published' | 'archived') => void;

  const statuses = ['draft', 'published', 'archived']
</script>

<Popover.Root>
  <Popover.Trigger>
    <StatusBadge className="mx-auto" status={status} />
  </Popover.Trigger >
  <Popover.Content class='w-44'>
    <Select.Root onSelectedChange={(v) => {
      // @ts-ignore Not worth fixing
      v && (status = v.value);
      handleChange(status);
    }}>
      <Select.Trigger class="w-full">
        <Select.Value placeholder={status} />
      </Select.Trigger>
      <Select.Content>
        {#each statuses as s}
          <Select.Item value={s} label={s}>
            {s}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </Popover.Content>
</Popover.Root>

<!-- onSelectedChange={(sel) => {
  $currentEvent.editScreen(screen.id, {
    ...screen,
    writerMeta: {
      status: sel.value,
    }
  });
}} -->