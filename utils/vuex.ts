import { computed, useContext } from '@nuxtjs/composition-api'

const mapState = () => {
  const { store } = useContext()
  return Object.fromEntries(
    Object.keys(store.state).map((key) => [
      key,
      computed(() => store.state[key]),
    ])
  )
}

const mapGetters = () => {
  const { store } = useContext()
  return Object.fromEntries(
    Object.keys(store.getters).map((getter) => [
      getter,
      computed(() => store.getters[getter]),
    ])
  )
}

// const mapActions = () => {
//   const { store } = useContext()
//   return Object.fromEntries(
//     Object.keys(store._actions).map((action) => [
//       action,
//       (value) => store.dispatch(action, value),
//     ])
//   )
// }

export { mapState, mapGetters }
