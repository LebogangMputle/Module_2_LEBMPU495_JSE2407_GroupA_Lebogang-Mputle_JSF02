import { writable } from 'svelte/store';

// Initialize the store with an empty array
export const productStore = writable([]);

// Fetch products from the API and update the store
export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    productStore.set(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    productStore.set([]); // Set an empty array in case of an error
  }
};
