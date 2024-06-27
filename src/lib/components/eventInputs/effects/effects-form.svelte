
<script lang="ts" context="module">
	import { z } from "zod";

  const gameVFXFormSchema = z.object({
    typeSpeed: z.coerce.number().int().min(1).max(100),
    tracker: z.boolean(),
    enhancedTracker: z.boolean(),
    flicker: z.boolean(),
    curruption: z.boolean(),
    ghost: z.boolean(),
  })

  const gameEffectsFormSchema = gameVFXFormSchema.extend({
    performance: z.coerce.number().int().min(-100).max(100).default(0).optional(),
    time: z.coerce.number().int().min(0).max(100).default(0).optional(),
    newEnemy: z.string().optional(),
    newDepartment: z.string().optional(),
    promotion: z.string().optional(),
    demotion: z.string().optional(),
  })

  const addEventSchema = z.object({
    event: z.string(),
    time: z.coerce.number().int().min(0).max(50),
  }).superRefine((obj, ctx) => {
    // rewrite this to check that event exists.
    if (obj.event === "schedule" && obj.time === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Time must be greater than 0",
      })
    }
  })

  const eventListSchema = z.array(z.string()).superRefine((obj, ctx) => {
    // rewrite to check that all events exist
    if (obj.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one event",
      })
    }
  })

  const removeFlagSchema = z.array(z.string()).superRefine((obj, ctx) => {
    // rewrite to check that all flags exist
    if (obj.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one flag",
      })
    }
  })
  
  const scheduleEventSchema = z.object({
    add: z.array(addEventSchema).optional(),
    remove: eventListSchema.optional(),
  })

  const eventChangeSchema = z.object({
    schedule: z.array(scheduleEventSchema).optional(),
    lock: eventListSchema.optional(),
    unlock: eventListSchema.optional(),
  })

  export const effectsFormSchema = z.object({
    addFlags: z.array(z.string()).optional(),
    removeFlags: removeFlagSchema.optional(),
    editEvents: eventChangeSchema.optional(),
  }).merge(gameEffectsFormSchema)
</script>