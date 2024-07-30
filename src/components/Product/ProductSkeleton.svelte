svelte
   <script>
     import CardSkeleton from './CardSkeleton.svelte';
     const products = [
       { id: 1, name: 'Product 1' },
       { id: 2, name: 'Product 2' },
       { id: 3, name: 'Product 3' }
     ];
   </script>

   {#each products as product (product.id)}
     <CardSkeleton />
   {/each}