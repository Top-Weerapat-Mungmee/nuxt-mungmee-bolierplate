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
    state.isLoading = true
    state.isCreate = false
  },
  [CREATE_PRODUCT.SUCCESS](state: IProductState, payload: IProductByIdPayload) {
    state.isLoading = false
    state.isFetch = false
    state.error = null
    state.isCreate = true
    Mutation.getDetailSuccess(state, payload)
  },
  [CREATE_PRODUCT.FAILURE](state: IProductState, payload: Error) {
    state.isLoading = false
    state.isCreate = false
    state.error = payload?.message
  },
}
