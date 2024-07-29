<script>
    export let id;
    export let title;
    export let price;
    export let description;
    export let image;
  </script>
  
  <template>
    <div class="product-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  </template>
  
  <style>
    /* Add your styles here if needed */
  </style>
  