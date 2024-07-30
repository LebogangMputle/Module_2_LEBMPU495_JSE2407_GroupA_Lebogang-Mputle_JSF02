<script>
  import { onMount } from "svelte";
  import ProductCard from "./ProductCard.svelte";
  import { productStore } from "../../store/productStore";

  let products = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      await productStore.fetchProducts();
      products = productStore.products;
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  });

  // Subscribe to store updates
  productStore.subscribe(value => {
    products = value.products;
    loading = value.loading;
    error = value.error;
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>Error loading products: {error.message}</p>
{:else}
  {#if Array.isArray(products) && products.length > 0}
    <div class="product-list">
      {#each products as product}
      <ProductCard {product} />
    {/each}
    
    </div>
  {:else}
    <p>No products available.</p>
  {/if}
{/if}


<style>
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>
