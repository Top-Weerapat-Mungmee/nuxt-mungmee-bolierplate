<template>
  <div v-memo="[isLoading, products, isError]">
    <h1 class="text-header">Create Products</h1>
    <v-alert v-if="isError" dense outlined type="error">
      <b>Error :</b> {{ error }}
    </v-alert>
    <v-form ref="form" v-model="valid" @submit.prevent="createProduct">
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
            <!-- <v-btn color="secondary" @click="reset">RESET</v-btn> -->
            <v-btn :disabled="!valid" color="primary" @click="createProduct">
              CREATE
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      valid: false,
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
      isCreate: 'product/isCreate',
      error: 'product/error',
    }),
  },
  watch: {
    isCreate(newState, oldState) {
      if (!oldState && newState) {
        this.$router.push('/products')
      }
    },
  },
  methods: {
    ...mapActions({
      getProducts: 'product/getProducts',
      createProductAction: 'product/createProduct',
    }),
    reset() {
      this.$refs.form.reset()
    },
    createProduct() {
      this.createProductAction(this.form)
    },
  },
}
</script>
