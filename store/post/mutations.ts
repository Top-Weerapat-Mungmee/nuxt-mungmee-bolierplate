import type { MutationTree } from 'vuex'
import { PostState } from './state'
import type { IPostByIdPayload } from '~/types/store/post'
import { asyncActions, createMutation } from '~/utils/vuex-query'

export const GET_POSTS = asyncActions('GET_POSTS')
export const GET_POST_BY_ID = asyncActions('GET_POST_BY_ID')
export const TOGGLE_POST_BY_ID = 'TOGGLE_POST_BY_ID'

const mutations: MutationTree<PostState> = {
  ...createMutation(GET_POSTS).list,
  ...createMutation(GET_POST_BY_ID).detail,
  [TOGGLE_POST_BY_ID](_, payload: IPostByIdPayload) {
    payload.data.completed = !payload.data.completed
  },
}

export default mutations
