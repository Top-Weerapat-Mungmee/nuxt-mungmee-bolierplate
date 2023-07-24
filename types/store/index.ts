import { IPostState } from './post'
import { ITaskState } from './task'
import { IProductState } from './product'

export interface IRootState {
  post: IPostState
  task: ITaskState
  product: IProductState
}
