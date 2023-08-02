import { ActionTree } from 'vuex'
import { ADD_TASK, TOGGLE_TASK, REMOVE_TASK } from './mutations'
import type { IRootState } from '~/types/store'
import type { ITask, ITaskState } from '~/types/store/task'

const actions: ActionTree<ITaskState, IRootState> = {
  addTask(ctx, task: string) {
    const { commit } = ctx
    commit(ADD_TASK, task)
  },
  toggleTask(ctx, task: ITask) {
    const { commit } = ctx
    commit(TOGGLE_TASK, task)
  },
  removeTask(ctx, task: ITask) {
    const { commit } = ctx
    commit(REMOVE_TASK, task)
  },
}

export default actions
