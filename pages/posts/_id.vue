<template>
  <div>
    <Button color="blue" @click="goToPostList">Back to Posts</Button>
    <Card :title="`Post #${$route.params.id}`">
      <p>
        <template v-if="!isZeroPage">
          <n-link :to="`/posts/${post.id - 1}`">
            <Button color="gray">Prev</Button>
          </n-link>
        </template>
        <n-link :to="`/posts/${post.id + 1}`">
          <Button color="gray">Next</Button>
        </n-link>
      </p>
      <template v-if="$fetchState.pending">
        <content-placeholders>
          <content-placeholders-heading />
          <content-placeholders-text :lines="10" />
        </content-placeholders>
      </template>
      <template v-else-if="$fetchState.error">
        <h1>Post #{{ $route.params.id }} not found</h1>
      </template>
      <template v-else>
        <h1 class="text-header">{{ post.title }}</h1>
        <pre>{{ post.body }}</pre>
      </template>
    </Card>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  components: {
    Button,
  },
  data() {
    return {
      post: {},
    }
  },
  async fetch() {
    const { params } = this.$route
    this.post = await this.$axios.$get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    )
  },
  fetchOnServer: true,
  computed: {
    isZeroPage() {
      const { id } = this.$route.params
      const page = id - 1
      return page === 0
    },
  },
  methods: {
    goToPostList() {
      this.$router.push('/posts')
    },
  },
}
</script>
