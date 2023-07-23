<template>
  <div>
    <InputField v-model="newTask" placeholder="Add new Task" />
    <Button v-once @click="addTask">Add Task</Button>
    <Task
      v-for="task in $store.state.task.tasks"
      :key="task.id"
      v-memo="[task]"
      :task="task"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Task from '@/components/Todos/Task.vue'
import Button from '@/components/Button.vue'
import InputField from '@/components/Form/InputField.vue'

export default {
  components: {
    Task,
    Button,
    InputField,
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
