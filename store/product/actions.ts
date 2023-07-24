import { ActionContext } from 'vuex'
import { GET_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_PRODUCT } from './mutations'
import type { IRootState } from '~/types/store'
import type { IProductState, IProductForm } from '~/types/store/product'
import { ProductService } from '~/services'

const service = new ProductService()

const getProducts = async (ctx: ActionContext<IProductState, IRootState>) => {
  const { commit } = ctx
  try {
    await commit(GET_PRODUCTS.REQUEST)
    const { data } = await service.all()
    await commit(GET_PRODUCTS.SUCCESS, data)
  } catch (e) {
    console.error(e)
    commit(GET_PRODUCTS.FAILURE, e)
  }
}

const getProductById = async (
  ctx: ActionContext<IProductState, IRootState>,
  id: string
) => {
  const { commit } = ctx
  try {
    await commit(GET_PRODUCT_BY_ID.REQUEST, { _key: id })
    const { data } = await service.find(id)
    const payload = {
      _key: id,
      data,
    }
    await commit(GET_PRODUCT_BY_ID.SUCCESS, payload)
  } catch (e: any) {
    console.error(e)
    commit(GET_PRODUCT_BY_ID.FAILURE, { _key: id, error: e?.message })
  }
}

const createProduct = async (
  ctx: ActionContext<IProductState, IRootState>,
  form: IProductForm
) => {
  const { commit } = ctx
  try {
    await commit(CREATE_PRODUCT.REQUEST)
    const { data } = await service.post({ data: form })
    const payload = {
      _key: data.id,
      data,
    }
    await commit(CREATE_PRODUCT.SUCCESS, payload)
  } catch (e: any) {
    console.error(e)
    commit(CREATE_PRODUCT.FAILURE, e)
  }
}

export default {
  getProducts,
  getProductById,
  createProduct,
}
