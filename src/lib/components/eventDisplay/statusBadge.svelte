<script lang='ts'>
	import Badge from "../ui/badge/badge.svelte";

  export let className: string;
  export let status: string;

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

  let style = determineClass(status);
</script>

<Badge class={style}>{status}</Badge>