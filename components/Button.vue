<template>
  <button v-memo="[color]" :class="`btn btn-${color}`" @click="$emit('click')">
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

<style>
.btn {
  @apply font-bold py-2 px-4 rounded;
}

.btn-blue {
  @apply bg-blue-500 text-white;
}

.btn-blue:hover {
  @apply bg-blue-700;
}

.btn-red {
  @apply bg-red-500 text-white;
}

.btn-red:hover {
  @apply bg-red-700;
}

.btn-gray {
  @apply bg-gray-500 text-white;
}

.btn-gray:hover {
  @apply bg-gray-700;
}
</style>
