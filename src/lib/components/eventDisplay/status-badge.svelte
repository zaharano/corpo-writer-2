<script lang='ts'>
	import Badge from "../ui/badge/badge.svelte";
  import * as Button from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
 
  export let className: string = '';
  export let status: string;
  export let handleChange: (status: 'draft' | 'published' | 'archived') => void;

  function determineClass(status: string) {
    switch (status) {
      case 'draft':
        return 'bg-destructive text-destructive-foreground ' + className;
      case 'published':
        return '' + className;
      case 'archived':
        return 'bg-muted text-muted-foreground ' + className;
      default:
        return '' + className;
    }
  }

  $: style = determineClass(status);
  const statuses = ['draft', 'published', 'archived'];
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

