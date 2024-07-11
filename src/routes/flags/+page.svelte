<script lang='ts'>
	import NewThingDialog from "$lib/components/eventInputs/event/new-thing-dialog.svelte";
	import FlagTable from "$lib/components/eventInputs/flags/flag-table.svelte";


</script>

<FlagTable />

<div class="w-full flex items-center justify-center">
  <div class="w-1/2">
    <NewThingDialog purpose="flag" stub />
  </div>
</div>