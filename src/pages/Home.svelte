<script>
  import { onMount } from 'svelte';
  import { productStore, fetchProducts } from '../store/productStore';

  let products = [];

  // Fetch products when the component is mounted
  onMount(async () => {
    await fetchProducts();
  });

  // Subscribe to the productStore
  $: products = $productStore;
</script>

<template>
  <div>
    <h1>Products</h1>
    {#if products.length > 0}
      <ul>
        {#each products as product}
          <li>{product.title}</li>
        {/each}
      </ul>
    {:else}
      <p>No products available.</p>
    {/if}
  </div>
</template>

<style>
  /* Your CSS styles here */
</style>
