<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import ProductDetail from '../components/product/ProductDetail.svelte';
    import ProductSkeleton from '../components/product/ProductSkeleton.svelte';
    import Error from '../components/Error.svelte';
    import { fetchSingleProduct } from '../api/api.js';
    import { productStore } from '../store/productStore'; // Adjust the path as needed
  
    let product = {};
    let error = null;
    let loading = false;
  
    // Fetching the product ID from the URL
    export let id;
  
    // Load data when component mounts
    onMount(async () => {
      loading = true;
      const { response, error: fetchError } = await fetchSingleProduct(id);
      if (fetchError) {
        error = fetchError;
      } else {
        product = response;
      }
      loading = false;
    });
  </script>
  
  {#if error}
    <div class="flex justify-center">
      <Error {...error} />
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
  