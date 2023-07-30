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
          <v-col v-once cols="12" md="8" xs="12">
            <v-btn color="primary" @click="addTask">Add Task</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <LazyHydrate when-visible>
      <v-container v-if="tasks.length > 0" class="lighten-5">
        <v-row no-gutters>
          <v-col v-for="task in tasks" :key="task.id" cols="12" sm="4">
            <Task :task="task" />
          </v-col>
        </v-row>
      </v-container>
    </LazyHydrate>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
// import Task from '@/components/Todos/Task.vue'

export default {
  components: {
    LazyHydrate,
    Task: () =>
      import(/* webpackChunkName: "Task" */ '@/components/Todos/Task.vue'),
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
  computed: {
    ...mapGetters({
      tasks: 'task/tasks',
    }),
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
