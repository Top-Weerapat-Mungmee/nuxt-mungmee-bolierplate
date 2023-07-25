<template>
  <div>
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
            <v-btn color="primary" @click="goToProductList"> BACK </v-btn>
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
      createId: 'product/createId',
      error: 'product/createError',
    }),
  },
  watch: {
    error(newState) {
      if (newState) {
        this.isError = Boolean(newState)
      }
    },
    createId(newState, oldState) {
      if (!oldState && newState) {
        this.$router.push(`/products/${newState}`)
      }
    },
  },
  methods: {
    ...mapActions({
      createProductAction: 'product/createProduct',
    }),
    goToProductList() {
      this.$router.push('/products')
    },
    reset() {
      this.$refs.form.reset()
    },
    createProduct() {
      this.createProductAction(this.form)
    },
  },
}
</script>
