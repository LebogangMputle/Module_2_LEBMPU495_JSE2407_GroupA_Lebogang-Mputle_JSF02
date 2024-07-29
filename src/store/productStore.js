// src/store/productStore.js
import { writable } from 'svelte/store';

const initialState = {
  products: [],
  originalProducts: [],
  loading: false,
  error: null,
  sorting: 'default',
  searchTerm: '',
  filterItem: 'All categories'
};

function createProductStore() {
  const { subscribe, set, update } = writable(initialState);

  const fetchProducts = async () => {
    const { filterItem } = getState();
    let url = 'https://fakestoreapi.com/products';

    if (filterItem !== 'All categories') {
      url += `/category/${filterItem}`;
    }

    try {
      update(state => ({ ...state, loading: true, error: null }));
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Data fetching failed');
      }

      const data = await response.json();
      update(state => ({
        ...state,
        products: data,
        originalProducts: JSON.parse(JSON.stringify(data)),
        loading: false
      }));
    } catch (error) {
      update(state => ({ ...state, error, loading: false }));
    } finally {
      sortProducts();
      searchProducts();
    }
  };

  const sortProducts = () => {
    update(state => {
      let sortedProducts = [...state.products];
      if (state.sorting !== 'default') {
        sortedProducts.sort((a, b) =>
          state.sorting === 'low' ? a.price - b.price : b.price - a.price
        );
      } else {
        sortedProducts = JSON.parse(JSON.stringify(state.originalProducts));
      }
      return { ...state, products: sortedProducts };
    });
  };

  const searchProducts = () => {
    update(state => {
      if (state.searchTerm.trim() !== '') {
        const filteredProducts = state.originalProducts.filter(product =>
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
        return { ...state, products: filteredProducts };
      }
      return state;
    });
  };

  const getState = () => {
    let state;
    subscribe(s => state = s)();
    return state;
  };

  return {
    subscribe,
    setSorting: (sorting) => update(state => {
      const newState = { ...state, sorting };
      sortProducts();
      return newState;
    }),
    setSearchTerm: (searchTerm) => {
      update(state => ({ ...state, searchTerm }));
      searchProducts();
    },
    setFilterItem: (filterItem) => {
      update(state => ({ ...state, filterItem }));
      fetchProducts();
    },
    fetchProducts,
    sortProducts,
    searchProducts
  };
}

export const productStore = createProductStore();
