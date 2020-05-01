import { writable, derived } from 'svelte/store';
// import localCart from '../localCart';

// panier
const cart = writable(getStorageCart());

// calcule total du panier
export const cartTotal = derived(cart, ($cart) => {
  let total = $cart.reduce((acc, curr) => {
    return acc += curr.amount * curr.price;
  }, 0);
  return parseFloat(total.toFixed(2));
})

// local
const remove = (id, items) => {
  return items.filter(item => item.id !== id);
}
const toggleAmount = (id, items, action) => {
  return items.map(item => {
    let newAmount;
    if(action === 'ajout') {
      newAmount = item.amount + 1
    }
    else if(action === "suppr") {
      newAmount = item.amount - 1
    }
    else {
      newAmount = item.amount
    }
    return item.id === id ? {...item, amount: newAmount} : {...item};
  })
}

// global
export const removeItem = id => {
  cart.update(storeValue => {
    return remove(id, storeValue);
  })
};
export const increaseAmount = id => {
  cart.update(storeValue => {
    return toggleAmount(id, storeValue, "ajout")
  })
};
export const decreaseAmount = id => {
  cart.update(storeValue => {
    let item = storeValue.find(item => item.id === id);
    if(item.amount === 1) {
      return remove(id,storeValue);
    } else {
      return toggleAmount(id, storeValue, "suppr")
    }
  })
};
export const addToCart = product => {
  cart.update(storeValue => {
    const {id, image, title, price} = product
    let item = storeValue.find(item => item.id === id);
    if(item) {
      return toggleAmount(id, storeValue, "ajout")
    } else {
      let prod = {
        id,
        title,
        image,
        amount: 1,
        price
      }
      return [...storeValue, prod];
    }
  })
}

// localStorage
function getStorageCart() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

export function setStorageCart(cartValues) {
  localStorage.setItem('cart', JSON.stringify(cartValues));
}

export default cart;