<script>
    export let image;
    export let title;
    export let price;
    export let description;
    export let product;
  </script>
  
  <template>
    <div class="product-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
    </div>

    <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <!-- Add other product details as needed -->
      </div>

    {#each products as product}
        <ProductCard {product} />
    {/each}

  
    <style>
      .product-card {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    </style>
  </template>
  