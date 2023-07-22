<template>
  <div v-memo="[isLoading, posts, isError]">
    <h1>Vuex posts</h1>
    <template v-if="isLoading">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="isError">
      <p>Error while fetching posts: {{ error }}</p>
    </template>
    <template v-else>
      <ul>
        <li v-for="post of posts" :key="post.id">
          <n-link :to="`/vuex-posts/${post.id}`">
            {{ post.title }}
          </n-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.getPosts()
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      posts: 'post/posts',
      isLoading: 'post/isLoading',
      isError: 'post/isError',
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
