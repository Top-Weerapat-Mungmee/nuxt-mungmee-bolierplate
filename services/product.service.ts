import { BaseService } from 'vue-axios-http'

export default class ProductService extends BaseService {
  constructor(props?: Record<string, any>) {
    super('/api/products', props || {})
  }
}
