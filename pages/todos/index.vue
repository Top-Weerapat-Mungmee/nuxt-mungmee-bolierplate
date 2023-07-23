<template>
  <div>
    <v-form v-model="valid" @submit.prevent="addTask">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" xs="12">
            <v-text-field
              v-model="newTask"
              :rules="taskRules"
              :counter="50"
              label="Add new task"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8" xs="12">
            <v-btn color="primary" @click="addTask">Add Task</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- <InputField v-model="newTask" placeholder="Add new Task" @enter="addTask" />
    <Button v-once @click="addTask">Add Task</Button> -->
    <v-container class="lighten-5">
      <v-row no-gutters>
        <v-col
          v-for="task in $store.state.task.tasks"
          :key="task.id"
          v-memo="[task]"
          cols="12"
          sm="4"
        >
          <Task :task="task" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Task from '@/components/Todos/Task.vue'
// import Button from '@/components/Button.vue'
// import InputField from '@/components/Form/InputField.vue'

export default {
  components: {
    Task,
    // Button,
    // InputField,
  },
  data() {
    return {
      valid: false,
      newTask: '',
      taskRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 50 || 'Name must be less than 50 characters',
      ],
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
