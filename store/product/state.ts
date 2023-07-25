import { IProductState } from '~/types/store/product'

export default (): IProductState => ({
  lists: [],
  isLoading: false,
  isFetch: false,
  error: null,
  keys: {},
  crud: {
    create: {
      isLoading: false,
      id: 0,
      error: null,
    },
    update: {
      isLoading: false,
      id: 0,
      error: null,
    },
    delete: {
      isLoading: false,
      id: 0,
      error: null,
    },
  },
})
