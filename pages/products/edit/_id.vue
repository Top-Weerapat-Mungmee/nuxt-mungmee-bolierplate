<template>
  <div>
    <h1 class="text-header">Edit Products</h1>
    <template v-if="isLoading">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="isEditError">
      <h1>Product #{{ $route.params.id }} not found</h1>
    </template>
    <template v-else>
      <v-alert v-if="isError" dense outlined type="error">
        <b>Error :</b> {{ error }}
      </v-alert>
      <v-form ref="form" v-model="valid" @submit.prevent="updateProduct">
        <v-container>
          <v-row>
            <v-col cols="12" md="4" xs="12">
              <v-text-field
                v-model="form.name"
                :rules="validate.name"
                :counter="50"
                label="Name"
                required
              />
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <v-text-field
                v-model="form.sku"
                :rules="validate.sku"
                :counter="10"
                label="SKU"
                required
              />
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <v-text-field
                v-model="form.price"
                type="number"
                :rules="validate.price"
                label="Price"
                required
              />
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <v-btn color="primary" @click="goToProductList">BACK</v-btn>
              <v-btn :disabled="!valid" color="primary" @click="updateProduct">
                UPDATE
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      valid: false,
      isError: false,
      form: {
        name: '',
        sku: '',
        price: 0,
      },
      validate: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 50 || 'Name must be less than 50 characters',
        ],
        sku: [
          (v) => !!v || 'SKU is required',
          (v) => v.length <= 10 || 'SKU must be less than 10 characters',
        ],
        price: [(v) => !!v || 'price is required'],
      },
    }
  },

  computed: {
    ...mapGetters({
      updateId: 'product/updateId',
      error: 'product/updateError',
      productById: 'product/productById',
      productByIdLoading: 'product/productByIdLoading',
      productByIdIsError: 'product/productByIdIsError',
    }),
    isLoading() {
      const { id } = this.$route.params
      return this.productByIdLoading(id)
    },
    isEditError() {
      const { id } = this.$route.params
      return this.productByIdIsError(id)
    },
  },
  watch: {
    error(newState) {
      if (newState) {
        this.isError = Boolean(newState)
      }
    },
    updateId(newState, oldState) {
      if (!oldState && newState) {
        this.$router.push(`/products/${newState}`)
      }
    },
  },
  mounted() {
    const { id } = this.$route.params
    const { isFetch, data } = this.productById(id)
    if (!isFetch) {
      this.getProductById(id).then(() => {
        const dataResponse = this.productById(id).data
        this.form.name = dataResponse.attributes.name
        this.form.sku = dataResponse.attributes.sku
        this.form.price = dataResponse.attributes.price
      })
    } else {
      this.form.name = data.attributes.name
      this.form.sku = data.attributes.sku
      this.form.price = data.attributes.price
    }
  },
  methods: {
    ...mapActions({
      getProductById: 'product/getProductById',
      updateProductByIdAction: 'product/updateProductById',
    }),
    goToProductList() {
      this.$router.push('/products')
    },
    updateProduct() {
      const { id } = this.$route.params
      const payload = {
        id,
        form: this.form,
      }
      this.updateProductByIdAction(payload)
    },
  },
}
</script>
