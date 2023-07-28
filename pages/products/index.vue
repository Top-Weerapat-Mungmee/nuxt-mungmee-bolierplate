<template>
  <div>
    <h1 class="text-header">Products</h1>
    <LazyHydrate when-idle>
      <LazyProductList />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
// import ProductList from '~/modules/product/components/ProductList.vue'

export default {
  components: {
    LazyHydrate,
    LazyProductList: () =>
      import('~/modules/product/components/ProductList.vue'),
  },
}
</script>
