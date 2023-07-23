<template>
  <div class="form-control">
    <input
      class="input-control"
      type="text"
      :value="value"
      autofocus
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply mb-4 px-2 w-full;
}
</style>
