
<script lang="ts" context="module">
	import { text } from "@sveltejs/kit";
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
      .max(30, "Slug must not be longer than 30 characters"),
    text: z
      .string()
      .min(3, "Text must be longer than 3 characters")
      .max(500, "Text must not be longer than 500 characters")
	});

	export type ScreenFormSchema = typeof screenFormSchema;
</script>