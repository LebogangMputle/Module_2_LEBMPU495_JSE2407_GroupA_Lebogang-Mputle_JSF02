<script>
    import ProductCard from './ProductCard.svelte';
    import CardSkeleton from './CardSkeleton.svelte';
    import { products, loading, error } from '../../store/productStore';
    import Error from '../Error.svelte';
  </script>
  
  {#if loading && !error}
    <div class="grid justify-center">
      <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {#each Array(20).fill(null) as _, index}
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
        {#each $products as product}
          <ProductCard key={product.id} {...product} />
        {/each}
      </div>
    </div>
  {/if}
  </script>
  
  <style>
    /* Add any additional styles if needed */
  </style>
  