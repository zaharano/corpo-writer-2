// no page.server.ts - or server-side validation - for now!

// import { superValidate } from "sveltekit-superforms";
// import { zod } from "sveltekit-superforms/adapters";
// import { type Actions, fail } from "@sveltejs/kit";
// import { metaFormSchema } from "$lib/components/eventInputs/meta/meta-form.svelte";
// import type { PageServerLoad } from "./$types.js";

// export const load: PageServerLoad = async () => {
// 	return {
// 		form: await superValidate(zod(metaFormSchema)),
// 	};
// };

// export const actions: Actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event, zod(metaFormSchema));
// 		if (!form.valid) {
// 			return fail(400, {
// 				form,
// 			});
// 		}
// 		return {
// 			form,
// 		};
// 	},
// };