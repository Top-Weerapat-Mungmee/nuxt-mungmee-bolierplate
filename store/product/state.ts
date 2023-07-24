import { IProductState } from '~/types/store/product'

export default (): IProductState => ({
  lists: [],
  isLoading: false,
  isFetch: false,
  isCreate: false,
  error: null,
  keys: {},
})
