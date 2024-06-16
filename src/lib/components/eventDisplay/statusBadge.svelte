<script lang='ts'>
	import Badge from "../ui/badge/badge.svelte";

  export let status: string;

  function determineClass(status: string) {
    switch (status) {
      case 'draft':
        return 'bg-destructive text-destructive-foreground';
      case 'published':
        return '';
      case 'archived':
        return 'bg-muted text-muted-foreground';
      default:
        return '';
    }
  }

  let style = determineClass(status);
</script>

<Badge class={style}>{status}</Badge>