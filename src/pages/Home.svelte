<script>
  import Hero from '../components/Hero.svelte';
  import { link } from 'svelte-routing'
  import Featured from '../components/Products/Featured.svelte';
</script>

<svelte:head>
  <title>A chacun son haltère</title>
</svelte:head>
<Hero>
  <a href="/products" class="btn btn-primary btn-hero" use:link>Achetez maintenant</a>
</Hero>
<Featured title="A l'affiche" />