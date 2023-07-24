<template>
  <div class="form-control">
    <input
      class="input-control"
      type="text"
      :value="value"
      :placeholder="placeholder"
      autofocus
      @keypress.enter="$emit('enter')"
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
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
    enter() {
      this.$emit('keypress.enter')
    },
  },
}
</script>

<style scoped>
.form-control {
  margin-bottom: 16px;
  padding: 0 8px;
  width: 100%;
}

.input-control {
  width: 100%;
  border-color: rgb(243 244 246);
  padding: 8px 16px;
  border-radius: 4px;
  outline-style: solid;
}

.input-control:focus {
  border-color: rgb(59 130 246);
}
</style>
