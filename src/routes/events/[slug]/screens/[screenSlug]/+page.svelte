<script lang='ts'>
  import Heading from "$lib/components/ui/typography/heading.svelte";
  import {Separator} from "$lib/components/ui/separator/index";

  import { page } from "$app/stores";
  import { goto } from '$app/navigation';

  import { currentEvent } from "$lib/stores/eventStore";
	import ScreenForm from "$lib/components/eventInputs/screen/screen-form.svelte";

  const { slug, screenSlug } = $page.params;
  let screen = $currentEvent.screens.find(s => s.slug === screenSlug);
  if (!screen) {
    goto(`/events/${slug}`);
  }

  if (screen === undefined) {
    throw new Error("Screen is undefined.");
  }
</script>

<div class="space-y-6">
  <div>
    
    <Heading level={3}>Editing the screen <span class="bg-muted text-muted-foreground rounded-sm px-2 py-1">{screen.title}</span></Heading>
    <p class="text-sm text-muted-foreground">Changes saved automatically to the event, but the event must still be saved!</p>
  </div>
  <Separator />
  <ScreenForm {screen} />
</div>