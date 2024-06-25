<script lang='ts'>
  import { currentEvent } from "$lib/stores/eventStore";
  import * as Table from "$lib/components/ui/table/index.js";
  import StatusBadge from "$lib/components/eventDisplay/statusBadge.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Check } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";

  let { screens } = $currentEvent;
</script>

