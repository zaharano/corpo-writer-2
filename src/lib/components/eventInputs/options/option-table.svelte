<script lang='ts'>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Check } from "lucide-svelte";
  import { Option } from "$lib/classes/eventClasses";
	import DeleteDialog from "../event/delete-dialog.svelte";
	import OptionSheet from "./option-sheet.svelte";
  import OptionForm from "./option-form.svelte";
	import Heading from "$lib/components/ui/typography/heading.svelte";

  export let form;

  const { form: formData } = form;

  function handleSave(newOption: Option) {
    formData.update((f) => {
      f.options = f.options.map((o) => {
        if (o.id === newOption.id) {
          return newOption;
        }
        return o;
      });
      return f;
    });
    // $formData.options = $formData.options.map((o) => {
    //   if (o.id === newOption.id) {
    //     return newOption;
    //   }
    //   return o;
    // });
  }

  // formData.subscribe((value) => {
  //   console.log(value);
  // });


</script>


<div>
  <Heading level={4}>Options</Heading>
  <p class="text-sm text-muted-foreground">The options available to the player at this screen.</p>
</div>
<Table.Root>
  <!-- <Table.Caption>{$currentEvent.screens.length > 0 ? 'All screens for this event' : 'No screens yet'}</Table.Caption> -->
  <Table.Header>
    <Table.Row>
      <Table.Head class="">Text</Table.Head>
      <Table.Head class="w-[160px] text-right"></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $formData.options as option, i (i)}
      <Table.Row>
        <!-- want to get this CSS to work -->
        <!-- class="font-medium text-nowrap overflow-clip text-ellipsis"> -->
        <Table.Cell class="font-medium">
          {option.text.length === 0 ?
            '(No text entered)' : 
            option.text.length > 60 ? 
            option.text.slice(0,60) + '...' :
            option.text}
        </Table.Cell>
        <Table.Cell>
          <OptionSheet >
            <Button slot="trigger">Edit</Button>
            <OptionForm slot="form" bind:option={$formData.options[i]} />
          </OptionSheet>
          <DeleteDialog handleDelete={() => {
            $formData.options = $formData.options.filter((o) => o.id !== option.id)}}/>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>