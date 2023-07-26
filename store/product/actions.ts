import type { ActionTree } from 'vuex'
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
} from './mutations'
import { ProductState } from './state'
import type { IRootState } from '~/types/store'
import type { IProductForm, IProductUpdateForm } from '~/types/store/product'
import { ProductService } from '~/services'
import { payloadKeyError, payloadKeyValue } from '~/utils/vuex-query'

const service = new ProductService()

const actions: ActionTree<ProductState, IRootState> = {
  async getProducts({ commit }) {
    try {
      await commit(GET_PRODUCTS.REQUEST)
      const { data } = await service.all()
      await commit(GET_PRODUCTS.SUCCESS, data)
    } catch (e) {
      console.error(e)
      commit(GET_PRODUCTS.FAILURE, e)
    }
  },
  async getProductById({ commit }, id: string) {
    try {
      await commit(GET_PRODUCT_BY_ID.REQUEST, { _key: id })
      const { data } = await service.find(id)
      const payload = payloadKeyValue(id, data)
      await commit(GET_PRODUCT_BY_ID.SUCCESS, payload)
    } catch (e: any) {
      console.error(e)
      commit(GET_PRODUCT_BY_ID.FAILURE, payloadKeyError(id, e?.message))
    }
  },
  async createProduct({ commit }, form: IProductForm) {
    try {
      await commit(CREATE_PRODUCT.REQUEST)
      const { data } = await service.post({ data: form })
      const payload = payloadKeyValue(data.id, data)
      await commit(CREATE_PRODUCT.SUCCESS, payload)
    } catch (e: any) {
      console.error(e)
      commit(CREATE_PRODUCT.FAILURE, e)
    }
  },
  async updateProductById({ commit }, formPayload: IProductUpdateForm) {
    const { id, form } = formPayload
    try {
      await commit(UPDATE_PRODUCT_BY_ID.REQUEST)
      const parameters = {
        data: form,
      }
      const { data } = await service.$http.put(
        `/api/products/${id}`,
        parameters
      )
      const payload = payloadKeyValue(id, data)
      await commit(UPDATE_PRODUCT_BY_ID.SUCCESS, payload)
    } catch (e: any) {
      console.error(e)
      commit(UPDATE_PRODUCT_BY_ID.FAILURE, payloadKeyError(id, e?.message))
    }
  },
  async deleteProductById({ commit }, id: string) {
    try {
      await commit(DELETE_PRODUCT_BY_ID.REQUEST)
      const { data } = await service.delete(id)
      const payload = payloadKeyValue(id, data)
      await commit(DELETE_PRODUCT_BY_ID.SUCCESS, payload)
    } catch (e: any) {
      console.error(e)
      commit(DELETE_PRODUCT_BY_ID.FAILURE, e)
    }
  },
}

export default actions
