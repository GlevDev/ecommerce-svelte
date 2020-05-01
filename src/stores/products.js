import { writable, derived } from 'svelte/store';
import url from '../strapi/URL';
import getProducts from '../strapi/getProducts';

const store = writable([], () => {
  setProducts();
  return () => {

  }
});

async function setProducts() {
  let products = await getProducts();
  if(products) {
    products = flattenProducts(products);
    store.set(products);
  }
}

// on ne retient que l'URL de l'image
function flattenProducts(data) {
  return data.map(item => {
    let image = item.image.url;
    // let image = `${url}${item.image.url}`;
    return {...item, image};
  })
}

// A l'affiche
export const featuredStore = derived(store, $featured => {
  return $featured.filter(item => item.featured);
});

export default store;