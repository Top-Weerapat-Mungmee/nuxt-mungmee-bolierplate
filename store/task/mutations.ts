import { MutationTree } from 'vuex'
import type { ITask, ITaskState } from '~/types/store/task'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'

const mutations: MutationTree<ITaskState> = {
  [ADD_TASK](state, task: string) {
    const autoId = (state.tasks?.[0]?.id || 0) + 1
    state.tasks = [{ id: autoId, content: task, done: false }, ...state.tasks]
  },
  [REMOVE_TASK](state, task: ITask) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  [TOGGLE_TASK](_, task: ITask) {
    task.done = !task.done
  },
}

export default mutations
