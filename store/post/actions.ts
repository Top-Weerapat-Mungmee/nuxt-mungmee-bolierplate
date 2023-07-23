import { ActionContext } from 'vuex'
import type { IRootState } from '..'
import type { IPostState } from './state'
import { GET_POSTS, GET_POST_BY_ID } from './mutations'
import { PostService } from '~/services'

const service = new PostService()

const getPosts = async (ctx: ActionContext<IPostState, IRootState>) => {
  const { commit, state } = ctx
  if (!state.isFetch) {
    try {
      await commit(GET_POSTS.REQUEST)
      const data = await service.all()
      await commit(GET_POSTS.SUCCESS, data)
    } catch (e) {
      console.error(e)
      commit(GET_POSTS.FAILURE, e)
    }
  }
}

const getPostById = async (
  ctx: ActionContext<IPostState, IRootState>,
  id: string
) => {
  const { commit, state } = ctx
  if (!state.keys?.[id]?.isFetch) {
    try {
      await commit(GET_POST_BY_ID.REQUEST, { _key: id })
      const data = await service.find(id)
      const payload = {
        _key: id,
        data,
      }
      await commit(GET_POST_BY_ID.SUCCESS, payload)
    } catch (e: any) {
      console.error(e)
      commit(GET_POST_BY_ID.FAILURE, { _key: id, error: e?.message })
    }
  }
}

export default {
  getPosts,
  getPostById,
}
