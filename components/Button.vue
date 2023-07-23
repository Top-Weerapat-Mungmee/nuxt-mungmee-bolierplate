<template>
  <button :class="`btn btn-${color}`" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      required: false,
      default: 'blue',
    },
  },
  methods: {
    submit() {
      this.$emit('click')
    },
  },
}
</script>
