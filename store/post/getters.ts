import type { IPost, IPostState } from './state'

export default {
  posts: (state: IPostState): IPost[] => state.posts,
  isLoading: (state: IPostState): boolean => state.isLoading,
  isFetch: (state: IPostState): boolean => state.isFetch,
  isError: (state: IPostState): boolean => Boolean(state.error),
  error: (state: IPostState): string | null => state.error,
  postKeys: (state: IPostState): any => state.keys,
  postById: (state: IPostState) => (id: string) => state.keys?.[id] || {},
  postByIdLoading: (state: IPostState) => (id: string) =>
    state.keys?.[id]?.isLoading || false,
  postByIdIsError: (state: IPostState) => (id: string) =>
    Boolean(state.keys?.[id]?.error),
}
