<template>
  <div v-memo="[isLoading, posts, isError]">
    <h1 class="text-header">Vuex posts</h1>
    <Button v-once color="green" @click="getPosts">Refetch</Button>
    <template v-if="isLoading">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="isError">
      <p>Error while fetching posts: {{ error }}</p>
    </template>
    <template v-else>
      <li v-for="post of posts" :key="post.id">
        <n-link :to="`/vuex-posts/${post.id}`">
          {{ post.title }}
        </n-link>
      </li>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async fetch() {
    if (!this.isFetch) {
      await this.getPosts()
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      posts: 'post/posts',
      isLoading: 'post/isLoading',
      isError: 'post/isError',
      isFetch: 'post/isFetch',
      error: 'post/error',
    }),
  },
  methods: {
    ...mapActions({
      getPosts: 'post/getPosts',
    }),
  },
}
</script>
