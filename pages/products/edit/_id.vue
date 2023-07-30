<template>
  <div>
    <h1 class="text-header">Edit Products</h1>
    <v-btn v-once color="primary" @click="handleShowForm">SHOW</v-btn>
    <LazyHydrate when-visible>
      <EditProductForm v-if="show" />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
// import EditProductForm from '~/modules/product/components/form/EditProductForm.vue'

export default {
  components: {
    LazyHydrate,
    EditProductForm: () =>
      import(
        /* webpackChunkName: "EditProductForm" */ '~/modules/product/components/form/EditProductForm.vue'
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
