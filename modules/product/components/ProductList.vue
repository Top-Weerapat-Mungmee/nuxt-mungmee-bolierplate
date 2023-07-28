<template>
  <div>
    <Button v-once color="green" @click="getProducts">Refetch</Button>
    <n-link v-once :to="`/products/create`">
      <Button color="blue">Create</Button>
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
      <div>
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="text-left">SKU</th>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product of products" :key="product.id">
              <td>
                <n-link :to="`/products/${product.id}`">
                  {{ product.attributes.sku }}
                </n-link>
              </td>
              <td>{{ product.attributes.name }}</td>
              <td>{{ product.attributes.price }}</td>
              <td>
                <v-btn
                  x-small
                  color="primary"
                  dark
                  @click="goToEditProductById(product.id)"
                >
                  Edit
                </v-btn>
                <v-btn
                  x-small
                  color="error"
                  dark
                  @click="deleteProductById(product)"
                >
                  Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductList',
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
      deleteId: 'product/deleteId',
      error: 'product/error',
    }),
  },
  watch: {
    deleteId(newState, oldState) {
      if (!oldState && newState) {
        this.getProducts()
      }
    },
  },
  methods: {
    ...mapActions({
      getProducts: 'product/getProducts',
      deleteProductByIdAction: 'product/deleteProductById',
    }),
    goToEditProductById(id) {
      this.$router.push(`/products/edit/${id}`)
    },
    deleteProductById(product) {
      if (confirm(`delete product sku ${product.attributes.sku} ?`)) {
        this.deleteProductByIdAction(product.id)
      }
    },
  },
}
</script>
