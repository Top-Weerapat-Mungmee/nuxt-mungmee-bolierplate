import { ActionContext } from 'vuex'
import { ADD_TASK, TOGGLE_TASK, REMOVE_TASK } from './mutations'
import type { IRootState } from '~/types/store'
import type { ITask, ITaskState } from '~/types/store/task'

const addTask = async (
  ctx: ActionContext<ITaskState, IRootState>,
  task: string
) => {
  const { commit } = ctx
  await commit(ADD_TASK, task)
}

const toggleTask = async (
  ctx: ActionContext<ITaskState, IRootState>,
  task: ITask
) => {
  const { commit } = ctx
  await commit(TOGGLE_TASK, task)
}

const removeTask = async (
  ctx: ActionContext<ITaskState, IRootState>,
  task: ITask
) => {
  const { commit } = ctx
  await commit(REMOVE_TASK, task)
}

export default {
  addTask,
  toggleTask,
  removeTask,
}
