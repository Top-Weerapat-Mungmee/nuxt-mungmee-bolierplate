<template>
  <div>
    <h1 class="text-header">Create Products</h1>
    <v-btn v-once color="primary" @click="handleShowForm">SHOW</v-btn>
    <LazyHydrate when-visible>
      <LazyCreateProductForm v-if="show" />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
// import CreateProductForm from '~/modules/product/components/form/CreateProductForm.vue'

export default {
  components: {
    LazyHydrate,
    LazyCreateProductForm: () =>
      import(
        /* webpackChunkName: "CreateProductForm" */ '~/modules/product/components/form/CreateProductForm.vue'
      ),
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    handleShowForm() {
      this.show = true
    },
  },
}
</script>
