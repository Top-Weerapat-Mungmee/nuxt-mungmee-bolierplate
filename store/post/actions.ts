import { ActionContext } from 'vuex'
import type { IRootState } from '..'
import type { IPostByIdPayload, IPostState } from './state'
import { GET_POSTS, GET_POST_BY_ID, TOGGLE_POST_BY_ID } from './mutations'
import { PostService } from '~/services'

const service = new PostService()

const getPosts = async (ctx: ActionContext<IPostState, IRootState>) => {
  const { commit } = ctx
  try {
    await commit(GET_POSTS.REQUEST)
    const data = await service.all()
    await commit(GET_POSTS.SUCCESS, data)
  } catch (e) {
    console.error(e)
    commit(GET_POSTS.FAILURE, e)
  }
}

const getPostById = async (
  ctx: ActionContext<IPostState, IRootState>,
  id: string
) => {
  const { commit } = ctx
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

const togglePostById = async (
  ctx: ActionContext<IPostState, IRootState>,
  payload: IPostByIdPayload
) => {
  const { commit } = ctx
  await commit(TOGGLE_POST_BY_ID, payload)
}

export default {
  getPosts,
  getPostById,
  togglePostById,
}
