<script>
  import loginUser from '../strapi/loginUser';
  import registerUser from '../strapi/registerUser';
  import {navigate} from 'svelte-routing';
  import globalStore from '../stores/globalStore';
  let email = "";
  let password = "";
  let username = "default username";
  let isMember = true;
  // add alert
  $: isEmpty = !email || !password || !username || $globalStore.alert;

  function toggleMember() {
    isMember = !isMember;
    if(!isMember) {
      username = ''
    } else {
      username = "default username"
    }
  }

  async function handleSubmit() {
    globalStore.toggleItem('alert', true, "En cours de chargement... Merci de patienter !");
    let user;
    if(isMember) {
      user = await loginUser({email, password});
    } else {
      user = await registerUser({email, password, username});
    }
    if(user) {
      navigate('/products');
      globalStore.toggleItem('alert', true, "Bienvenue chez vous !");
      return;
    } 
    globalStore.toggleItem('alert', true, "Une erreur est survenue. Meci de renouveler l'opération.", true);
  }
</script>

<section class="form">
  <h2 class="section-title">
    {#if isMember}Connexion{:else}Enregistrement{/if}
  </h2>
  <form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="password">mot de passe</label>
      <input type="password" id="password" bind:value={password} />
    </div>
    {#if !isMember}
      <div class="form-control">
        <label for="username">nom d'utilisateur</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}
    {#if isEmpty}
      <p class="form-empty">Merci de remplir l'ensemble des champs</p>
    {/if}
    <button
      type="submit"
      class="btn-block btn-primary"
      disabled={isEmpty}
      class:disabled={isEmpty}>
      valider
    </button>
    {#if isMember}
      <p class="register-link">
        Pas encore membre ?
        <button type="button" on:click={toggleMember}>Cliquez ici</button>
      </p>
    {:else}
      <p class="register-link">
        Déjà membre ?
        <button type="button" on:click={toggleMember}>Cliquez ici</button>
      </p>
    {/if}
  </form>
</section>
