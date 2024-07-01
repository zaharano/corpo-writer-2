<!-- Game Specific File -->
<script lang="ts" context="module">
	import { z } from "zod";
  const gameRequirements = z.object({
    minLevel: z.coerce.number({invalid_type_error: "Must be a number"}).int().min(0, "Must be more than 0").max(100, "Must be less than 100").or(z.null()),
    maxLevel: z.coerce.number({invalid_type_error: "Must be a number"}).int().min(0, "Must be more than 0").max(100, "Must be less than 100").or(z.null()),
  }).superRefine((obj, ctx) => {
    if (obj.minLevel && obj.maxLevel && obj.minLevel > obj.maxLevel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Minimum level must be less than maximum level",
        path: ["minLevel"],
      });
    }
  })

  export const objWithGameRequirements = z.object({
    gameReqs: gameRequirements,
  });

  export type ObjWithGameRequirements = typeof objWithGameRequirements;
</script>

<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import {Input} from "$lib/components/ui/input/index.js";

  export let form
  export let context = "event";

  const { form: formData } = form;
</script>

<Form.Field {form} name="requires.gameReqs.minLevel">
  <Form.Control let:attrs>
    <Form.Label>Min Level</Form.Label>
    <Input type="number" {...attrs} bind:value={$formData.requires.gameReqs.minLevel}/>
  </Form.Control>
  <Form.Description>
    Minimum player level required for this {context}.
  </Form.Description>
  <Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="requires.gameReqs.maxLevel">
  <Form.Control let:attrs>
    <Form.Label>Max Level</Form.Label>
    <Input type="number" {...attrs} bind:value={$formData.requires.gameReqs.maxLevel}/>
  </Form.Control>
  <Form.Description>
    Maximum player level required for this {context}.
  </Form.Description>
  <Form.FieldErrors />
</Form.Field>