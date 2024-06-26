<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";

  import { page } from "$app/stores";

  const { slug, screenSlug } = $page.params;
</script>
 
<Tabs.Root value="details" class="w-full">
  <Tabs.List>
    <Tabs.Trigger value="details">Account</Tabs.Trigger>
    <Tabs.Trigger value="options">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="details">
    Make changes to your account here.
    <slot />
  </Tabs.Content>
  <Tabs.Content value="options">Change your password here.</Tabs.Content>
</Tabs.Root>