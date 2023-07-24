export interface ITask {
  id: number
  content: string
  done: boolean
}

export interface ITaskState {
  tasks: ITask[]
}
