<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import * as Sheet from "$lib/components/ui/sheet";

  let open = false;
</script>
 
<Sheet.Root {open}>
  <Sheet.Trigger>
    <slot name="trigger"><Button>Edit</Button></slot>
  </Sheet.Trigger>
  <Sheet.Content class='overflow-y-scroll'>
    <Sheet.Header class="mb-4">
      <Sheet.Title>Option settings</Sheet.Title>
      <Sheet.Description>
        Edit this option.
      </Sheet.Description>
    </Sheet.Header>
    <slot name="form">No slotted form!</slot>
    <Sheet.Footer>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>