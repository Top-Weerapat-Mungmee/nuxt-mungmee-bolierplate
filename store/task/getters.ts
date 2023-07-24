import type { ITaskState } from '~/types/store/task'

export default {
  tasks: (state: ITaskState) => state.tasks,
}
