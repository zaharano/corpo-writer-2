
<script lang="ts" context="module">
	import { z } from "zod";
	export const screenFormSchema = z.object({
		title: z
			.string()
			.min(6, "Title must be at least 6 characters.")
			.max(60, "Title must not be longer than 60 characters"),
		slug: z
      .string({ required_error: "Set a valid slug" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only be lowercase letters and numbers separated by hyphens")
      .min(6, "Slug must be at least 6 characters")
      .max(60, "Slug must not be longer than 60 characters"),
    repeatable: z.boolean(),
    random: z.boolean(),
    priority: z.number().int().min(0).max(100),
    rarity: z.number().int().min(0).max(100),
	});

    // I think something here is uneccessary because of no serverside
	export type ScreenFormSchema = typeof screenFormSchema;
</script>