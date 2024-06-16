<script lang='ts'>
	export let data;

  if (data) {
    console.log(data);
  }
</script>

<h1>Event Page</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
