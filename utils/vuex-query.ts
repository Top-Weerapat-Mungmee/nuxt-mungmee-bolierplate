import Vue from 'vue'
export interface IAsyncType {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
  CLEAR?: string
}

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

type MutationType<S> = (state: S, payload?: any) => any

interface IMutationSchemaKey<S> {
  [key: string]: MutationType<S>
}

interface IMutationSchema<S> {
  list: IMutationSchemaKey<S>
  detail: IMutationSchemaKey<S>
  create: IMutationSchemaKey<S>
  update: IMutationSchemaKey<S>
  delete: IMutationSchemaKey<S>
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

export const asyncActions = (key: string): IAsyncType => ({
  REQUEST: `${key}_REQUEST`,
  SUCCESS: `${key}_SUCCESS`,
  FAILURE: `${key}_FAILURE`,
  CLEAR: `${key}_CLEAR`,
})

export const payloadKeyValue = (key: string, data: any) => ({
  _key: key,
  data,
})

export const payloadKeyError = (key: string, error: string) => ({
  _key: key,
  error,
})

export const createMutation = (
  asyncType: IAsyncType
): IMutationSchema<IQueryState> => ({
  list: {
    [asyncType.REQUEST]: getListRequest,
    [asyncType.SUCCESS]: getListSuccess,
    [asyncType.FAILURE]: getListFailure,
  },
  detail: {
    [asyncType.REQUEST]: getDetailRequest,
    [asyncType.SUCCESS]: getDetailSuccess,
    [asyncType.FAILURE]: getDetailFailure,
  },
  create: {
    [asyncType.REQUEST]: createDataRequest,
    [asyncType.SUCCESS]: createDataSuccess,
    [asyncType.FAILURE]: createDataFailure,
  },
  update: {
    [asyncType.REQUEST]: updateDataByIdRequest,
    [asyncType.SUCCESS]: updateDataByIdSuccess,
    [asyncType.FAILURE]: updateDataByIdFailure,
  },
  delete: {
    [asyncType.REQUEST]: deleteDataByIdRequest,
    [asyncType.SUCCESS]: deleteDataByIdSuccess,
    [asyncType.FAILURE]: deleteDataByIdFailure,
  },
})
