<script>
    import { onMount } from 'svelte';
    import ProductDetail from '../components/product/ProductDetail.svelte';
    import ProductSkeleton from '../components/product/ProductSkeleton.svelte';
    import Error from '../components/Error.svelte';
    import { fetchSingleProduct } from '../api/api.js';
  
    let product = {};
    let error = null;
    let loading = false;
  
    // Fetching the product ID from the URL
    export let id;
  
    // Load data when component mounts
    onMount(async () => {
      loading = true;
      try {
        const response = await fetchSingleProduct(id);
        product = response;
      } catch (fetchError) {
        error = fetchError;
      } finally {
        loading = false;
      }
    });
  </script>
  
  {#if error}
    <div class="flex justify-center">
      <Error message={error.message} /> <!-- Adjust if needed based on Error component -->
    </div>
  {:else if loading}
    <div class="flex justify-center">
      <ProductSkeleton />
    </div>
  {:else}
    <div class="flex justify-center">
      <ProductDetail {...product} />
    </div>
  {/if}
  
  <style>
    /* Add any CSS styles you need here */
  </style>
  