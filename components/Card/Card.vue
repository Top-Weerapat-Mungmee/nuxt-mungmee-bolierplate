<template>
  <v-card class="mx-auto">
    <v-card-text>
      <p
        :class="`text-h4 text--primary ${
          done ? 'text-decoration-line-through' : ''
        }`"
      >
        {{ title }}
      </p>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
