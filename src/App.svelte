<script>
  import { Router, Route } from 'svelte-routing';
  import Layout from './components/Layout.svelte';
  import Home from './pages/Home.svelte';
  import ProductDetailView from './pages/ProductDetailView.svelte';
  import Login from './pages/Login.svelte';
  import './index.css'
</script>

<Router>
  <Layout>
    <Route path="/" component={Home} />
    <Route path="/products/:id" component={ProductDetailView} />
    <Route path="/login" component={Login} />
  </Layout>
</Router>

