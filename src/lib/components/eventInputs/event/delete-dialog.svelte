<script lang='ts'>
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button/index.js";

  export let handleDelete: () => void = () => {};
  export let thingToDelete: string = 'event'

  let className: string | undefined = undefined;
  export { className as class };
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class={className}><Button class={className} variant="destructive">Delete</Button></AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this {thingToDelete} and all of its contents.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>
        <slot><Button on:click={handleDelete}>Delete</Button></slot>
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>