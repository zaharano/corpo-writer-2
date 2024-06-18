<script>
	import '../app.css';
	// import {onMount} from "svelte";
  import settings from "$lib/settings";
  // import { eventStore } from "$lib/stores/eventStore";
	// const { gameID, gameTitle } = settings;

	// onMount(() => {
  //   const data = window.localStorage.getItem(gameID);
  //   if (data) {
  //     events.loadSavedEvents(JSON.parse(data));
  //   }
  // });

</script>

<main class="container mx-auto px-4">
	<slot></slot>
</main>

<style></style>
