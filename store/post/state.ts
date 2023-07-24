import { IPostState } from '~/types/store/post'

export default (): IPostState => ({
  lists: [],
  isLoading: false,
  isFetch: false,
  error: null,
  keys: {},
})
