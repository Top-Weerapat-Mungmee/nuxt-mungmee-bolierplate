<template>
  <div v-memo="[isLoading, isError, postData]">
    <button @click="goToPostList">Back to Posts</button>
    <template v-if="isLoading">
      <content-placeholders>
        <content-placeholders-text :lines="10" />
      </content-placeholders>
    </template>
    <template v-else-if="isError">
      <h1>Post #{{ $route.params.id }} not found</h1>
    </template>
    <template v-else>
      <h1>{{ postData.title }}</h1>
      <pre>{{ postData.body }}</pre>
      <p>
        <template v-if="!isZeroPage">
          <n-link :to="`/vuex-posts/${postData.id - 1}`">Prev article</n-link>
        </template>
        &nbsp;-&nbsp;
        <n-link :to="`/vuex-posts/${postData.id + 1}`">Next article</n-link>
      </p>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async fetch() {
    const { id } = this.$route.params
    await this.getPostById(id)
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
      const data = this.postById(id)
      return data.data
    },
  },
  methods: {
    ...mapActions({
      getPostById: 'post/getPostById',
    }),
    goToPostList() {
      this.$router.push('/vuex-posts')
    },
  },
}
</script>
