import { IProductState } from '~/types/store/product'

const state = (): IProductState => ({
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

export type ProductState = ReturnType<typeof state>

export default state
