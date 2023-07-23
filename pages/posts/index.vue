<!-- eslint-disable no-console -->
<template>
  <div>
    <h1 class="text-header">Blog posts</h1>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="20" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <li v-for="post of posts" :key="post.id">
        <n-link :to="`/posts/${post.id}`">
          {{ post.title }}
        </n-link>
      </li>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  async fetch() {
    if (!this.posts.length) {
      this.posts = await this.$axios.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    }
  },
  fetchOnServer: true,
}
</script>
