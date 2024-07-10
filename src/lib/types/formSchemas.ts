import { z } from "zod";

import { eventStore, currentEvent } from "$lib/stores/eventStore.js";

const objWithTitleAndSlugSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(60, "Title must not be longer than 60 characters"),
  slug: z
    .string({ required_error: "Set a valid slug" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only be lowercase letters and numbers separated by hyphens")
    .min(3, "Slug must be at least 3 characters.")
    .max(30, "Slug must not be longer than 30 characters"),
})

export const newEventSchema = objWithTitleAndSlugSchema.superRefine((obj, ctx) => {
  if (eventStore.allEventNames().includes(obj.title)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Title must be unique among events",
      path: ["title"],
    });
  }
  if (eventStore.allEventSlugs().includes(obj.slug)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Slug must be unique among events",
      path: ["slug"],
    });
  }
});

export const newScreenSchema = objWithTitleAndSlugSchema.superRefine((obj, ctx) => {
  if (currentEvent.allScreenTitles().includes(obj.title)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Title must be unique among this events screens",
      path: ["title"],
    });
  }
  if (currentEvent.allScreenSlugs().includes(obj.slug)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Slug must be unique among this events screens",
      path: ["slug"],
    });
  }
});