<template>
  <div v-memo="[isLoading, isError, productData]">
    <Button v-once color="blue" @click="goToProductList">Product List</Button>
    <Button v-once color="green" @click="refetch">Refetch</Button>
    <Card :title="`Product #${$route.params.id}`">
      <template v-if="isLoading">
        <content-placeholders>
          <content-placeholders-text :lines="10" />
        </content-placeholders>
      </template>
      <template v-else-if="isError">
        <h1>Product #{{ $route.params.id }} not found</h1>
      </template>
      <template v-else>
        <h1 class="text-header">{{ productData.attributes.name }}</h1>
        <ul>
          <li>ชื่อเมนู : {{ productData.attributes.name }}</li>
          <li>SKU : {{ productData.attributes.sku }}</li>
          <li>ราคา : {{ productData.attributes.price }} บาท</li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Button from '~/components/Button.vue'
import Card from '~/components/Card/Card.vue'
export default {
  components: {
    Button,
    Card,
  },
  async fetch() {
    const { id } = this.$route.params
    const { isFetch } = this.productById(id)
    if (!isFetch) {
      await this.getProductById(id)
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      productKeys: 'product/productKeys',
      productById: 'product/productById',
      productByIdLoading: 'product/productByIdLoading',
      productByIdIsError: 'product/productByIdIsError',
    }),
    isLoading() {
      const { id } = this.$route.params
      return this.productByIdLoading(id)
    },
    isError() {
      const { id } = this.$route.params
      return this.productByIdIsError(id)
    },
    product() {
      const { id } = this.$route.params
      const data = this.productById(id)
      return data
    },
    productData() {
      const { id } = this.$route.params
      const { data } = this.productById(id)
      return data
    },
  },
  methods: {
    ...mapActions({
      getProductById: 'product/getProductById',
    }),
    goToProductList() {
      this.$router.push('/products')
    },
    async refetch() {
      const { id } = this.$route.params
      await this.getProductById(id)
    },
  },
}
</script>
