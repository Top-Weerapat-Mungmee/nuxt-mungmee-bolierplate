interface ITaskState {
  content: string
  done: boolean
}

interface IStore {
  tasks: ITaskState[]
}

export const state = (): IStore => ({
  tasks: [],
})

export const mutations = {
  ADD_TASK(state: IStore, task: string) {
    state.tasks = [{ content: task, done: false }, ...state.tasks]
  },
  REMOVE_TASK(state: IStore, task: ITaskState) {
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  TOGGLE_TASK(_: any, task: ITaskState) {
    task.done = !task.done
  },
}
