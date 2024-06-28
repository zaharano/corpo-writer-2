<script lang="ts">
  import { buttonVariants, Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import OptionForm from "./option-form.svelte";

  export let option;
</script>
 
<Sheet.Root open={true}>
  <Sheet.Trigger class={buttonVariants({ variant: "outline" })}>
    Edit
  </Sheet.Trigger>
  <Sheet.Content class='overflow-y-scroll w-[400px] sm:w-[540px]'>
    <Sheet.Header class="mb-4">
      <Sheet.Title>Option settings</Sheet.Title>
      <Sheet.Description>
        Edit this option.
      </Sheet.Description>
    </Sheet.Header>
    <OptionForm option={option} />
    <Sheet.Footer>
      <Button class='mt-4 w-full'>Save and Close</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>