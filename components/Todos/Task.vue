<!-- eslint-disable vue/require-prop-types -->
<template>
  <div>
    <Card :title="task.content">
      <div
        :class="`text-center ${
          task.done ? 'text-decoration-line-through' : ''
        }`"
      >
        {{ task.content }}
      </div>
      <Button color="blue" @click="toggleDone">{{
        task.done ? 'Undo' : 'Done'
      }}</Button>
      <Button color="red" @click="removeTask">Delete</Button>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from '@/components/Card/Card.vue'
import Button from '@/components/Button.vue'

export default {
  components: {
    Card,
    Button,
  },
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
