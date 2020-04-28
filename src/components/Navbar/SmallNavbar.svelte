<script>
  // bouton panier
  import CartButton from "../Cart/CartButton.svelte";
  // global store
  import { link } from "svelte-routing";
</script>

<nav class="navbar">
  <div class="nav-center">
    <!-- bouton barre latérale -->
    <button class="btn-sidebar-toggle">
      <i class="fas fa-bars" />
    </button>
    <!-- logo -->
    <a href="/" use:link class="nav-logo">
      <img src="/assets/images/logo.svg" class="logo" alt="logo" />
    </a>
    <!-- bouton panier-->
    <CartButton />
  </div>
</nav>
