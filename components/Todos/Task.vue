<!-- eslint-disable vue/require-prop-types -->
<template>
  <div>
    <Card :title="task.content" :done="task.done">
      <Button color="blue" @click="toggleDone">{{ taskBtnText }}</Button>
      <Button v-once color="red" @click="removeTask">Delete</Button>
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
      required: true,
    },
  },
  computed: {
    taskBtnText() {
      return this.task.done ? 'Undo' : 'Done'
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
