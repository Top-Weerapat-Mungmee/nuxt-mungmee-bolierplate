<template>
  <div v-memo="[isLoading, products, isError]">
    <h1 class="text-header">Products</h1>
    <Button v-once color="green" @click="getProducts">Refetch</Button>
    <n-link :to="`/products/create`">
      <Button v-once color="blue">Create</Button>
    </n-link>
    <template v-if="isLoading">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="isError">
      <p>Error while fetching products: {{ error }}</p>
    </template>
    <template v-else>
      <li v-for="product of products" :key="product.id">
        <n-link :to="`/products/${product.id}`">
          {{ product.attributes.name }} - {{ product.attributes.price }} บาท
        </n-link>
      </li>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async fetch() {
    if (!this.isFetch) {
      await this.getProducts()
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      products: 'product/products',
      isLoading: 'product/isLoading',
      isError: 'product/isError',
      isFetch: 'product/isFetch',
      error: 'product/error',
    }),
  },
  methods: {
    ...mapActions({
      getProducts: 'product/getProducts',
    }),
  },
}
</script>
