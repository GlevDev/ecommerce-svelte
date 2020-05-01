<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";
  import submitOrder from "../strapi/submitOrder";
  import globalStore from "../stores/globalStore";

  let name = "";
  // stripe vars
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  $: isEmpty = !name || $globalStore.alert;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }
    if ($cartTotal > 0) {
      stripe = Stripe("pk_test_CbZtKg71SEDyDe83hiixOkeV00710DN6st");
      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      card.addEventListener("change", function(event) {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = "";
        }
      });
    }
  });
  async function handleSubmit() {
    globalStore.toggleItem(
      "alert",
      true,
      "Commande en cours de validation... Merci de patienter."
    );
    let response = await stripe
      .createToken(card)
      .catch(error => console.log(error));
    const { token } = response;
    if (token) {
      const { id } = token;
      let order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt
      });
      if(order) {
        globalStore.toggleItem('alert', true, 'Votre commande est validée. Merci.');
        cart.set([]);
        localStorage.setItem('cart', JSON.stringify([]));
        navigate('/');
        return;
      } else {
        globalStore.toggleItem('alert', true, "La commande n'a pu être traitée. Merci de renouveller l'opération.", true)
      }
      // token.id
      // submit order
    } else {
    }
  }
</script>

{#if $cartTotal > 0}
  <h2 class="section-title">Commander</h2>
  <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
    <h3>Total de la commande : ${$cartTotal}</h3>
    <!-- champ unique -->
    <div class="form-control">
      <label for="name">Votre Nom</label>
      <input type="text" id="name" bind:value={name} />
    </div>
    <!-- champ unique - fin -->
    <!-- début stripe -->
    <div class="stripe-input">
      <!-- info -->
      <label for="card-element">Numéro de carte</label>
      <p class="stripe-info">
        Vous pouvez tester avec cette carte de crédit
        <span>4242 4242 4242 4242</span>
        <br />
        Entrez n'importe quel code postal à 5 chiffres
        <br />
        Puis 3 chiffres au hasard pour le CCV
      </p>
      <div id="card-element" bind:this={cardElement}>
        <!-- stripe -->
      </div>
      <div id="card-errors" bind:this={cardErrors} role="alert" />
    </div>
    <!-- fin stripe -->
    <!-- message d'erreur -->
    {#if isEmpty}
      <p class="form-empty">Merci de bien remplir le champ "nom"</p>
    {/if}
    <!-- bouton de validation -->
    <button
      type="submit"
      class="btn-block btn-primary"
      disabled={isEmpty}
      class:disabled={isEmpty}>
      Valider
    </button>
  </form>
{:else}
  <div class="checkout-empty">
    <h2>Votre panier est vide</h2>
    <a href="/products" use:link class="btn-primary">Remplissez-le</a>
  </div>
{/if}
