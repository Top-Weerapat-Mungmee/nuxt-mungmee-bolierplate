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

<style scoped>
.btn {
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-blue {
  color: white;
  background-color: rgb(59 130 246);
}

.btn-blue:hover {
  background-color: rgb(29 130 246);
}

.btn-green {
  color: white;
  background-color: rgb(34 197 94);
}

.btn-green:hover {
  background-color: rgb(21 128 61);
}

.btn-red {
  color: white;
  background-color: rgb(239 68 68);
}

.btn-red:hover {
  background-color: rgb(185 28 28);
}

.btn-gray {
  color: white;
  background-color: rgb(107 114 128);
}

.btn-gray:hover {
  background-color: rgb(55 65 81);
}
</style>
