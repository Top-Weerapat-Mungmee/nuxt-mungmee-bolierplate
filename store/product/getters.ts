import type { IProduct, IProductState } from '~/types/store/product'

export default {
  products: (state: IProductState): IProduct[] => state.lists,
  isLoading: (state: IProductState): boolean => state.isLoading,
  isFetch: (state: IProductState): boolean => state.isFetch,
  isCreate: (state: IProductState): boolean => state.isCreate,
  isError: (state: IProductState): boolean => Boolean(state.error),
  error: (state: IProductState): string | null => state.error,
  productKeys: (state: IProductState): any => state.keys,
  productById: (state: IProductState) => (id: string) => state.keys?.[id] || {},
  productByIdLoading: (state: IProductState) => (id: string) =>
    state.keys?.[id]?.isLoading || false,
  productByIdIsError: (state: IProductState) => (id: string) =>
    Boolean(state.keys?.[id]?.error),
}
