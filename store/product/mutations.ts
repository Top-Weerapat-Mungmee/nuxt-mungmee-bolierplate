import type { MutationTree } from 'vuex'
import type { ProductState } from './state'
import { createMutation, asyncActions } from '~/utils/vuex-query'

export const GET_PRODUCTS = asyncActions('GET_PRODUCTS')
export const GET_PRODUCT_BY_ID = asyncActions('GET_PRODUCT_BY_ID')
export const CREATE_PRODUCT = asyncActions('CREATE_PRODUCT')
export const UPDATE_PRODUCT_BY_ID = asyncActions('UPDATE_PRODUCT_BY_ID')
export const DELETE_PRODUCT_BY_ID = asyncActions('DELETE_PRODUCT_BY_ID')

const mutations: MutationTree<ProductState> = {
  ...createMutation(GET_PRODUCTS).list,
  ...createMutation(GET_PRODUCT_BY_ID).detail,
  ...createMutation(CREATE_PRODUCT).create,
  ...createMutation(UPDATE_PRODUCT_BY_ID).update,
  ...createMutation(DELETE_PRODUCT_BY_ID).delete,
}

export default mutations

// export default {
//   [GET_PRODUCTS.REQUEST](state: IProductState) {
//     Mutation.list.request(state)
//   },
//   [GET_PRODUCTS.SUCCESS](state: IProductState, payload: IProduct[]) {
//     Mutation.list.success(state, payload)
//   },
//   [GET_PRODUCTS.FAILURE](state: IProductState, payload: Error) {
//     Mutation.list.failure(state, payload)
//   },
//   [GET_PRODUCT_BY_ID.REQUEST](
//     state: IProductState,
//     payload: IProductByIdPayload
//   ) {
//     Mutation.detail.request(state, payload)
//   },
//   [GET_PRODUCT_BY_ID.SUCCESS](
//     state: IProductState,
//     payload: IProductByIdPayload
//   ) {
//     Mutation.detail.success(state, payload)
//   },
//   [GET_PRODUCT_BY_ID.FAILURE](
//     state: IProductState,
//     payload: IProductByIdPayload
//   ) {
//     Mutation.detail.failure(state, payload)
//   },

//   [CREATE_PRODUCT.REQUEST](state: IProductState) {
//     Mutation.create.request(state)
//   },
//   [CREATE_PRODUCT.SUCCESS](state: IProductState, payload: IProductByIdPayload) {
//     Mutation.create.success(state, payload)
//   },
//   [CREATE_PRODUCT.FAILURE](state: IProductState, payload: Error) {
//     Mutation.create.failure(state, payload)
//   },
//   [UPDATE_PRODUCT_BY_ID.REQUEST](state: IProductState) {
//     Mutation.update.request(state)
//   },
//   [UPDATE_PRODUCT_BY_ID.SUCCESS](
//     state: IProductState,
//     payload: IProductByIdPayload
//   ) {
//     Mutation.update.success(state, payload)
//   },
//   [UPDATE_PRODUCT_BY_ID.FAILURE](
//     state: IProductState,
//     payload: IProductByIdPayload
//   ) {
//     Mutation.update.failure(state, payload)
//   },

//   [DELETE_PRODUCT_BY_ID.REQUEST](state: IProductState) {
//     Mutation.delete.request(state)
//   },
//   [DELETE_PRODUCT_BY_ID.SUCCESS](
//     state: IProductState,
//     payload: IProductByIdPayload
//   ) {
//     Mutation.delete.success(state, payload)
//   },
//   [DELETE_PRODUCT_BY_ID.FAILURE](state: IProductState, payload: Error) {
//     Mutation.delete.failure(state, payload)
//   },
// }
