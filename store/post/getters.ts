import { IPostState } from './types'

export default {
  posts: (state: IPostState) => state.posts,
  isLoading: (state: IPostState) => state.isLoading,
  isFetch: (state: IPostState) => state.isFetch,
  isError: (state: IPostState) => Boolean(state.error),
  error: (state: IPostState) => state.error,
  postKeys: (state: IPostState) => state.keys,
  postById: (state: IPostState) => (id: string) => state.keys?.[id] || {},
}
