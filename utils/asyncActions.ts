export const asyncActions = (key: string) => ({
  REQUEST: `${key}_REQUEST`,
  SUCCESS: `${key}_SUCCESS`,
  FAILURE: `${key}_FAILURE`,
  CLEAR: `${key}_CLEAR`,
})
