<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";
  import { Separator } from "$lib/components/ui/separator/index";
	import { Label } from "$lib/components/ui/label";

  export let toggle = false;
</script>
  
  
<div class='space-y-2'>
  <Label><slot name='label'>Label</slot></Label>
  <Switch bind:checked={toggle} />
  <div class="text-[0.8rem] text-muted-foreground">
    <slot name='description'>Description</slot>
  </div>
</div>  

{#if toggle}
  <Separator />
  <div class="bg-stone-50 p-2 rounded-sm">
    <slot name='toggled' />
  </div>
{/if} 