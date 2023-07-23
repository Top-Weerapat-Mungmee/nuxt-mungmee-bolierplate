<template>
  <v-card title="Task Board">
    <p>Create a list of tasks</p>

    <div>
      <v-text-field
        v-model="newTask"
        type="text"
        label="Add Task"
        density="compact"
        variant="solo"
        placeholder="Add new Task"
        append-inner-icon="mdi-plus"
        single-line
        hide-details
        @click:append-inner="addTask"
        @keypress.enter="addTask"
      />
      <v-btn variant="outlined" @click="addTask">Add</v-btn>
    </div>
    <div>
      <Task
        v-for="(task, index) in $store.state.task.tasks"
        :key="index"
        :task="task"
      />
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Task from '@/components/Todos/Task.vue'

export default {
  components: {
    Task,
  },
  data() {
    return {
      newTask: '',
    }
  },
  methods: {
    ...mapActions({
      addTaskAction: 'task/addTask',
    }),
    addTask() {
      if (this.newTask) {
        this.addTaskAction(this.newTask)
        this.newTask = ''
      }
    },
  },
}
</script>
