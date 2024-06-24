<!-- Game Specific File -->
<script lang="ts" context="module">
	import { z } from "zod";
  const gameRequirements = z.object({
    maxLevel: z.coerce.number({invalid_type_error: "Must be a number"}).int().min(0, "Must be more than 0").max(100, "Must be less than 100").optional(),
    minLevel: z.coerce.number({invalid_type_error: "Must be a number"}).int().min(0, "Must be more than 0").max(100, "Must be less than 100").optional(),
  }).optional();

  export const objWithGameRequirements = z.object({
    gameReqs: gameRequirements,
  });

  export type ObjWithGameRequirements = typeof objWithGameRequirements;
</script>