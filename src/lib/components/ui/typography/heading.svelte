<script lang="ts">
  import { cn } from '$lib/utils';
  export let level = 1;
  export let as = 'h1';

  export let className : string | undefined = undefined;

  function determineClass(level) {
    switch (level) {
      case 1:
        return 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
      case 2:
        return 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0';
      case 3:
        return 'scroll-m-20 text-2xl font-semibold tracking-tight';
      case 4:
        return 'scroll-m-20 text-xl font-semibold tracking-tight';
      default:
        return 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
    }
  }

  let style = determineClass(level);
  // let style = 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
  // const determineClass = (level) => {
  //   switch (level) {
  //     case 1:
  //       return 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
  //     case 2:
  //       return 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0';
  //     case 3:
  //       return 'scroll-m-20 text-2xl font-semibold tracking-tight';
  //     case 4:
  //       return 'scroll-m-20 text-xl font-semibold tracking-tight';
  //     default:
  //       return 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
  //   }
  // };
</script>

{#if as === 'h2'}
  <h2 class="{cn(style, className)}">
    <slot />
  </h2>
{:else if as === 'h3'}
  <h3 class="{cn(style, className)}">
    <slot />
  </h3>
{:else if as === 'h4'}
  <h4 class="{cn(style, className)}">
    <slot />
  </h4>
{:else}
  <h1 class="{cn(style, className)}">
    <slot />
  </h1>
{/if}