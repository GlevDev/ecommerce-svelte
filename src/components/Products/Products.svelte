<script>
  import { onMount, onDestroy } from "svelte";
  import products from '../../stores/defaultProducts';
  let localProducts = [];
  onMount(() => {
    products.subscribe(value => {
      console.log(value);
      localProducts = value;
    })
  });
</script>

<h1>Products component</h1>
{#each localProducts as product}
  <h2>{product.title}</h2>
{/each}