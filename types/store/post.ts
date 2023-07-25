export interface IPost {
  _key?: any
  userId: number
  id: number
  title: string
  body: string
  completed?: boolean
}

export interface IPostKeys {
  isLoading: boolean
  isFetch: boolean
  error?: string | null
  data?: IPost
}

export interface IPostKeyValue {
  [key: string]: IPostKeys
}

export interface IDataCRUD {
  id: number
  isLoading: boolean
  error?: string | null
}
export interface IPostCRUD {
  create: IDataCRUD
  update: IDataCRUD
  delete: IDataCRUD
}

export interface IPostState {
  isLoading: boolean
  isFetch: boolean
  error: string | null
  lists: IPost[]
  keys: IPostKeyValue
  crud: IPostCRUD
}

export interface IPostByIdPayload {
  _key?: any
  data: IPost
  error?: string | null
}
