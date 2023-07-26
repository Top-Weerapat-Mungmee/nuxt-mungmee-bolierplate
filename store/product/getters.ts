import { GetterTree } from 'vuex'
import { IRootState } from '~/types/store'
import type {
  IProduct,
  IProductState,
  IProductKeyValue,
} from '~/types/store/product'

const getters: GetterTree<IProductState, IRootState> = {
  products: (state): IProduct[] => state.lists,
  isLoading: (state): boolean => state.isLoading,
  isFetch: (state): boolean => state.isFetch,
  createId: (state): number => state.crud.create.id,
  updateId: (state): number => state.crud.update.id,
  deleteId: (state): number => state.crud.delete.id,
  createLoading: (state): boolean => state.crud.create.isLoading,
  updateLoading: (state): boolean => state.crud.update.isLoading,
  deleteLoading: (state): boolean => state.crud.delete.isLoading,
  createError: (state): string | null | undefined => state.crud.create.error,
  updateError: (state): string | null | undefined => state.crud.update.error,
  deleteError: (state): string | null | undefined => state.crud.delete.error,
  isError: (state): boolean => Boolean(state.error),
  error: (state): string | null => state.error,
  productKeys: (state): IProductKeyValue => state.keys,
  productById: (state) => (id: string) => state.keys?.[id] || {},
  productByIdIsFetch: (state) => (id: string) =>
    state.keys?.[id]?.isFetch || false,
  productByIdLoading: (state) => (id: string) =>
    state.keys?.[id]?.isLoading || false,
  productByIdIsError: (state) => (id: string) =>
    Boolean(state.keys?.[id]?.error),
}

export default getters
