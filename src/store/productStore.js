import { writable } from 'svelte/store';

function createProductStore() {
  const { subscribe, set, update } = writable({
    products: [],
    loading: false,
    error: null,
  });

  return {
    subscribe,
    fetchProducts: async () => {
      update(store => ({ ...store, loading: true, error: null }));
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        update(store => ({ ...store, products: data, loading: false }));
      } catch (error) {
        update(store => ({ ...store, error, loading: false }));
      }
    },
  };
}

export const productStore = createProductStore();
