export interface IQueryState {
  isLoading: boolean
  isFetch: boolean
  error: string | null
  lists: any[]
  keys: any
}

export interface IQueryKeys {
  isLoading: boolean
  isFetch: boolean
  error?: string | null
  data?: any
}

export interface IQueryKeyValue {
  [key: string]: IQueryKeys
}

export interface IQueryByIdPayload {
  _key?: any
  data: any
  error?: string | null
}

const getListRequest = (state: IQueryState) => {
  state.isLoading = true
  state.isFetch = false
  state.error = null
}

const getListSuccess = (state: IQueryState, payload: any[] = []) => {
  state.lists = payload
  state.isLoading = false
  state.isFetch = true
  state.error = null
}

const getListFailure = (state: IQueryState, payload: Error) => {
  state.isLoading = false
  state.isFetch = false
  state.error = payload?.message
}

const getDetailRequest = (state: IQueryState, payload: IQueryByIdPayload) => {
  if (!state.keys[payload._key]) {
    state.keys = {
      ...state.keys,
      [payload._key]: {
        isLoading: true,
        isFetch: false,
        error: null,
        data: {},
      },
    }
  } else {
    state.keys[payload._key] = {
      isLoading: true,
      isFetch: false,
      error: null,
      data: {
        ...state.keys[payload._key].data,
      },
    }
  }
}
const getDetailSuccess = (state: IQueryState, payload: IQueryByIdPayload) => {
  state.keys[payload._key] = {
    isLoading: false,
    isFetch: true,
    error: null,
    data: payload.data,
  }
}

const getDetailFailure = (state: IQueryState, payload: IQueryByIdPayload) => {
  if (!state.keys[payload._key]) {
    state.keys = {
      ...state.keys,
      [payload._key]: {
        isLoading: false,
        isFetch: false,
        error: payload.error,
        data: {},
      },
    }
  } else {
    state.keys[payload._key] = {
      isLoading: false,
      error: payload.error,
      data: {
        ...state.keys[payload._key].data,
      },
    }
  }
}

export const Mutation = {
  getListRequest,
  getListSuccess,
  getListFailure,
  getDetailRequest,
  getDetailSuccess,
  getDetailFailure,
}
