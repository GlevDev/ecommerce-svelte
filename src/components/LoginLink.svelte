<script>
  import user from "../stores/user";
  import { link } from "svelte-routing";
  import { logoutUser } from "../stores/user.js";
  import globalStore from "../stores/globalStore";
</script>

{#if $user.jwt}
  <a
    href="/"
    class="logout-btn"
    on:click={() => {
      logoutUser();
      globalStore.toggleItem('sidebar', false);
    }}>
    Déconnexion
  </a>
{:else}
  <a
    href="/login"
    on:click={() => {
      globalStore.toggleItem('sidebar', false);
    }}>
    Connexion
  </a>
{/if}
