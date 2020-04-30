<script>
  export let id;
  export let location;
  import {addToCart} from '../stores/cart';
  import globalStore from '../stores/globalStore';
  import products from '../stores/products';
  import Loading from '../components/Loading.svelte';
  import { link } from 'svelte-routing';

  $: product = $products.find(item => item.id === +id);
</script>

<svelte:head>
  <title>{!product ? "produit" : product.title}</title>
</svelte:head>
{#if !product}
  <Loading />
{:else}
  <section class="single-product">
    <!-- bouton retour -->
    <a href="/products" use:link class="btn-primary">Retour</a>
    <div class="single-product-container">
      <article class="single-product-image">
        <img src={product.image} alt={product.title}>
      </article>
      <article>
        <h1>{product.title}</h1>
        <h2>{product.price}€</h2>
        <p>{product.description}</p>
        <button class="btn-primary btn-block" on:click="{() => {
          addToCart(product);
          globalStore.toggleItem('cart', true)
          }}"
        >ajouter au panier</button>
      </article>
    </div>
  </section>
{/if}