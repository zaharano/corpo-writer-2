<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import * as Sheet from "$lib/components/ui/sheet";
  import OptionForm from "./option-form.svelte";

  export let option;
  let open = false;
</script>
 
<Sheet.Root {open}>
  <Sheet.Trigger>
    <slot><Button>Edit</Button></slot>
  </Sheet.Trigger>
  <Sheet.Content class='overflow-y-scroll w-[400px] sm:w-[540px]'>
    <Sheet.Header class="mb-4">
      <Sheet.Title>Option settings</Sheet.Title>
      <Sheet.Description>
        Edit this option.
      </Sheet.Description>
    </Sheet.Header>
    <OptionForm {option} />
    <Sheet.Footer>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>