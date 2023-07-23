<!-- eslint-disable vue/require-prop-types -->
<template>
  <v-card class="mx-auto" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div
          :class="`text-center ${
            task.done ? 'text-decoration-line-through' : ''
          }`"
        >
          {{ task.content }}
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="outlined" @click="toggleDone">{{
        task.done ? 'Undo' : 'Done'
      }}</v-btn>
      <v-btn variant="outlined" @click="removeTask">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      toggleTaskAction: 'task/toggleTask',
      removeTaskAction: 'task/removeTask',
    }),
    toggleDone() {
      this.toggleTaskAction(this.task)
    },
    removeTask() {
      this.removeTaskAction(this.task)
    },
  },
}
</script>
