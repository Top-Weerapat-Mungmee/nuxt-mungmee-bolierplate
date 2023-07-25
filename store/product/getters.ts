import type { IProduct, IProductState } from '~/types/store/product'

export default {
  products: (state: IProductState): IProduct[] => state.lists,
  isLoading: (state: IProductState): boolean => state.isLoading,
  isFetch: (state: IProductState): boolean => state.isFetch,
  createId: (state: IProductState): number => state.crud.create.id,
  updateId: (state: IProductState): number => state.crud.update.id,
  deleteId: (state: IProductState): number => state.crud.delete.id,
  createLoading: (state: IProductState): boolean => state.crud.create.isLoading,
  updateLoading: (state: IProductState): boolean => state.crud.update.isLoading,
  deleteLoading: (state: IProductState): boolean => state.crud.delete.isLoading,
  createError: (state: IProductState): string | null | undefined =>
    state.crud.create.error,
  updateError: (state: IProductState): string | null | undefined =>
    state.crud.update.error,
  deleteError: (state: IProductState): string | null | undefined =>
    state.crud.delete.error,
  isError: (state: IProductState): boolean => Boolean(state.error),
  error: (state: IProductState): string | null => state.error,
  productKeys: (state: IProductState): any => state.keys,
  productById: (state: IProductState) => (id: string) => state.keys?.[id] || {},
  productByIdIsFetch: (state: IProductState) => (id: string) =>
    state.keys?.[id]?.isFetch || false,
  productByIdLoading: (state: IProductState) => (id: string) =>
    state.keys?.[id]?.isLoading || false,
  productByIdIsError: (state: IProductState) => (id: string) =>
    Boolean(state.keys?.[id]?.error),
}
