import type { ITaskState } from './state'

export default {
  tasks: (state: ITaskState) => state.tasks,
}
