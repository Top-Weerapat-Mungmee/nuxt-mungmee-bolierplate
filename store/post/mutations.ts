import type { IPostState, IPostByIdPayload, IPost } from '~/types/store/post'
import { Mutation } from '~/utils/vuex-query'
import { asyncActions } from '~/utils/asyncActions'

export const GET_POSTS = asyncActions('GET_POSTS')
export const GET_POST_BY_ID = asyncActions('GET_POST_BY_ID')
export const TOGGLE_POST_BY_ID = 'TOGGLE_POST_BY_ID'

export default {
  [GET_POSTS.REQUEST](state: IPostState) {
    Mutation.list.request(state)
  },
  [GET_POSTS.SUCCESS](state: IPostState, payload: IPost[]) {
    Mutation.list.success(state, payload)
  },
  [GET_POSTS.FAILURE](state: IPostState, payload: Error) {
    Mutation.list.failure(state, payload)
  },
  [GET_POST_BY_ID.REQUEST](state: IPostState, payload: IPostByIdPayload) {
    Mutation.detail.request(state, payload)
  },
  [GET_POST_BY_ID.SUCCESS](state: IPostState, payload: IPostByIdPayload) {
    Mutation.detail.success(state, payload)
  },
  [GET_POST_BY_ID.FAILURE](state: IPostState, payload: IPostByIdPayload) {
    Mutation.detail.failure(state, payload)
  },
  [TOGGLE_POST_BY_ID](_: IPostState, payload: IPostByIdPayload) {
    payload.data.completed = !payload.data.completed
  },
}
