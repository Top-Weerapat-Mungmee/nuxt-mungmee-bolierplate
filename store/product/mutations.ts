import Vue from 'vue'
import type {
  IProductState,
  IProductByIdPayload,
  IProduct,
} from '~/types/store/product'
import { Mutation } from '~/utils/vuex-query'
import { asyncActions } from '~/utils/asyncActions'

export const GET_PRODUCTS = asyncActions('GET_PRODUCTS')
export const GET_PRODUCT_BY_ID = asyncActions('GET_PRODUCT_BY_ID')
export const CREATE_PRODUCT = asyncActions('CREATE_PRODUCT')
export const UPDATE_PRODUCT_BY_ID = asyncActions('UPDATE_PRODUCT_BY_ID')
export const DELETE_PRODUCT_BY_ID = asyncActions('DELETE_PRODUCT_BY_ID')

export default {
  [GET_PRODUCTS.REQUEST](state: IProductState) {
    Mutation.getListRequest(state)
  },
  [GET_PRODUCTS.SUCCESS](state: IProductState, payload: IProduct[]) {
    Mutation.getListSuccess(state, payload)
  },
  [GET_PRODUCTS.FAILURE](state: IProductState, payload: Error) {
    Mutation.getListFailure(state, payload)
  },
  [GET_PRODUCT_BY_ID.REQUEST](
    state: IProductState,
    payload: IProductByIdPayload
  ) {
    Mutation.getDetailRequest(state, payload)
  },
  [GET_PRODUCT_BY_ID.SUCCESS](
    state: IProductState,
    payload: IProductByIdPayload
  ) {
    Mutation.getDetailSuccess(state, payload)
  },
  [GET_PRODUCT_BY_ID.FAILURE](
    state: IProductState,
    payload: IProductByIdPayload
  ) {
    Mutation.getDetailFailure(state, payload)
  },

  [CREATE_PRODUCT.REQUEST](state: IProductState) {
    state.crud.create.isLoading = true
    state.crud.create.id = 0
    state.crud.create.error = null
  },
  [CREATE_PRODUCT.SUCCESS](state: IProductState, payload: IProductByIdPayload) {
    state.isFetch = false
    state.crud.create.isLoading = false
    state.crud.create.id = payload._key
    state.crud.create.error = null
    Mutation.getDetailSuccess(state, payload)
  },
  [CREATE_PRODUCT.FAILURE](state: IProductState, payload: Error) {
    state.crud.create.isLoading = false
    state.crud.create.id = 0
    state.crud.create.error = payload?.message
  },
  [UPDATE_PRODUCT_BY_ID.REQUEST](state: IProductState) {
    state.crud.update.isLoading = true
    state.crud.update.id = 0
    state.crud.update.error = null
  },
  [UPDATE_PRODUCT_BY_ID.SUCCESS](
    state: IProductState,
    payload: IProductByIdPayload
  ) {
    state.isFetch = false
    state.crud.update.isLoading = false
    state.crud.update.id = payload._key
    state.crud.update.error = null
    Mutation.getDetailSuccess(state, payload)
    state.keys[payload._key].isFetch = false
  },
  [UPDATE_PRODUCT_BY_ID.FAILURE](
    state: IProductState,
    payload: IProductByIdPayload
  ) {
    state.crud.update.isLoading = false
    state.crud.update.id = 0
    state.crud.update.error = payload?.error
  },

  [DELETE_PRODUCT_BY_ID.REQUEST](state: IProductState) {
    state.crud.delete.isLoading = true
    state.crud.delete.id = 0
    state.crud.delete.error = null
  },
  [DELETE_PRODUCT_BY_ID.SUCCESS](
    state: IProductState,
    payload: IProductByIdPayload
  ) {
    state.isFetch = false
    state.crud.delete.isLoading = false
    state.crud.delete.id = payload._key
    state.crud.delete.error = null
    Vue.delete(state.keys, payload._key)
  },
  [DELETE_PRODUCT_BY_ID.FAILURE](state: IProductState, payload: Error) {
    state.crud.delete.isLoading = false
    state.crud.delete.id = 0
    state.crud.delete.error = payload?.message
  },
}
