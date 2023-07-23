export interface ITask {
  content: string
  done: boolean
}

export interface ITaskState {
  tasks: ITask[]
}

export default (): ITaskState => ({
  tasks: [],
})
