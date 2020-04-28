import { writable, derived } from 'svelte/store';
import localProducts from '../localProducts';

const store = writable(flattenProducts([...localProducts]));

// on ne retient que l'URL de l'image
function flattenProducts(data) {
  return data.map(item => {
    let image = item.image.url;
    return {...item, image};
  })
}

// A l'affiche
export const featuredStore = derived(store, $featured => {
  return $featured.filter(item => item.featured);
});

export default store;