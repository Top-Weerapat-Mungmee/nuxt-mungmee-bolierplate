import { BaseService } from 'vue-axios-http'

export default class PostService extends BaseService {
  constructor(props?: Record<string, any>) {
    super('posts', props || {})
  }
}
