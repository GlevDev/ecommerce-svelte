<script>
  import globalStore from '../../stores/globalStore.js';
  import cart from '../../stores/cart.js';
  $: total = $cart.reduce((acc, curr) => {
    return acc += curr.amount
  }, 0);
</script>

<div class="btn-cart-container">
  <button class="btn-cart-toggle" on:click={() => globalStore.toggleItem("cart", true)}>
    <i class="fas fa-cart-plus"></i>
  </button>
  <span class="btn-cart-items">{total}</span>
</div>