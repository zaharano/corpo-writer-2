// unused one-form schema
// create validation that just checks all this?

import { z } from 'zod';
import { type SuperForm, type Infer } from 'sveltekit-superforms';

import { metaFormSchema } from '$lib/components/eventInputs/meta/meta-form.svelte';
import { screenFormSchema } from '$lib/components/eventInputs/screen/screen-form.svelte';
import { effectsFormSchema } from '$lib/components/eventInputs/effects/effects-fields.svelte';

export const writerMetaSchema = z.object({
  status: z.enum(["draft", "completed", "validated", "archived"]),
  notes: z.string().optional(),
  valid: z.boolean().default(false),
  errors: z.array(z.record(z.string())).optional(),
});

export const eventFormSchema = z.object({
  id: z.string().uuid(),
  meta: metaFormSchema,
  screens: z.array(screenFormSchema),
  startScreen: z.string().uuid(),
  effects: z.object({
    onStart: effectsFormSchema.optional(),
    onEnd: effectsFormSchema.optional(),
  }).optional(),
  writerMeta: writerMetaSchema,
});

export type EventFormSchema = typeof eventFormSchema;

export type SuperFormEvent = SuperForm<Infer<EventFormSchema>>