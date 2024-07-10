<script lang='ts'>
	import Badge from "../ui/badge/badge.svelte";
  import * as Button from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { statuses, type Status } from "$lib/classes/eventClasses";
 
  export let className: string = '';
  export let status: Status;
  export let handleChange: (status: Status) => void;

  function determineClass(status: Status) {
    switch (status) {
      case 'draft':
        return 'bg-destructive text-destructive-foreground ' + className;
      case 'completed':
        return '' + className;
      case 'validated':
        return 'bg-success text-success-foreground ' + className;
      case 'archived':
        return 'bg-muted text-muted-foreground ' + className;
      default:
        return '' + className;
    }
  }

  $: style = determineClass(status);
</script>
 
<DropdownMenu.Root>
  <DropdownMenu.Trigger class='w-full'>
    <Badge class={style}>
      {status}
    </Badge>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-[70px]">
    <DropdownMenu.RadioGroup bind:value={status} onValueChange={(v) => {
      // @ts-ignore Not worth fixing
      v && (status = v);
      // @ts-ignore Not worth fixing
      handleChange(status);
    }}>
      {#each statuses as s}
        <DropdownMenu.RadioItem value={s}>{s}</DropdownMenu.RadioItem>
      {/each}
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>

