export interface IPost {
  _key?: any
  userId: number
  id: number
  title: string
  body: string
}

export interface IPostState {
  isLoading: boolean
  isFetch: boolean
  error: string | null
  lists: IPost[]
  keys: any
}

export interface IPostByIdPayload {
  _key?: any
  data: IPost
  error?: string | null
}

export interface IPostKeys {
  isLoading: boolean
  isFetch: boolean
  error?: string | null
  data?: IPost
}

export default (): IPostState => ({
  lists: [],
  isLoading: false,
  isFetch: false,
  error: null,
  keys: {},
})
