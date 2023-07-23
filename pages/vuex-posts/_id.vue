<template>
  <div v-memo="[isLoading, isError, postData]">
    <Button v-once color="blue" @click="goToPostList">Back to Posts</Button>
    <Button v-once color="green" @click="refetch">Refetch</Button>
    <Card :title="`Post #${$route.params.id}`">
      <p v-if="Boolean(postData.id)" v-memo="[postData.id]">
        <template v-if="!isZeroPage">
          <n-link :to="`/vuex-posts/${postData.id - 1}`">
            <Button color="gray">Prev</Button>
          </n-link>
        </template>
        <n-link :to="`/vuex-posts/${postData.id + 1}`">
          <Button color="gray">Next</Button>
        </n-link>
      </p>
      <template v-if="isLoading">
        <content-placeholders>
          <content-placeholders-text :lines="10" />
        </content-placeholders>
      </template>
      <template v-else-if="isError">
        <h1>Post #{{ $route.params.id }} not found</h1>
      </template>
      <template v-else>
        <h1 class="text-header">{{ postData.title }}</h1>
        <p :class="postData.completed ? 'text-decoration-line-through' : ''">
          {{ postData.body }}
        </p>
        <Button color="gray" @click="togglePostById">Toggle</Button>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Button from '~/components/Button.vue'
import Card from '~/components/Card/Card.vue'
export default {
  components: {
    Button,
    Card,
  },
  async fetch() {
    const { id } = this.$route.params
    const { isFetch } = this.postById(id)
    if (!isFetch) {
      await this.getPostById(id)
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      postKeys: 'post/postKeys',
      postById: 'post/postById',
      postByIdLoading: 'post/postByIdLoading',
      postByIdIsError: 'post/postByIdIsError',
    }),
    isZeroPage() {
      const { id } = this.$route.params
      const page = this.postById(id).data.id - 1
      return page === 0
    },
    isLoading() {
      const { id } = this.$route.params
      return this.postByIdLoading(id)
    },
    isError() {
      const { id } = this.$route.params
      return this.postByIdIsError(id)
    },
    post() {
      const { id } = this.$route.params
      const data = this.postById(id)
      return data
    },
    postData() {
      const { id } = this.$route.params
      const { data } = this.postById(id)
      return data
    },
  },
  methods: {
    ...mapActions({
      getPostById: 'post/getPostById',
      togglePostByIdAction: 'post/togglePostById',
    }),
    goToPostList() {
      this.$router.push('/vuex-posts')
    },
    togglePostById() {
      const { id } = this.$route.params
      const payload = this.postById(id)
      this.togglePostByIdAction(payload)
    },
    async refetch() {
      const { id } = this.$route.params
      await this.getPostById(id)
    },
  },
}
</script>
