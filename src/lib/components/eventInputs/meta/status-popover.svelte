<!-- This was dropped in favor of status-badge dropdown/radio -->

<script lang="ts">
	import { statuses, type Status } from "$lib/classes/eventClasses";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";

  export let status : Status
  export let handleChange: (status: Status) => void;
</script>

<Popover.Root>
  <Popover.Trigger class='w-full'>
  </Popover.Trigger >
  <Popover.Content class='w-44'>
    <Select.Root open={true} onSelectedChange={(v) => {
      // @ts-ignore Not worth fixing
      v && (status = v.value);
      handleChange(status);
    }}>
      <Select.Trigger class="w-full">
        <!-- <Select.Value placeholder={status} /> -->
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