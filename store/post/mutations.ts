import { GET_POSTS, GET_POST_BY_ID } from './mutation-types'
import { IPostState, IPostByIdPayload } from './types'

export default {
  [GET_POSTS.REQUEST](state: IPostState) {
    state.isLoading = true
    state.isFetch = false
    state.error = null
  },
  [GET_POSTS.SUCCESS](state: IPostState, payload: []) {
    state.posts = payload
    state.isLoading = false
    state.isFetch = true
    state.error = null
  },
  [GET_POSTS.FAILURE](state: IPostState, e: Error) {
    state.isLoading = false
    state.isFetch = false
    state.error = e.message
  },
  [GET_POST_BY_ID.REQUEST](state: IPostState, payload: IPostByIdPayload) {
    if (!state.keys[payload._key]) {
      state.keys = {
        ...state.keys,
        [payload._key]: {
          isLoading: true,
          isFetch: false,
          error: null,
          data: {},
        },
      }
    } else {
      state.keys[payload._key] = {
        isLoading: true,
        isFetch: false,
        error: null,
        data: {
          ...state.keys[payload._key].data,
        },
      }
    }
  },
  [GET_POST_BY_ID.SUCCESS](state: IPostState, payload: IPostByIdPayload) {
    state.keys[payload._key] = {
      isLoading: false,
      isFetch: true,
      error: null,
      data: payload.data,
    }
  },
  [GET_POST_BY_ID.FAILURE](state: IPostState, payload: IPostByIdPayload) {
    if (!state.keys[payload._key]) {
      state.keys = {
        ...state.keys,
        [payload._key]: {
          isLoading: false,
          isFetch: false,
          error: payload.error,
          data: {},
        },
      }
    } else {
      state.keys[payload._key] = {
        isLoading: false,
        error: payload.error,
        data: {
          ...state.keys[payload._key].data,
        },
      }
    }
  },
}
