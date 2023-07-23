import type { ITask, ITaskState } from './state'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'

export default {
  [ADD_TASK](state: ITaskState, task: string) {
    state.tasks = [{ content: task, done: false }, ...state.tasks]
  },
  [REMOVE_TASK](state: ITaskState, task: ITask) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  [TOGGLE_TASK](_: any, task: ITask) {
    task.done = !task.done
  },
}
