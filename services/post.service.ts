import { BaseService } from 'vue-axios-http'

const baseURL = 'https://jsonplaceholder.typicode.com'

export default class PostService extends BaseService {
  constructor(props?: Record<string, any>) {
    super('posts', props || {})
  }

  getPosts = () => {
    return this.$http({
      baseURL,
      url: '/posts',
    })
  }

  getPostById = (id: string) => {
    return this.$http({
      baseURL,
      url: `/posts/${id}`,
    })
  }
}
