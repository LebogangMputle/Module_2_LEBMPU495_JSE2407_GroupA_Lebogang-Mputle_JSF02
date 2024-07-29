<script>
  import ProductCard from './ProductCard.svelte';
  import CardSkeleton from './CardSkeleton.svelte';
  import Error from '../Error.svelte';
  import { productStore, fetchProducts } from '../../store/productStore';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';

  // Derived store to get loading and error states
  const { subscribe } = derived(productStore, ($productStore) => ({
    products: $productStore,
    loading: $productStore.length === 0,
    error: null
  }));

  let products = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      await fetchProducts();
      productStore.subscribe(value => {
        products = value;
        loading = value.length === 0;
      });
    } catch (err) {
      error = err;
    }
  });
</script>

<template>
  {#if loading && !error}
    <div class="grid justify-center">
      <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {#each Array(20) as _, index}
          <CardSkeleton key={index} />
        {/each}
      </div>
    </div>
  {:else if error}
    <div class="grid justify-center">
      <Error {...error} />
    </div>
  {:else}
    <div class="grid justify-center">
      <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {#each products as product}
          <ProductCard key={product.id} {...product} />
        {/each}
      </div>
    </div>
  {/if}
</template>

<style>
  /* Add your styles here if needed */
</style>
