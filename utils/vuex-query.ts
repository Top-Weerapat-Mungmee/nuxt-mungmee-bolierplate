import Vue from 'vue'

export interface IQueryDataCRUD {
  id: number
  isLoading: boolean
  error?: string | null
}
export interface IQueryCRUD {
  create: IQueryDataCRUD
  update: IQueryDataCRUD
  delete: IQueryDataCRUD
}
export interface IQueryState {
  isLoading: boolean
  isFetch: boolean
  error: string | null
  lists: any[]
  keys: any
  crud: IQueryCRUD
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
    Vue.set(state.keys, payload._key, {
      isLoading: true,
      isFetch: false,
      error: null,
      data: {},
    })
  } else {
    state.keys[payload._key].isLoading = true
    state.keys[payload._key].isFetch = false
    state.keys[payload._key].error = null
  }
}
const getDetailSuccess = (state: IQueryState, payload: IQueryByIdPayload) => {
  if (!state.keys[payload._key]) {
    Vue.set(state.keys, payload._key, {
      isLoading: false,
      isFetch: true,
      error: null,
      data: payload.data,
    })
  } else {
    state.keys[payload._key].isLoading = false
    state.keys[payload._key].isFetch = true
    state.keys[payload._key].error = null
    const data = Object.keys(state.keys[payload._key].data)
    const isHaveData = data.length > 0
    if (!isHaveData) {
      state.keys[payload._key].data = {
        ...payload.data,
      }
    } else {
      state.keys[payload._key].data = {
        ...state.keys[payload._key].data,
        ...payload.data,
      }
    }
  }
}

const getDetailFailure = (state: IQueryState, payload: IQueryByIdPayload) => {
  if (!state.keys[payload._key]) {
    Vue.set(state.keys, payload._key, {
      isLoading: false,
      isFetch: false,
      error: payload.error,
      data: {},
    })
  } else {
    state.keys[payload._key].isLoading = false
    state.keys[payload._key].isFetch = false
    state.keys[payload._key].error = payload.error
  }
}

const createDataRequest = (state: IQueryState) => {
  state.crud.create.isLoading = true
  state.crud.create.id = 0
  state.crud.create.error = null
}

const createDataSuccess = (state: IQueryState, payload: IQueryByIdPayload) => {
  state.isFetch = false
  state.crud.create.isLoading = false
  state.crud.create.id = payload._key
  state.crud.create.error = null
  getDetailSuccess(state, payload)
}

const createDataFailure = (state: IQueryState, payload: Error) => {
  state.crud.create.isLoading = false
  state.crud.create.id = 0
  state.crud.create.error = payload?.message
}

const updateDataByIdRequest = (state: IQueryState) => {
  state.crud.update.isLoading = true
  state.crud.update.id = 0
  state.crud.update.error = null
}

const updateDataByIdSuccess = (
  state: IQueryState,
  payload: IQueryByIdPayload
) => {
  state.isFetch = false
  state.crud.update.isLoading = false
  state.crud.update.id = payload._key
  state.crud.update.error = null
  getDetailSuccess(state, payload)
  state.keys[payload._key].isFetch = false
}

const updateDataByIdFailure = (
  state: IQueryState,
  payload: IQueryByIdPayload
) => {
  state.crud.update.isLoading = false
  state.crud.update.id = 0
  state.crud.update.error = payload?.error
}

const deleteDataByIdRequest = (state: IQueryState) => {
  state.crud.delete.isLoading = true
  state.crud.delete.id = 0
  state.crud.delete.error = null
}

const deleteDataByIdSuccess = (
  state: IQueryState,
  payload: IQueryByIdPayload
) => {
  state.isFetch = false
  state.crud.delete.isLoading = false
  state.crud.delete.id = payload._key
  state.crud.delete.error = null
  Vue.delete(state.keys, payload._key)
}

const deleteDataByIdFailure = (state: IQueryState, payload: Error) => {
  state.crud.delete.isLoading = false
  state.crud.delete.id = 0
  state.crud.delete.error = payload?.message
}

export const Mutation = {
  list: {
    request: getListRequest,
    success: getListSuccess,
    failure: getListFailure,
  },
  detail: {
    request: getDetailRequest,
    success: getDetailSuccess,
    failure: getDetailFailure,
  },
  create: {
    request: createDataRequest,
    success: createDataSuccess,
    failure: createDataFailure,
  },
  update: {
    request: updateDataByIdRequest,
    success: updateDataByIdSuccess,
    failure: updateDataByIdFailure,
  },
  delete: {
    request: deleteDataByIdRequest,
    success: deleteDataByIdSuccess,
    failure: deleteDataByIdFailure,
  },
}
