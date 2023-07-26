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

export const createMutation = (asyncType: IAsyncType) => ({
  list: {
    [asyncType.REQUEST](state: IQueryState) {
      Mutation.list.request(state)
    },
    [asyncType.SUCCESS](state: IQueryState, payload: any[]) {
      Mutation.list.success(state, payload)
    },
    [asyncType.FAILURE](state: IQueryState, payload: Error) {
      Mutation.list.failure(state, payload)
    },
  },
  detail: {
    [asyncType.REQUEST](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.detail.request(state, payload)
    },
    [asyncType.SUCCESS](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.detail.success(state, payload)
    },
    [asyncType.FAILURE](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.detail.failure(state, payload)
    },
  },
  create: {
    [asyncType.REQUEST](state: IQueryState) {
      Mutation.create.request(state)
    },
    [asyncType.SUCCESS](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.create.success(state, payload)
    },
    [asyncType.FAILURE](state: IQueryState, payload: Error) {
      Mutation.create.failure(state, payload)
    },
  },
  update: {
    [asyncType.REQUEST](state: IQueryState) {
      Mutation.update.request(state)
    },
    [asyncType.SUCCESS](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.update.success(state, payload)
    },
    [asyncType.FAILURE](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.update.failure(state, payload)
    },
  },
  delete: {
    [asyncType.REQUEST](state: IQueryState) {
      Mutation.delete.request(state)
    },
    [asyncType.SUCCESS](state: IQueryState, payload: IQueryByIdPayload) {
      Mutation.delete.success(state, payload)
    },
    [asyncType.FAILURE](state: IQueryState, payload: Error) {
      Mutation.delete.failure(state, payload)
    },
  },
})

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
