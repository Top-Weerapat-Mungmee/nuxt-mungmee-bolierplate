import { IPostState } from '~/types/store/post'

const state = (): IPostState => ({
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

export type PostState = ReturnType<typeof state>

export default state
