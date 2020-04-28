<script>
  import globalStore from '../../stores/globalStore';
  import { fly, fade, blur } from 'svelte/transition';
  import { link } from 'svelte-routing';
  // itemList
  let user = false;
</script>

<div class="cart-overlay" transiton:blur>
  <div class="cart-container" transition:fly={{x: 1000}}>
    <div class="cart" transition:fade={{delay: 400}}>
      <!-- début entête -->
      <div class="cart-header">
        <button class="btn-close" on:click={() => {globalStore.toggleItem('cart', false)}}>
          <i class="fas fa-window-close" />
        </button>
        <h2 class="cart-title">your bag</h2>
        <span />
      </div>
      <!-- fin entête -->
      <!-- début produits -->
      <p>cart items</p>
      <!-- fin produits -->
      <!-- début footer -->
      <div class="cart-footer">
        {#if user}
          <a href="/checkout" use:link class="btn-primary btn-block" on:click={() => {globalStore.toggleItem('cart', false)}}>commander</a>
        {:else}
          <p class="cart-login">
            Avant de commander, merci de vous 
            <a href="/login" use:link on:click={() => {globalStore.toggleItem('cart', false)}}>connecter</a>
          </p>
        {/if}
      </div>
      <!-- fin footer -->
    </div>
  </div>
</div>