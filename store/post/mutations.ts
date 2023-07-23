import type { IPostState, IPostByIdPayload, IPost } from './state'
import { Mutation } from '~/utils/vuex-query'
import { asyncActions } from '~/utils/asyncActions'

export const GET_POSTS = asyncActions('GET_POSTS')
export const GET_POST_BY_ID = asyncActions('GET_POST_BY_ID')
export const TOGGLE_POST_BY_ID = 'TOGGLE_POST_BY_ID'

export default {
  [GET_POSTS.REQUEST](state: IPostState) {
    Mutation.getListRequest(state)
  },
  [GET_POSTS.SUCCESS](state: IPostState, payload: IPost[]) {
    Mutation.getListSuccess(state, payload)
  },
  [GET_POSTS.FAILURE](state: IPostState, payload: Error) {
    Mutation.getListFailure(state, payload)
  },
  [GET_POST_BY_ID.REQUEST](state: IPostState, payload: IPostByIdPayload) {
    Mutation.getDetailRequest(state, payload)
  },
  [GET_POST_BY_ID.SUCCESS](state: IPostState, payload: IPostByIdPayload) {
    Mutation.getDetailSuccess(state, payload)
  },
  [GET_POST_BY_ID.FAILURE](state: IPostState, payload: IPostByIdPayload) {
    Mutation.getDetailFailure(state, payload)
  },
  [TOGGLE_POST_BY_ID](_: IPostState, payload: IPostByIdPayload) {
    payload.data.completed = !payload.data.completed
  },
}
