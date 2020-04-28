<script>
  // bouton panier
  import CartButton from "../Cart/CartButton.svelte";
  import { link } from "svelte-routing";
  import links from "../../constants/links";
</script>

<nav class="navbar">
  <div class="nav-container">
    <div class="nav-center">
      <!-- liens -->
      <ul class="nav-links">
        {#each links as navLink}
          <li>
            <a href={navLink.url} use:link>{navLink.text}</a>
          </li>
        {/each}
      </ul>
      <!-- logo -->
      <a href="/" use:link class="nav-logo big-logo">
        <img src="/assets/images/logo.svg" class="logo" alt="logo" />
      </a>
      <!-- bouton panier-->
      <div class="nav-aside">
        <CartButton />
      </div>
    </div>
  </div>
</nav>
