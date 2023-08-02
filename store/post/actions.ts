import { ActionTree } from 'vuex'
import { GET_POSTS, GET_POST_BY_ID, TOGGLE_POST_BY_ID } from './mutations'
import type { IRootState } from '~/types/store'
import type { IPostByIdPayload, IPostState } from '~/types/store/post'
import { PostService } from '~/services'

const service = new PostService()

const actions: ActionTree<IPostState, IRootState> = {
  async getPosts(ctx) {
    const { commit } = ctx
    try {
      await commit(GET_POSTS.REQUEST)
      const { data } = await service.getPosts()
      await commit(GET_POSTS.SUCCESS, data)
    } catch (e) {
      console.error(e)
      commit(GET_POSTS.FAILURE, e)
    }
  },
  async getPostById(ctx, id: string) {
    const { commit } = ctx
    try {
      await commit(GET_POST_BY_ID.REQUEST, { _key: id })
      const { data } = await service.getPostById(id)
      const payload = {
        _key: id,
        data,
      }
      await commit(GET_POST_BY_ID.SUCCESS, payload)
    } catch (e: any) {
      console.error(e)
      commit(GET_POST_BY_ID.FAILURE, { _key: id, error: e?.message })
    }
  },
  togglePostById(ctx, payload: IPostByIdPayload) {
    const { commit } = ctx
    commit(TOGGLE_POST_BY_ID, payload)
  },
}

export default actions
