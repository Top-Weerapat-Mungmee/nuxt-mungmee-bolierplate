import { IPostState } from './post/state'
import { ITaskState } from './task/state'

export interface IRootState {
  post: IPostState
  task: ITaskState
}
