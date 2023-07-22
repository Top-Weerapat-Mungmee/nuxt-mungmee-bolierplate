export const async = (key: string) => ({
  REQUEST: `${key}_REQUEST`,
  SUCCESS: `${key}_SUCCESS`,
  FAILURE: `${key}_FAILURE`,
})

export const GET_POSTS = async('GET_POSTS')
export const GET_POST_BY_ID = async('GET_POST_BY_ID')
