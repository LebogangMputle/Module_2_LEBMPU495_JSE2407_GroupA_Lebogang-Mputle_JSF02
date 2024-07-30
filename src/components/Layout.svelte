<!-- <script>
    import Header from './Header.svelte';
  
  </script>
  
  <div>
    <Header />
    
    <main>
      <slot />
    </main>
  </div> -->
  
  
    <!-- <style>
      header {
        background: #f8f9fa;
        padding: 1rem;
        text-align: center;
      }
      main {
        padding: 2rem;
      }
    </style> -->
  
    <script>
      import ProductList from './product/ProductList.svelte';
      import Header from '../components/Header.svelte'
    </script>
 
    <div>
      <Header />
      <main>
        <ProductList/>
        <slot />
      </main>
    </div>